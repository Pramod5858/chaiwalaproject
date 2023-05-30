const express = require("express");
const Users = require("../Model/users");
var nodemailer = require("nodemailer");
const Otp = require("../Model/otp");
const bcrypt = require("bcrypt");
//const { OTP1 } = require("../Support/otp");
const jwt = require("jsonwebtoken");
//const users = require("../Model/users");
const JWT_SECRET = "Knowledgeisthebestsolution";

exports.usersdetails = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let getdetail = await Users.find();

    console.log(getdetail);
    res.send(getdetail);
  } catch (error) {
    res.send(error);
  }
};

exports.userssignup = async (req, res) => {
  try {
    //console.log(req.body);
    const { name, email, password } = req.body;

    //console.log(req.body.email);

    if (!email || !password || !name) {
      console.log("Please mention the proper email or password");
    }

    // let getdetail = await Users.find();

    // console.log(getdetail);
    // res.send(getdetail);

    let getdetails = await Users.findOne({ email: email });

    if (getdetails) {
      return res.status(401).send({ message: "allready registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //console.log(hashedPassword);

    const user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    //create token :- not needed token here it is created in verifytoken js file
    // const token = await jwt.sign({ user_id: user._id }, JWT_SECRET);
    // //save user token
    // user.token = token;

    user.save();
    console.log(user);

    //    const otp = 12345;
    const otp = await generateOTP();
    console.log(otp);

    const newemailotp = await Otp.create({
      email: req.body.email,
      otp: otp,
    });

    newemailotp.save();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: "pramodmukane@gmail.com",
        pass: "avgeltfkhnqpxyre",
      },
    });

    var mailOptions = {
      from: "pramodmukane@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      text: "This is otp " + otp,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // return new user
    res.status(201).json({
      message:
        "Successfully User created and OTP is sent to registered email and know you have to verify otp ",
    });

    //let signupdetails = await
  } catch (error) {
    console.log(error);
  }
};

// const OTP = async(otp, email) => {
// try {
//     const getemailotp = Otp.find();

//     console.log(getemailotp);
//     res.send(getemailotp)

// } catch (error) {
//     res.send(error)
// }

// }

function generateOTP() {
  var string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let otp = "";

  // Find the length of string
  var len = string.length;
  for (let i = 0; i < 6; i++) {
    otp += string[Math.floor(Math.random() * len)];
  }
  return otp;
}

exports.verifyotp = async (req, res) => {
  try {
    console.log(req.body);
    const { otp, email } = req.body;

    const user = await Otp.findOne({ email: email });
    console.log(user);
    const otprecord = user.otp;

    if (otprecord !== otp) {
      res.status(401).send({
        message:
          "Not able to match this otp or it must be expired please check it once and try again",
      });
    } else {
      const token = jwt.sign(
        {
          email: user.email,
          _id: user._id,
        },
        JWT_SECRET
      );

      const updateverified = await Users.updateOne(
        { email: email },
        { $set: { verified: true } }
      );

      console.log(updateverified, token);
      res
        .status(200)
        .send({ message: "Verification successfully done", user: token });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { password, email } = req.body;

    // let checkPassword = finddetails.password;
    // console.log(checkPassword);

    let user = await Users.findOne({email:email})

    console.log("you came till here1");
    let comparePassword = await bcrypt.compare(password, user.password);
    console.log("you came till here2");
    if (!comparePassword) {
      return res.status(401).send({ message: "not able to match password " });
    }

    // let user1 = await user.select("-password");

    // console.log("you came till here3");
    // console.log(user1);
    // if (user) {
    //   jwt.sign({ user }, JWT_SECRET, { expiresIn: "2h" }, (err, token) => {
    //     if (err) {
    //       res.send({ result: "somthing went wrong, please try in some time" });
    //     }
    //     res.send({ user, auth: token });
    //   });
    // } else {
    //   res.send({ result: "No users found" });
    // }

    let data = {
      _id:user._id,
      id: user.id,
      email: user.email,
      name: user.name,
    };

    console.log("you came till here3")
    //console.log(data);
    const token = await jwt.sign(data, JWT_SECRET);

    //localStorage.setItem("token", {token})

    // data.user.token = token;

    //user.save()

    // const user1 = await loggedIn.create({
    //   Id: data.user.id,
    //   name: data.user.name,
    //   email: data.user.email,
    //   token: data.user.token
    // });

    // user1.save()
    //create token
    //const token = await jwt.sign({ user_id: user._id }, JWT_SECRET);
    // save user token
    //user.token = token;

    // user.save()
    // console.log(token);

    // user.save()
    // console.log(token);

    //create token
    //  const token = await jwt.sign({ user_id: user._id }, JWT_SECRET);
    //  // save user token
    //  user.token = token;

    //  user.save()
    //  console.log(token);

    // console.log("you are here know " + data.id + data.email + data.name);

    // //localStorage.getItem
    console.log(token);
    console.log(data);

    res.status(200).json({ data, token: token });

    // console.log(data.finddetails);
    // data = data.finddetails;

    //  let user = finddetails.select("-password")
    //console.log(user);
    //let use = await generateAuthToken(user){
    // function generateAuthToken(data) {
    //   let user;
    //   if (user) {
    //     jwt.sign(data, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
    //       if (err) {
    //         res.status(401).send({ message: "Something went wrong , fix it " });
    //       }
    //       res.send({ user, auth: token });
    //     });
    //   }
    //   return user;
    // }
  } catch (error) {
    res.send(error);
  }
};
//======================================================
