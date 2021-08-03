let nock = require('nock');

module.exports.hash = "fdbacce056d3180da0a43c0748bb1396";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"bad","stringIndexType":"TextElement_v8"}}]}})
  .reply(400, {"error":{"code":"InvalidRequest","message":"Invalid parameter in request","innererror":{"code":"InvalidParameterValue","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '500',
  'apim-request-id',
  '64828a2b-e275-4849-bb71-805d0e804ed9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 19:34:36 GMT'
]);
