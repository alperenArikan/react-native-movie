const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/api/sign", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (password) {
        const hash = await bcrypt.hash(password, 8);
        password = hash;
    }
    try {
        const User = new UserModel({ email, password });
        const response = await User.save();
    } catch (err) {
        console.log(err);
    }
});

router.post("/api/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res
                .status(401)
                .send({ message: "Auth Failed: No such user" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res
                .status(401)
                .send({ message: "Auth Failed: Wrong password" });
        }
        const token = await jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET
        );

        res.status(200).send(token);
    } catch (err) {
        console.log(err);
    }
});

const deneme = async () => {
    const deneme = jwt.verify(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTc5YzI0MTZlMGIyNGJkY2E0YzYyNiIsImVtYWlsIjoiYWxwZXJlbi5hcmlrYW45NUBnbWFpbC5jb20iLCJpYXQiOjE2MTYzNjExNDl9.bH4tE2sm99ty9PumvSyW0AwJRjf_ElSi5wCaHLJqxI4",
        process.env.JWT_SECRET
    );
    console.log(deneme);
};
deneme();

module.exports = router;
