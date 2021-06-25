let nock = require('nock');

module.exports.hash = "80e3645c6a72048b1a663f3d8493846d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"bad","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"bad","stringIndexType":"TextElement_v8"}}]}})
  .reply(400, {"error":{"code":"InvalidRequest","message":"InvalidTask in AnalyzeInput","innererror":{"code":"InvalidRequestBodyFormat","message":"Supplied PersonallyIdentifiableInformation tasks contains duplicates, please remove duplicates and try again."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '4',
  'apim-request-id',
  '718162fc-14ba-4980-b9cc-2d24bcb070e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:34 GMT'
]);
