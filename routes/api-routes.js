module.exports = (app) => {
    app.get("api/workouts", (req, res) => {
        res.json(req.body);
    })
}