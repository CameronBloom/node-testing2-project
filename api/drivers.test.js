const request = require("supertest")    // for server calls
const db = require("../data/db-config") // for database calls
const server = require("../server.js")

it("check correct environment variable", () => {
  expect(process.env.DB_ENV).toBe("testing")
})