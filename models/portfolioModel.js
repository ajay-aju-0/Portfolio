const mongoose = require('mongoose')

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


module.exports = {
    Intro: mongoose.model("intros",introSchema),
    About: mongoose.model("about",aboutSchema),
    Experience: mongoose.model("experience",experienceSchema),
    Project: mongoose.model("projects",projectSchema),
    Certificate: mongoose.model("certificates",certificateSchema),
    Contact: mongoose.model("contact",contactSchema),
    Resume: mongoose.model("Resume",resumeSchema)
}