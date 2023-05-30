const nodemailer = require("nodemailer");
const Otp = require("../Model/otp");
//const Otp = require("../Model/otp");

const OTP1 = async(otp, email) => {

try {
console.log(email);
const getemailotp = await Otp.create({otp: otp, email: email});

console.log(getemailotp);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    auth: {
      user: 'pramodmukane@gmail.com',
      pass: 'avgeltfkhnqpxyre'
    }
  });
  
  var mailOptions = {
    from: 'pramodmukane@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'This is otp '+otp
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


// console.log({message:
//     "Successfully User created and OTP is sent to registered email and know you have to verify otp ",})

// res.send({
//     message:
//       "Successfully User created and OTP is sent to registered email and know you have to verify otp ",
//   });
return true;
} catch (error) {
    res.send(error)
}


}

module.exports = OTP1;

