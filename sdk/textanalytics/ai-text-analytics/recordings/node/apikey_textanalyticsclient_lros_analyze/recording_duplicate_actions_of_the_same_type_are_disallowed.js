let nock = require('nock');

module.exports.hash = "24c8a2a5a8e45f8e91b3a40ae590296d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(400, {"error":{"code":"InvalidRequest","message":"InvalidTask in AnalyzeInput","innererror":{"code":"InvalidRequestBodyFormat","message":"Duplicate task name  for task type PersonallyIdentifiableInformation. Make sure each task under a task type has a unique name"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'f891be93-93ed-472f-a1ae-c3182e5d1c3e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:06:30 GMT'
]);
