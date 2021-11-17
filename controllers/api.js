const router = require('express').Router();
const Workout = require('../models/workout.js');


router.get("/workouts", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        dbWorkout.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;

        });

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

router.get("/workouts/range", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });

});

router.post("/workouts", (req, res) => {
  db.Workout.create(body).then((dbWorkout => {
    res.json(dbWorkout);
})).catch(err => {
    res.json(err);
    });
});

router.put("/workout/:id", ({body, params}, res) => {
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
