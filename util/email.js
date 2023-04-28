const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mailto:gudasiva.reddy@brainvire.com",
          pass: "Sivanagi9182@",
      },
    });

    await transporter.sendMail({
      from: "mailto:gudasiva.reddy@brainvire.com",
      to: email,
      subject: subject,
      html: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;