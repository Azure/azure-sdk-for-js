let nock = require('nock');

module.exports.hash = "01b84290224b19eda44a99f1f5f8866e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/sentiment', {"documents":[{"id":"0","text":"The food and service is not good","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":32,"text":"The food and service is not good","targets":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":4,"text":"food","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":13,"length":7,"text":"service","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":28,"length":4,"text":"good","isNegated":true}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1,CognitiveServices.TextAnalytics.TextRecords=1',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '10bcca66-8a85-4dfb-b292-d2e79eaa88b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:36:39 GMT'
]);
