const express = require("express")
const router = express.Router()

const Driver = require("./driversModel.js")

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  const deleted = await Driver.deleteDriver(id)
  res.status(200).json(deleted)
})

module.exports = router