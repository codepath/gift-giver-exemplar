const express = require("express")
const morgan = require("morgan")
const giftExchangeRouter = require("./routes/gift-exchange")
const quizRouter = require("./routes/quiz")
const { NotFoundError } = require("./utils/errors")

const app = express()

app.use(morgan("tiny"))
app.use(express.json())
app.use("/gift-exchange", giftExchangeRouter)
app.use("/quiz", quizRouter)

/* Handle all 404 errors that weren't matched by a route */
app.use((req, res, next) => {
  return next(new NotFoundError())
})

/* Generic error handler - anything that is unhandled will be handled here */
app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message

  return res.status(status).json({
    error: { message, status },
  })
})

const port = 3000

app.listen(port, () => {
  console.log(`🚀 Server listening on port ` + port)
})
