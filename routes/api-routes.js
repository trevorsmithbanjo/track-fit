const db = require("../models");

module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
        // get workouts from db and add total duration
        db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }
        ])
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    })

    app.post("/api/workouts", (req, res) => {
        // create workout object without exercises
        db.Workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    })

    app.put("/api/workouts/:id", (req, res) => {
        // find workout object by id and add exercises
        db.Workout.findByIdAndUpdate(req.params.id, {
            $push: {
                exercises: req.body
            }
        }, { new: true, runValidators: true })
            .then((dbWorkout) => {
                console.log(`Promise result dbWorkout: ${dbWorkout}`);
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    })

    app.get("/api/workouts/range", (req, res) => {
        // find last 7 workouts to add to stats page
        db.Workout.find({}).sort({ _id: -1 }).limit(7)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    })
}