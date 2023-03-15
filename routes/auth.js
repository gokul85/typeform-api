const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");

router.post('/register', async (req,res) => {
    try {
        const username = await User.findOne({ username: req.body.username });
        const email = await User.findOne({ email: req.body.email });
        if (username) {
        res.status(200).json({ err: "Username Not Available" })
        } else if (email) {
        res.status(200).json({ err: "Email already Registered" })
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
              username: req.body.username,
              email: req.body.email,
              password: hashedPass,
            });
      
            const newuser = await newUser.save();
            const user = await User.findOne({ username: req.body.username });
            const { password, ...others } = user._doc;
            res.status(200).json(others);
          }
    } catch (error) {
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(200).json({ err: "Invalid Username!" })
      } else {
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
        res.status(200).json({ err: "Wrong Password!" })
      } else {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      }
    }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;