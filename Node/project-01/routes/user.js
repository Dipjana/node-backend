const express = require("express");
const router = express.Router();

const {handleGetAllUsers} = require('../controllers/user');

router.get("/", handleGetAllUsers);

router.route("/:id")
    .get( async (req, res) => {
        const user = await User.finById(res.params.id)
        if(!user) return res.status(404).json({ status: "Not Found"});
        return res.json(user);
    })
    .patch( async (req, res) => {
           await User.findByIdAndUpdate(req.params.id, { last_name: "Changed"});
            return res.json({ status: "Success" });
        })
    .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({ status: "Success" });
    })

router.post("/", async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({
            msg: "All fields are required",
        })
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    });

    return res.status(201).json({ status: "Success" });
});

module.exports = router;
