const router = require('express').Router();
const Workout = require('../models/workout.js');

router.post("/workouts", (req, res) => {
  db.Workout.create(body).then((dbWorkout => {
    res.json(dbWorkout);
})).catch(err => {
    res.json(err);
    });
});

router.put("/api/workout/:id", ({body, params}, res) => {
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
        $inc: { totalDuration: req.body.duration },
        $push: { exercises: req.body }
    },
    { new: true }).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;
