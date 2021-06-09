const express = require("express")
const GiftExchange = require("../models/gift-exchange")
const router = express.Router()

router.post("/pairs", async (req, res, next) => {
  try {
    const result = await GiftExchange.pairs(req.body.names)
    res.status(200).json({ result })
  } catch (err) {
    next(err)
  }
})

router.post("/traditional", async (req, res, next) => {
  try {
    const result = await GiftExchange.traditional(req.body.names)
    res.status(200).json({ result })
  } catch (err) {
    next(err)
  }
})

module.exports = router
