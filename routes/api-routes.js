const db = require("../models");

module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    })

    //app.post("/api/workouts/", ({ body }, res) => {
    app.post("/api/workouts", (req, res) => {
        //console.log("/api/workouts/ route");
        console.log("Inside post");
        console.log(req.body);
        //console.log({ body });

        db.Workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    })

    app.put("/api/workouts/:id", (req, res) => {
        console.log("/api/workouts/:id route");
        console.log(req.body);
        console.log(`request id: ${req.params.id}`);

        db.Workout.findByIdAndUpdate(req.params.id, {
            $push: {
                exercises: req.body /*[
                    {
                        type: req.body.type,
                        name: req.body.name,
                        weight: req.body.weight,
                        sets: req.body.sets,
                        reps: req.body.reps,
                        duration: req.body.duration
                    }
                ]*/
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
}