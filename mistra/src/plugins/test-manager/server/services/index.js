'use strict';

const question = require('./question');
const category = require('./category');
const answer = require('./answer');
const test = require('./test');
const testexecution = require('./test_execution');
const questionintest = require('./question_in_test');
const givenanswer = require('./given_answer');
const sex = require('./sex');

module.exports = {
  question,
  category,
  answer,
  test,
  testexecution,
  questionintest,
  givenanswer,
  sex
};
