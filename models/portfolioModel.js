import mongoose from 'mongoose';

const introSchema = new mongoose.Schema({
    welcomeText:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    caption:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

const aboutSchema = new mongoose.Schema({
    lottieUrl:{
        type: String,
        required: true
    },
    description1:{
        type: String,
        required: true
    },
    description2:{
        type: String,
        required: true
    },
    skills:{
        type: Array,
        required: true
    }
});

const experienceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    period:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    }
});

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    link:{
        type: String
    },
    technologies:{
        type: Array,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    }
});

const certificateSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    organisation:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    }
});

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Array,
        required: true
    },
    country:{
        type: String,
        required: true
    },
});

const resumeSchema = new mongoose.Schema({
    filename:{
        type: String,
        required: true
    },
    path:{
        type: String,
        required: true
    }
})


export const Intro = mongoose.model("intros", introSchema);
export const About = mongoose.model("about", aboutSchema);
export const Experience = mongoose.model("experience", experienceSchema);
export const Project = mongoose.model("projects", projectSchema);
export const Certificate = mongoose.model("certificates", certificateSchema);
export const Contact = mongoose.model("contact", contactSchema);
export const Resume = mongoose.model("Resume", resumeSchema);