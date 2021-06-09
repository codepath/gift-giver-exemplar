# Gift Giver Lab

A client has asked you to create an app that operates as a competitor to https://www.elfster.com. They're a company valued at $6 million that creates gift exchanges for families and friends.

Your client thinks they have a few killer features that could improve on elfster's design and allow them to compete in the market. But first, they need a backend product to work with. They'd like you to build the prototype using Node and Express.

Here are the goals:

## Models
+ There should be a model called `GiftExchange` that implements all of the business logic for the application.
+ The `GiftExchange` model should have four static methods:
  + pairs
  + traditional
  + quiz
  + quizResults

## Routes

### /gift-exchange
+ There should be a single router nested under the `/gift-exchange` endpoint. That router should have two `POST` request endpoints. 
+ Both endpoints should accept a JSON body in the `POST` request that contains a key for `names`. That key should store an array of users who will be entered in the gift exchange. If no `names` array is found in the `POST` body, the method should throw a `BadRequestError`.

Example:

```js
// POST request body
{
  "names": ["me", "you", "them", "us", "her", "him", "they", "y'all"]
}
```

+ The first route should use the `/pairs` endpoint. This will pass the list of users to a `GiftExchange` method that implements an algorithm responsible for randomly pairing users together. Make sure this method returns an array of arrays. Each nested array should contain a pair of randomly matched users. If the number of users is odd, the endpoint should throw a `BadRequestError`.

Example:

```js
{
  "names": ["me", "you", "them", "us", "her", "him", "they", "y'all"]
}
// ==> GiftExchange.pairs returns
{
  "result": [
  ["they", "us"],
  ["me", "her"],
  ["y'all", "you"],
  ["them", "him"]    
  ]
}
```

Hint: The `Math.random` and `Math.floor` functions in JavaScript should be useful here.

Example:

```js
const names = ["me", "you", "them", "us", "her", "him", "they", "y'all", "all y'all", "somebody else"]
const randomNum = Math.random() // returns a number between 0 and 1
console.log(randomNum) // 0.26819529471
randomNum * names.length // 2.6819529471
Math.floor(randomNum * names.length) // 2
const randomName = names[Math.floor(randomNum * names.length)] // "them"
```

+ The second route should use the `/traditional` endpoint. This will pass the last of users to a `GiftExchange` method that implements an algorithm to match each user to another user in the list in sequential order. The method should return an array of strings indicating who is giving a gift to who. The recipient of each gift should be the next gift giver and the last person to recieve a gift should give a gift to the first person.

Example:

```js
{
  "names": ["me", "you", "them", "us", "her", "him", "they", "y'all"]
}
// GiftExchange.traditional ==> returns
{
  "result": [
    "they is giving a gift to us",
    "us is giving a gift to me",
    "me is giving a gift to her",
    "her is giving a gift to y'all",
    "y'all is giving a gift to you",
    "you is giving a gift to them",
    "them is giving a gift to him",
    "him is giving a gift to they",
  ]
}
```

### /quiz - stretch goals

The client thinks that they have a killer feature that would help them beat elfster in the gift exchange market. They want to provide a BuzzFeed-style quiz that helps the user decide what kind of gift to give. To do that, they'll need you to create two new endpoints

There should be a `GET` and a `POST` request for the `/quiz ` endpoint. 

+ The `GET` request should call the `GiftGiver.quiz` method and return an array of `5` objects. Each object should have a key for `question` and a key for `answerChoices`. The `question` key should store a string that asks the user a question about their gift recipient. The `answerChoices`  key should store an array of answer choices - `a`, `b`, `c`, and `d`.

Example:

```js
// GiftGiver.quiz ==> returns
[
  {
    question: "question #1",
    answerChoices: [
      "a. first answer choice",
      "b. second answer choice",
      "c. third answer choice",
      "d. fourth answer choice",
    ]
  },
  {
    question: "question #2",
    answerChoices: [
      "a. first answer choice",
      "b. second answer choice",
      "c. third answer choice",
      "d. fourth answer choice",
    ]
  },
  // ... three more questions
]
```


+ The `POST` request should accept a JSON body containing an array of answers - one for each question in the order they were listed. It should pass those user answers to the `GiftGiver.quizResults` method. The `quizResults` method should assign a points value to each answer choice and then add up all of the points for the user's quiz. That points total should be used to determine what category their gift should be in: "personal care", "clothing", "accessories", "home products", "consumables", or "technology". If any of the answers aren't one of the answer choices, the route should throw a 400 - bad request error.

Example

```js
// POST request json body
{
  userAnswers: ["b", "d", "a", "a", "c"]
}
// GiftGiver.quizResults(userAnswers) ==> returns
"technology"
```


## Resources
+ [Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
+ [Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
  