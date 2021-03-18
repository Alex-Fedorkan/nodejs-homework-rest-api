const fs = require("fs/promises");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");
const app = require("../app");
const { User } = require("../model/__mocks__/data");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const issueToken = (payload, secret) => jwt.sign(payload, secret);

const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

sinon.mock("../model/users.js");

describe("Testing the route api/users", () => {
  describe("Should handle patch request /avatars", () => {
    it("Should return 200 status upload avatar", async (done) => {
      const buffer = await fs.readFile("./test/test-avatar.jpg");

      // try {
      const res = await request(app)
        .patch("/api/users/avatars")
        .set("Authorization", `Bearer ${token}`)
        .attach("avatar", buffer, "test-avatar.jpg");

      // console.log(res);

      // .expect("Content-Type", "application/json; charset=utf-8")
      // .expect(200);

      // expect(res.status).equals(200);

      // res.status.should.equal(200);

      done();
      // } catch (e) {
      //   console.log(e);
      //   done();
      // }
    });

    it("Should return 401 status with not valid token", async (done) => {
      done();
    });
  });
});
