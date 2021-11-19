const router = require('express').Router();
const Workout = require('../models/workout');


router.get("/workouts", async (req, res) => {
await Workout.aggregate([{
    $addFields: {
        totalDuration: { $sum: "$exercises.duration" } ,
    }
}]).sort({ day: 1 }).then(Activity => {
        res.json(Activity);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/workouts/range", async (req, res) => {
    await Workout.aggregate([{
        $addFields: {
            totalDuration: { $sum: "$exercises.duration" } ,
        }
    }]).sort({ day: -1 }).limit(10).then(Activity => {
            res.json(Activity);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/workouts", ({ body }, res) => {
  Workout.create(body).then((Activity => {
    res.json(Activity);
})).catch(err => {
    res.json(err);
    });
});

router.put("/workouts/:id", ({body, params}, res) => {
  Workout.findOneAndUpdate({_id: params.id}, { $push: {exercises: body}})
  .then(Activity => {
      res.json(Activity);
  })
   .catch(err => {
       res.status(400).json(err);
   });
});

module.exports = router;
