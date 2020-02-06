let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.0-preview.1/sentiment', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"1","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"2","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"3","text":"I didn't like the last book I read at all.","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","sentiment":"positive","documentScores":{"positive":0.99,"neutral":0.01,"negative":0},"sentences":[{"sentiment":"positive","sentenceScores":{"positive":0.99,"neutral":0.01,"negative":0},"offset":0,"length":86}]},{"id":"1","sentiment":"negative","documentScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","sentenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":58},{"sentiment":"neutral","sentenceScores":{"positive":0.01,"neutral":0.7,"negative":0.29},"offset":59,"length":43}]},{"id":"2","sentiment":"positive","documentScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","sentenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":101}]},{"id":"3","sentiment":"negative","documentScores":{"positive":0.01,"neutral":0.03,"negative":0.96},"sentences":[{"sentiment":"negative","sentenceScores":{"positive":0.01,"neutral":0.03,"negative":0.96},"offset":0,"length":42}]}],"errors":[],"modelVersion":"2019-10-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=4',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'c5219dd5-0f6d-43de-8f5d-0e60f17bac77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Feb 2020 23:15:19 GMT'
]);
