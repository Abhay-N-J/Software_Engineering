const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require("cors")

const userModel = require('./models/userModel');
const surveyModel = require('./models/surveyModel')
const answerModel = require('./models/answerModel') 

dotenv.config();
const mongo_uri = process.env.MONGO_URL

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

mongoose.connect(mongo_uri, { dbName: "SurveySoftware" })

app.post("/signup", async (req, res, next) => {
    try {
        const { email, pass } = req.body;
        const hash = await bcrypt.hash(pass, 10);
        const doc = await userModel.findOne({email: email})
        if (doc) {
            return res.status(409).json({
                token: false,
                error: "User already exists"
            })
        }
        const err = await userModel.create({
            email: email,
            pass: hash
        })
        console.log(err)

        return res.status(200).json({
            token: true,
            error: false
        })

    }
    catch (err) {
        next(err)
    }
})

app.post("/login", async (req, res, next) => {
    try {
        const { email, pass } = req.body;
        const doc = await userModel.findOne({ email: email});
        if (doc === null) {
            return res.status(404).json({
                token: false,
                error: "User Doesn't exist"
            })
        }
        const hash = await bcrypt.compare(pass, doc.pass)
        if (hash) {
            return res.status(200).json({
                token: {
                    id: Buffer.from(doc._id).toString('hex'),
                    user: Buffer.from(email).toString('hex')
                },
                error: false
            })
        }
        else {
            return res.status(401).json({
                token: false,
                error: "Wrong email or password"
            })
        }
        
    }
    catch (err) {
        next(err)
    }
})

app.post('/create', async (req, res, next) => {
    try {
        const { user, questions, name } = req.body;
        const email = Buffer.from(user, 'hex').toString('utf-8')        
        const doc = await surveyModel.findOne({email: email})
        var surveys = {}
        if (doc)
            surveys = doc.surveys;
        surveys[name] = questions;
        surveyModel.findOneAndUpdate({email: email}, {
            email: email,
            surveys: surveys
            },
            { upsert: true }
        ).then((doc) => {
           if (doc)
                return res.status(200).json({
                    error: false,      
                })
        })
    } catch(e) {
        next(e)
    }
})

app.get('/survey', async (req, res, next) => {
    try {
        const user = req.query.user;
        const survey = req.query.survey;
        var email = Buffer.from(user, 'hex').toString('utf-8');
        var doc = await surveyModel.findOne({email: email})
        if (doc === null)
            doc = await surveyModel.findOne({email: user})
        if (!doc || !doc.surveys[survey]) {
            return res.status(404).json({
                error: "User or Survey not found"
            })
        }
        return res.status(200).json({
            error: false,
            survey: doc.surveys[survey]
        })

    }
    catch (err) {
        console.log(err)

        next(err)
    }
}) 

app.get('/answers', async (req, res, next) => {
    try {
        const user = req.query.user;
        const survey = req.query.survey;
        var email = Buffer.from(user, 'hex').toString('utf-8');
        var doc = await answerModel.findOne({email: email, survey: survey})
        if (doc === null)
            doc = await answerModel.findOne({email: user, survey: survey})
        if (!doc) {
            return res.status(404).json({
                error: "User or Survey not found"
            })
        }
        return res.status(200).json({
            error: false,
            answers: doc.answers
        })

    }
    catch (err) {
        console.log(err)
        next(err)
    }
})

app.get('/list', async (req, res, next) => {
    try {
        const user = req.query.user;
        const email = Buffer.from(user, 'hex').toString('utf-8')
        const doc = await surveyModel.findOne({email: email})
        let surveys = []
        Object.keys(doc.surveys).map((v, i) => {
            surveys.push(v)
        })
        return res.status(200).json({
            surveys: surveys,
            error: false
        })
    }
    catch (err) {
        next(err)
    }
})

app.delete('/delete/:user/:survey', async (req, res, next) => {
    try {
        const survey = req.params.survey
        const user = req.params.user
        const email = Buffer.from(user, 'hex').toString('utf-8')
        const doc = await surveyModel.findOne({email: email})
        let surveys = doc.surveys;
        delete surveys[survey];
        surveyModel.findOneAndUpdate({email: email}, {
            email: email,
            surveys: surveys
            },
        ).then(doc => {
            if (doc)
            return res.status(200).json({
                error: false,      
            })
        })
    }
    catch (err) {
        console.log(err)
        next(err)
    }
})

app.put('/submit', async (req, res, next) => {
    try {
        const {user, survey, answers} = req.body;
        const doc = await answerModel.findOne({email: user, survey: survey })
        // if (!doc || !doc.surveys[survey])  
        //     return res.status(404).json({
        //         error: "User or Survey not found"
        //     })
        let ans = []
        if (doc)
            ans = [...doc.answers]
        ans.push(answers)
        answerModel.findOneAndUpdate({ email: user, survey: survey }, {
            email: user, 
            answers: ans,
            survey: survey
        }, {upsert: true}
        ).then((doc) => {
            if (doc)
                 return res.status(200).json({
                     error: false,      
                 })
         }).catch(e => next(e))
    } catch(err) {
        next(err)
    }
})


app.use((err, req, res, next) => {
    console.log(err.toString())
    res.status(400).json({
        token: false,
        error: err.toString()
    })
})

const server = app.listen(6969, () => console.log("Connection at 6969"))

// userModel.find({}).then((users) => console.log(users));
// bcrypt.hash("c123", 10)
// .then(hash => {
//     userModel.create({
//         email: "c@gmail.com",
//         pass: hash
//     })
//     // user.save()
//     //     .then(onfulfilled => console.log(onfulfilled))
// })
process.on('SIGINT', function(params) {
    mongoose.disconnect()
        .then(() => {
            console.log("Exiting...")
        })
    server.close()
});


