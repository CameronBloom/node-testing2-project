const request = require("supertest")    // for server calls
const db = require("../data/db-config") // for database calls
const server = require("../server.js")
const Driver = require("./driversModel.js")

const driver1 = {first_name: 'Charles', last_name: 'Leclerc'}
const driver2 = {first_name: 'Fernando', last_name: 'Alonso'}
const driver3 = {first_name: 'Esteban', last_name: 'Ocon'}

// clear out the database every time
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db("drivers").truncate()
})

afterAll(async () => {
  await db.destroy()
})

it("check correct environment variable", () => {
  expect(process.env.DB_ENV).toBe("testing")
})

describe("drivers model function", () => {
  describe("create driver", () => {
    it("adds driver to the db", async () => {
      let drivers
      await Driver.createDriver(driver1)
      drivers = await db("drivers")
      expect(drivers).toHaveLength(1)

      await Driver.createDriver(driver2)
      drivers = await db("drivers")
      expect(drivers).toHaveLength(2)

      await Driver.createDriver(driver3)
      drivers = await db("drivers")
      expect(drivers).toHaveLength(3)
    })
    it("inserted driver id, first name, and last name", async () =>{
      const driver = await Driver.createDriver(driver1)
      expect(driver).toMatchObject({ driver_id: 1, ...driver})
    })
  })
  describe("[DELETE] driver endpoint", () => {
    it("removes driver from the db", async () => {
      const [driver_id] = await db("drivers").insert(driver1)
      let driver = await db("drivers").where({ driver_id }).first()
      expect(driver).toBeTruthy()

      await request(server).delete(`/drivers/${ driver_id }`)
      driver = await db("drivers").where({ driver_id }).first()
      expect(driver).toBeFalsy()
    })
    it("respond with the deleted driver", async() => {
      const [driver_id] = await db("drivers").insert(driver1)
      let driver = await request(server).delete(`/drivers/${ driver_id }`)
      expect(driver.body).toMatchObject(driver1)
    })
  })
})