let nock = require('nock');

module.exports.hash = "734b436c2a291e8271b3b7d3813b67f7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/sentiment', {"documents":[{"id":"0","text":"It has a sleek premium aluminum design that makes it beautiful to look at.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","sentiment":"positive","confidenceScores":{"positive":0.98,"neutral":0.02,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":0.98,"neutral":0.02,"negative":0},"offset":0,"length":74,"text":"It has a sleek premium aluminum design that makes it beautiful to look at.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":32,"length":6,"text":"design","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":9,"length":5,"text":"sleek","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":15,"length":7,"text":"premium","isNegated":false}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  '9f05dc3b-e933-4751-b1a5-8b5c8576cdde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:36:37 GMT'
]);
