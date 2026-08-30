

export type Project = {
    title: string;
    description: string;
    tags: string[];
    image: string;
    link?: string;
};

export const profile = {
    name : "Izhar Octafirlian Susilo",
    role : "Sofware Developer",
    location : "Indonesia",
    introduction : "I build clean, useful digital experiences and enjoy learning through real projects.",
    email : "izharsusilo12@gmail.com",
    availability : "Looking for Internship",
};

export const projects: Project[] = [
    {
        title: "The Amber Shade",
        description:
            "A folklore-inspired Unity horror game developed with an international team for a Dutch client, where players navigate a wheat maze while evading the Korengeest.",
        tags: ["Unity", "3D", "Horror", "Folklore"],
        image: "",
        link: "https://netherox.itch.io/the-amber-shade",
    },
    {
        title: "ODOL Truck Detection",
        description:
            "A two-stage computer vision web application that detects trucks with YOLOv8 and classifies them as NORMAL or ODOL with MobileNetV2 through FastAPI.",
        tags: ["YOLOv8", "MobileNetV2", "FastAPI", "Docker", "Hugging Face Spaces"],
        image: "",
        link: "https://github.com/kaiichin/ODOL-Truck-Detection",
    },
    {
        title: "Zero-DCE Low-Light Enhancement",
        description:
            "A group computer vision application that enhances low-light images using Zero-DCE and TensorFlow/Keras through an interactive Streamlit interface.",
        tags: ["Zero-DCE", "TensorFlow/Keras", "Python", "Streamlit"],
        image: "",
        link: "https://github.com/kaiichin/Zero-DCE-Low-Light-Enhancement",
    },
    {
        title: "NLP Music Genre Classifier",
        description:
            "A group NLP research project that classifies six music genres from 60,000 song lyrics using TF-IDF, NMF topic features, and Random Forest.",
        tags: ["Python", "NLP", "TF-IDF", "NMF", "Random Forest"],
        image: "",
        link: "https://github.com/kaiichin/Classify-Music-Genre-NMF",
    },
];
