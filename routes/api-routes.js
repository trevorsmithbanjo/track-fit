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

    app.post("/api/workouts/", ({ body }, res) => {
        console.log("/api/workouts/ route");
        console.log({ body });

        db.Workout.create({
            body: {
                day: Date.now,
            }
        })
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
        console.log(req.params);

        db.Workout.findOneAndUpdate({ _id: req.params }, { $push: { exercises: req.body } }, { new: true })
            .then(dbWorkout => {
                console.log({ dbWorkout });
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    })
}