let nock = require('nock');

module.exports.hash = "28b46fe46c0398ac35b3cb4483489f27";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"","language":"en"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(400, {"error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocumentBatch","message":"Document text is empty."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '83c8c48b-b684-4114-a1f0-de2fe99a4759',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:50:07 GMT'
]);
