const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors")
const path = require("path")
const app = express();
const dir = path.join(__dirname, 'public');
let mailOptions;
app.use(cors());
app.options('/mail', cors())
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Max-Age', 86400);
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.send('Server Running');
});

//EMAIL ADDRESS SENDING MAIL FROM
const mail = nodemailer.createTransport({
    service: "yahoo",
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: false,
    auth: {
        user: process.env['MAIL_USER'],
        pass: process.env['MAIL_PW'],
    }
});

//MAIL ROUTE IS /mail
app.post('/mail', function (req, res, next) {
    mailOptions = {
    from: 'DIGITAL AMOEBA CONTACT FORM',
    to: process.env['TO_ME'],
    cc: process.env['TO_HIM'],
    subject: "Message from Digital Amoeba Contact Form",
    text: `
    FROM: ${req.name}
    EMAIL: ${req.email}
    SUBJECT: ${req.subject}
    MESSAGE: ${req.message}
    `,
  };
  mail.sendMail(mailOptions, function(error, info) {
    if (error) console.log(error, info);
    else console.log("Email sent!");
  });
  console.log('Contact Form Email Sent!!')
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

// LISTEN FOR HTTP REQUESTS
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
