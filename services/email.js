const Mailgen = require("mailgen");
const sgMail = require("@sendgrid/mail");
const { dev, prod } = require("../config/email.json");

require("dotenv").config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;

  constructor(env) {
    switch (env) {
      case "development":
        this.link = dev;
        break;

      case "production":
        this.link = prod;
        break;

      default:
        this.link = dev;
        break;
    }
  }

  #createTemplate(verificationToken) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "cerberus",
      product: {
        name: "Contacts",
        link: this.link,
        logo: "https://cdn-images-1.medium.com/max/900/0*9hcinRdaHicrNpNE.jpg",
      },
    });

    const template = {
      body: {
        name: "New user",
        intro:
          "Welcome to Application! We're very excited to have you on board.",
        action: {
          instructions: "To get started, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}/api/auth/verify/${verificationToken}`,
          },
        },
        outro: "Just do it.",
      },
    };

    return mailGenerator.generate(template);
  }

  async sendEmail(verificationToken, email) {
    const emailBody = this.#createTemplate(verificationToken);

    console.log(email);

    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: "alex.fedorkan@gmail.com",
      subject: "Email verification",
      html: emailBody,
    };
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
