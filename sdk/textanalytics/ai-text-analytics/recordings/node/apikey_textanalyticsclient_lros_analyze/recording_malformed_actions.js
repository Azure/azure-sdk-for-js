let nock = require('nock');

module.exports.hash = "fdbacce056d3180da0a43c0748bb1396";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"bad","stringIndexType":"TextElement_v8"}}]}})
  .reply(400, {"error":{"code":"InvalidRequest","message":"Invalid parameter in request","innererror":{"code":"InvalidParameterValue","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4ea3bcc5-ffd4-4172-9f61-f054c00a5ee1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:42:01 GMT'
]);
