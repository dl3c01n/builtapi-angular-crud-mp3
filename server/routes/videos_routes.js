const express = require('express')
const app = express()
const videoExpressRoute = express.Router();

let VideoSchema = require('../models/video_model')

// Get video
videoExpressRoute.route('/').get((req, res) => {
    VideoSchema.find((err, data) => {
        if(err){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

// Create user
videoExpressRoute.route('/create-video').post((req, res) => {
    VideoSchema.create(req.body, (error, data) => {
        console.log(req.body)
        if (error) {
            console.error(error)
            return res.json(error)
        } else {
            res.json(data)
        }
    })
});


// Get single user
videoExpressRoute.route('/get-video/:id').get((req, res) => {
    VideoSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return error
        } else {
            res.json(data)
        }
    })
})


// Update user
videoExpressRoute.route('/update-video/:id').put((req, res) => {
    VideoSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return error;
        } else {
            res.json(data)
            console.log('Video successfully updated!')
            return data;
        }
    })
})

// Delete student
videoExpressRoute.route('/remove-video/:id').delete((req, res) => {
    VideoSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return res.status(500);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = videoExpressRoute