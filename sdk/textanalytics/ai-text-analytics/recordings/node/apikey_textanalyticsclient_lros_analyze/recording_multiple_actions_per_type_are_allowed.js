let nock = require('nock');

module.exports.hash = "6ff577dd9fdb3d9869fb300f0ecc6d42";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"latest","stringIndexType":"TextElement_v8"}}]}})
  .reply(400, {"error":{"code":"InvalidRequest","message":"InvalidTask in AnalyzeInput","innererror":{"code":"InvalidRequestBodyFormat","message":"Duplicate task name  for task type PersonallyIdentifiableInformation. Make sure each task under a task type has a unique name"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'fda147dc-0498-4108-bec0-4cdc08a83644',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 27 Oct 2021 02:48:59 GMT'
]);
