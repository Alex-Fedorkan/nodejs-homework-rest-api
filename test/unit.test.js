const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { HttpCode } = require("./constants");
const Users = require("../model/users");
const guard = require("../helpers/guard");

describe("Unit test middleware guard.js", () => {
  it("Run middleware with valid token", () => {});

  it("Run middleware with invalid token", () => {});

  it("Run middleware without token", () => {});
});
