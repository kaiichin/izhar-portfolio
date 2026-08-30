/* eslint-disable react/no-unknown-property */
"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  type ThreeElement,
  type ThreeEvent,
} from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

const FRONT_UV_RECT = {
  x: 0,
  y: 0,
  width: 0.5,
  height: 0.755,
};

const BACK_UV_RECT = {
  x: 0.5,
  y: 0,
  width: 0.5,
  height: 0.757,
};

export type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
};

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(720);
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  const [anchorScreen, setAnchorScreen] = useState({ x: 0, y: -8 });

  useEffect(() => {
    const updateLayout = () => {
      setIsMobile(window.innerWidth < 768);
      setViewportHeight(window.innerHeight);

      const sidebar = document.querySelector<HTMLElement>(".portfolio-sidebar");
      const navbar = document.querySelector<HTMLElement>(".portfolio-navbar");

      if (sidebar) {
        const sidebarRect = sidebar.getBoundingClientRect();
        const navbarRect = navbar?.getBoundingClientRect();

        setAnchorScreen({
          x: sidebarRect.left + sidebarRect.width / 2,
          y: navbarRect?.bottom ?? -8,
        });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    const page = document.querySelector<HTMLElement>(".portfolio-page");
    const resizeObserver = new ResizeObserver(updateLayout);

    if (page) {
      resizeObserver.observe(page);
    }

    return () => {
      window.removeEventListener("resize", updateLayout);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  const cameraZ = position[2] * (viewportHeight / 1080);
  const pixelsPerWorldUnit =
    viewportHeight /
    (2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)) * cameraZ);

  return (
    <div
      className="interactive-lanyard-layer"
      style={{
        position: isMobile ? "absolute" : "fixed",
        inset: 0,
        width: "100vw",
        height: isMobile ? "650px" : "100vh",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <Canvas
        key={viewportHeight}
        style={{ pointerEvents: "none" }}
        eventSource={eventSource ?? undefined}
        eventPrefix="client"
        camera={{ position: [position[0], position[1], cameraZ], fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#000000"), transparent ? 0 : 1);
        }}
      >
        <ambientLight intensity={Math.PI} />
        <directionalLight
          color="#ffffff"
          intensity={4}
          position={[-300, 250, 500]}
        />
        <directionalLight
          color="#d97757"
          intensity={2}
          position={[300, 100, 300]}
        />

        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Suspense fallback={null}>
            <Band
              isMobile={isMobile}
              anchorScreen={anchorScreen}
              pixelsPerWorldUnit={pixelsPerWorldUnit}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
            />
          </Suspense>
        </Physics>
      </Canvas>
    </div>
  );
}

type LanyardBody = RapierRigidBody & {
  smoothPosition?: THREE.Vector3;
};

type BandProps = {
  isMobile: boolean;
  anchorScreen: { x: number; y: number };
  pixelsPerWorldUnit: number;
  frontImage: string | null;
  backImage: string | null;
  imageFit: "cover" | "contain";
  lanyardImage: string | null;
  lanyardWidth: number;
};

function Band({
  isMobile,
  anchorScreen,
  pixelsPerWorldUnit,
  frontImage,
  backImage,
  imageFit,
  lanyardImage,
  lanyardWidth,
}: BandProps) {
  const { size } = useThree();
  const lanyardLine = useRef<THREE.Mesh>(null);

  const fixedPoint = useRef<RapierRigidBody>(null!);
  const jointOne = useRef<LanyardBody>(null!);
  const jointTwo = useRef<LanyardBody>(null!);
  const jointThree = useRef<RapierRigidBody>(null!);
  const idCard = useRef<RapierRigidBody>(null!);

  const anchorX = (anchorScreen.x - size.width / 2) / pixelsPerWorldUnit;
  const anchorY = (size.height / 2 - anchorScreen.y) / pixelsPerWorldUnit;
  const shortViewport = size.height < 800;
  const ropeSegmentLength = isMobile || shortViewport ? 0.5 : 0.64;
  const cardHeightScale = isMobile ? 2 : shortViewport ? 2.3 : 2.7;
  const cardWidthScale = cardHeightScale * 1.055;
  const cardHalfHeight = cardHeightScale * 0.6;
  const cardVisualOffset = -cardHeightScale * 0.53;
  const colliderWidth = cardHeightScale * 0.375;
  const colliderHeight = cardHeightScale * 0.5;

  useEffect(() => {
    const points = [
      { body: fixedPoint.current, y: anchorY },
      { body: jointOne.current, y: anchorY - ropeSegmentLength },
      { body: jointTwo.current, y: anchorY - ropeSegmentLength * 2 },
      { body: jointThree.current, y: anchorY - ropeSegmentLength * 3 },
      {
        body: idCard.current,
        y: anchorY - ropeSegmentLength * 3 - cardHalfHeight,
      },
    ];

    points.forEach(({ body, y }) => {
      body?.setTranslation({ x: anchorX, y, z: 0 }, true);
      body?.setLinvel({ x: 0, y: 0, z: 0 }, true);
      body?.setAngvel({ x: 0, y: 0, z: 0 }, true);
    });
  }, [anchorX, anchorY, cardHalfHeight, ropeSegmentLength]);

  const pointerPosition = new THREE.Vector3();
  const angularVelocity = new THREE.Vector3();
  const cardRotation = new THREE.Vector3();
  const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

  const [draggedPosition, setDraggedPosition] = useState<
    false | THREE.Vector3
  >(false);

  const [isHovered, setIsHovered] = useState(false);

  const { nodes, materials } = useGLTF("/lanyard/card.glb") as any;

  const strapTexture = useTexture(lanyardImage || "/lanyard/lanyard.png");
  const frontTexture = useTexture(frontImage || "/profile/izhar.jpeg");
  const backTexture = useTexture(backImage || "/lanyard/lanyard.png");

  const cardTexture = useMemo(() => {
    const originalTexture = materials.base.map as THREE.Texture;
    const originalImage = originalTexture.image as HTMLImageElement;

    if (!originalImage) return originalTexture;

    const canvas = document.createElement("canvas");
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;

    const context = canvas.getContext("2d");

    if (!context) return originalTexture;

    context.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

    const drawFitted = (
      image: CanvasImageSource & { width: number; height: number },
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      const pickScale = imageFit === "contain" ? Math.min : Math.max;
      const scale = pickScale(width / image.width, height / image.height);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;

      context.save();
      context.beginPath();
      context.rect(x, y, width, height);
      context.clip();
      context.drawImage(
        image,
        x + (width - drawWidth) / 2,
        y + (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
      context.restore();
    };

    const drawFace = (
      texture: THREE.Texture,
      rect: { x: number; y: number; width: number; height: number }
    ) => {
      const image = texture.image as CanvasImageSource & {
        width: number;
        height: number;
      };

      if (!image?.width) return;

      const x = rect.x * canvas.width;
      const y = rect.y * canvas.height;
      const width = rect.width * canvas.width;
      const height = rect.height * canvas.height;

      context.fillStyle = "#11131c";
      context.fillRect(x, y, width, height);
      drawFitted(image, x, y, width, height);
    };

    if (frontImage) {
      drawFace(frontTexture, FRONT_UV_RECT);
    } else if (frontTexture.image) {
      const x = FRONT_UV_RECT.x * canvas.width;
      const y = FRONT_UV_RECT.y * canvas.height;
      const width = FRONT_UV_RECT.width * canvas.width;
      const height = FRONT_UV_RECT.height * canvas.height;

      context.fillStyle = "#11131c";
      context.fillRect(x, y, width, height);

      context.drawImage(
        frontTexture.image as HTMLImageElement,
        x,
        y,
        width,
        height
      );
    }

    if (backImage) drawFace(backTexture, BACK_UV_RECT);

    const finalTexture = new THREE.CanvasTexture(canvas);
    finalTexture.colorSpace = THREE.SRGBColorSpace;
    finalTexture.flipY = originalTexture.flipY;
    finalTexture.anisotropy = 16;
    finalTexture.needsUpdate = true;

    return finalTexture;
  }, [
    backImage,
    backTexture,
    frontImage,
    frontTexture,
    imageFit,
    materials.base.map,
  ]);

  const [ropeCurve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const bodySettings: RigidBodyProps = {
    type: "dynamic",
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
    canSleep: true,
  };

  const getSmoothPosition = (body: LanyardBody) => {
    if (!body.smoothPosition) {
      body.smoothPosition = new THREE.Vector3().copy(body.translation());
    }

    return body.smoothPosition;
  };

  useRopeJoint(fixedPoint, jointOne, [
    [0, 0, 0],
    [0, 0, 0],
    ropeSegmentLength,
  ]);
  useRopeJoint(jointOne, jointTwo, [
    [0, 0, 0],
    [0, 0, 0],
    ropeSegmentLength,
  ]);
  useRopeJoint(jointTwo, jointThree, [
    [0, 0, 0],
    [0, 0, 0],
    ropeSegmentLength,
  ]);

  useSphericalJoint(jointThree, idCard, [
    [0, 0, 0],
    [0, cardHalfHeight, 0],
  ]);

  useEffect(() => {
    if (!isHovered) {
      document.body.style.cursor = "auto";
      return;
    }

    document.body.style.cursor = draggedPosition ? "grabbing" : "grab";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [isHovered, draggedPosition]);

  useFrame((state, delta) => {
    if (draggedPosition) {
      state.raycaster.setFromCamera(state.pointer, state.camera);
      state.raycaster.ray.intersectPlane(dragPlane, pointerPosition);

      [idCard, jointOne, jointTwo, jointThree, fixedPoint].forEach((body) =>
        body.current?.wakeUp()
      );

      idCard.current?.setNextKinematicTranslation({
        x: pointerPosition.x - draggedPosition.x,
        y: pointerPosition.y - draggedPosition.y,
        z: pointerPosition.z - draggedPosition.z,
      });
    }

    if (!fixedPoint.current || !lanyardLine.current) {
      return;
    }

    [jointOne, jointTwo].forEach((joint) => {
      const smoothPosition = getSmoothPosition(joint.current);
      const distance = smoothPosition.distanceTo(joint.current.translation());
      const speed = Math.max(0.1, Math.min(1, distance));

      smoothPosition.lerp(joint.current.translation(), delta * speed * 50);
    });

    ropeCurve.points[0].copy(jointThree.current.translation());
    ropeCurve.points[1].copy(getSmoothPosition(jointTwo.current));
    ropeCurve.points[2].copy(getSmoothPosition(jointOne.current));
    ropeCurve.points[3].copy(fixedPoint.current.translation());

    ropeCurve.curveType = "chordal";

    const geometry = lanyardLine.current.geometry as MeshLineGeometry;
    geometry.setPoints(ropeCurve.getPoints(isMobile ? 16 : 32));

    angularVelocity.copy(idCard.current.angvel());
    cardRotation.copy(idCard.current.rotation());

    idCard.current.setAngvel(
      {
        x: angularVelocity.x,
        y: angularVelocity.y - cardRotation.y * 0.25,
        z: angularVelocity.z,
      },
      true
    );
  });

  strapTexture.wrapS = THREE.RepeatWrapping;
  strapTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group>
        <RigidBody
          ref={fixedPoint}
          type="fixed"
          position={[anchorX, anchorY, 0]}
        />

        <RigidBody
          ref={jointOne}
          position={[anchorX, anchorY - ropeSegmentLength, 0]}
          {...bodySettings}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={jointTwo}
          position={[anchorX, anchorY - ropeSegmentLength * 2, 0]}
          {...bodySettings}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={jointThree}
          position={[anchorX, anchorY - ropeSegmentLength * 3, 0]}
          {...bodySettings}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={idCard}
          position={[
            anchorX,
            anchorY - ropeSegmentLength * 3 - cardHalfHeight,
            0,
          ]}
          {...bodySettings}
          type={draggedPosition ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[colliderWidth, colliderHeight, 0.01]} />

          <group
            scale={[cardWidthScale, cardHeightScale, cardHeightScale]}
            position={[0, cardVisualOffset, -0.05]}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            onPointerUp={(event: ThreeEvent<PointerEvent>) => {
              event.stopPropagation();
              (event.target as Element).releasePointerCapture(event.pointerId);
              setDraggedPosition(false);
            }}
            onPointerDown={(event: ThreeEvent<PointerEvent>) => {
              event.stopPropagation();
              (event.target as Element).setPointerCapture(event.pointerId);

              setDraggedPosition(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(pointerPosition.copy(idCard.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardTexture}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>

            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={lanyardLine}>
        <meshLineGeometry />

        <meshLineMaterial
          args={[
            {
              color: "white",
              lineWidth: lanyardWidth,
              resolution: new THREE.Vector2(size.width, size.height),
            },
          ]}
          color="white"
          depthTest={false}
          resolution={[size.width, size.height]}
          useMap={1}
          map={strapTexture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
