const nodemailer = require("nodemailer");

const sendEmail = async (recipient, emailType, data, cb) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    // auth: {
    //   user: "edufixup@gmail.com",
    //   pass: "gxgzllndvusfoziy", //Usually email senders app password will be inserted here, I am removing mine for my security purpose.
    // },
    auth: {
      user: "topusumaiya@gmail.com",
      pass: "tjhoztqzquwnuixo", //Usually email senders app password will be inserted here, I am removing mine for my security purpose.
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  let subject = "";
  let text = "";
  let html = "";

  if (emailType === "resetPassword") {
    subject = "For Reset Password";
    text = "Your Password reset code : " + data.url;
  } else {
    subject = "Email Verification";
    text = "Please click the link to verify your email. " + data.url;
  }

  let mailOptions = {
    from: "topusumaiya@gmail.com", // sender address
    to: recipient, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  };
  try {
    let sent = await transporter.sendMail(mailOptions, (err, info) => {
      if (info) {
        console.log("Mail has been sent:", info);
      }
      if (err) {
        console.log(err);
        cb("error-" + err.message);
      } else {
        //   console.log(info);
        cb("sent");
      }
    });
  } catch (error) {
    console.log(error);
    cb("error-" + JSON.stringify(error));
  }
};

module.exports = sendEmail;
