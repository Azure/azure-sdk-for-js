let nock = require('nock');

module.exports.hash = "ad87a0e6d3e4602e10fad4d7f20878a3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/keyPhrases', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"1","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"2","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"3","text":"I didn't like the last book I read at all.","language":"en"}]})
  .reply(200, {"documents":[{"id":"0","keyPhrases":["wonderful trip","Space Needle","Seattle"],"warnings":[]},{"id":"1","keyPhrases":["entire trip","Seattle","Space","Needle"],"warnings":[]},{"id":"2","keyPhrases":["movie","Saturday"],"warnings":[]},{"id":"3","keyPhrases":["last book"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=4,CognitiveServices.TextAnalytics.TextRecords=4',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '3eda53d9-cc23-46a3-9507-ee5aaf90b35d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:46:28 GMT'
]);
