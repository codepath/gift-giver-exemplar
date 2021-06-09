const { BadRequestError } = require("../utils/errors")

const currentQuiz = [
  {
    question: "question #1",
    answerChoices: [
      "a. first answer choice",
      "b. second answer choice",
      "c. third answer choice",
      "d. fourth answer choice",
    ],
  },
  {
    question: "question #2",
    answerChoices: [
      "a. first answer choice",
      "b. second answer choice",
      "c. third answer choice",
      "d. fourth answer choice",
    ],
  },
  {
    question: "question #3",
    answerChoices: [
      "a. first answer choice",
      "b. second answer choice",
      "c. third answer choice",
      "d. fourth answer choice",
    ],
  },
  {
    question: "question #4",
    answerChoices: [
      "a. first answer choice",
      "b. second answer choice",
      "c. third answer choice",
      "d. fourth answer choice",
    ],
  },
  {
    question: "question #5",
    answerChoices: [
      "a. first answer choice",
      "b. second answer choice",
      "c. third answer choice",
      "d. fourth answer choice",
    ],
  },
]

const quizScores = [
  {
    a: 2,
    b: 5,
    c: 1,
    d: 0,
  },
  {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  },
  {
    a: 5,
    b: 4,
    c: 3,
    d: 2,
  },
  {
    a: 1,
    b: 3,
    c: 2,
    d: 0,
  },
  {
    a: 4,
    b: 5,
    c: 1,
    d: 0,
  },
]

class GiftExchange {
  static async quiz() {
    return currentQuiz
  }

  static async quizResults(answerChoices) {
    let total = 0

    answerChoices.forEach((answer, i) => {
      const scoreLookup = quizScores[i]

      if (!scoreLookup[answer] && scoreLookup[answer] !== 0) {
        throw new BadRequestError("You listed an answer choice that was not available. Please try again.")
      }

      total += scoreLookup[answer]
    })

    if (total < 4) return "personal care"
    if (total >= 4 && total < 8) return "clothing"
    if (total >= 8 && total < 12) return "accessories"
    if (total >= 12 && total < 16) return "home products"
    if (total >= 16 && total < 20) return "consumables"
    if (total >= 20) return "technology"
  }

  static async pairs(names) {
    // throw an error if an odd number of users are provided
    if (names.length % 2 === 1) throw new BadRequestError("Must provide an even number of users for pairs matching.")

    const namedPairs = []

    while (names.length) {
      const currentPair = []

      while (currentPair.length < 2 && names.length > 0) {
        const selectedNameIndex = Math.floor(Math.random() * names.length)
        const selectedName = names[selectedNameIndex]
        names.splice(selectedNameIndex, 1)
        currentPair.push(selectedName)
      }

      namedPairs.push(currentPair)
    }

    return namedPairs
  }

  static async traditional(names) {
    // shuffle the names array
    let currentIdx = names.length

    while (currentIdx > 0) {
      // pick an element
      const randomIdx = Math.floor(Math.random() * currentIdx)

      // swap it with current name
      const temp = names[currentIdx]
      names[currentIdx] = names[randomIdx]
      names[randomIdx] = temp

      currentIdx -= 1
    }

    // create ordered pairings
    const pairings = []

    for (let i = 0; i < names.length; i++) {
      const giver = names[i]
      const receiver = i === names.length - 1 ? names[0] : names[i + 1]

      pairings.push(`${giver} is giving a gift to ${receiver}`)
    }

    return pairings
  }
}

module.exports = GiftExchange
