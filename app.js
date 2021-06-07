const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const app = express();

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//handlebars middleware
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

//home page
app.get("/", (req, res) => {
  res.render("contact");
});

//Submitting form
app.post("/send", async (req, res) => {
  const output = `
    <p>You have contact request</p>
    <h3>Contact Details </h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    </ul>
  `;
  const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    service: "gmail",
    auth: {
      user: "rigel4g@gmail.com",
      pass: "@rigel123",
    },
  });
  // transporter.verify().then(console.log).catch(console.error);
  transporter
    .sendMail({
      from: '"Nnadozie Emmanuel" <rigel4g@gmail.com>', // sender address
      to: "alozie4God@gmail.com, nnadoziealozie@yahoo.com", // list of receivers
      subject: "contact form", // Subject line
      text: "There is a new article. It's about sending emails, check it out!", // plain text body
      html: output, // html body
    })
    .then((info) => {
      console.log({ info });
    })
    .catch(console.error);

  res.render("contact", { msg: "email has been sent" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
