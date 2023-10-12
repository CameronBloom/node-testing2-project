const db = require("../data/db-config") // for database calls

async function createDriver(driver) {
  const [id] = await db("drivers").insert(driver)       // get id from newly created record
  return db("drivers").where("driver_id", id).first()   // find the newly created record
}

async function deleteDriver(id) {
  const driver = await db("drivers").where("driver_id", id).first()
  await db("drivers").where("driver_id", id).del()
  return driver
}

module.exports = {
  createDriver,
  deleteDriver,
}