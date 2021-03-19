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
        // logo:
        //   "https://images.unsplash.com/photo-1597942981460-413ddac99af3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzE0fHxuaWtlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
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
      from: "alexfa@list.ru",
      subject: "Email varification",
      html: emailBody,
    };
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
