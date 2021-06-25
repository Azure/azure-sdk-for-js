let nock = require('nock');

module.exports.hash = "204756a0ef7bb31d61c833d32a9152fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"displayName":"testJob","analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/47945dcd-072f-4643-984d-9b8149348687',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  'db7b6130-090c-4ab6-8c54-0fa129525009',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/47945dcd-072f-4643-984d-9b8149348687')
  .query(true)
  .reply(200, {"jobId":"47945dcd-072f-4643-984d-9b8149348687","lastUpdateDateTime":"2021-06-25T05:09:14Z","createdDateTime":"2021-06-25T05:09:14Z","expirationDateTime":"2021-06-26T05:09:14Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '003b4c2a-6988-4f36-859f-31486d8a6d17',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/47945dcd-072f-4643-984d-9b8149348687')
  .query(true)
  .reply(200, {"jobId":"47945dcd-072f-4643-984d-9b8149348687","lastUpdateDateTime":"2021-06-25T05:09:14Z","createdDateTime":"2021-06-25T05:09:14Z","expirationDateTime":"2021-06-26T05:09:14Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '99540dfe-c2df-426e-8084-7eff82ed1509',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/47945dcd-072f-4643-984d-9b8149348687')
  .query(true)
  .reply(200, {"jobId":"47945dcd-072f-4643-984d-9b8149348687","lastUpdateDateTime":"2021-06-25T05:09:14Z","createdDateTime":"2021-06-25T05:09:14Z","expirationDateTime":"2021-06-26T05:09:14Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '1a170a84-8a57-4868-8417-e4e43e9dc9e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/47945dcd-072f-4643-984d-9b8149348687')
  .query(true)
  .reply(200, {"jobId":"47945dcd-072f-4643-984d-9b8149348687","lastUpdateDateTime":"2021-06-25T05:09:14Z","createdDateTime":"2021-06-25T05:09:14Z","expirationDateTime":"2021-06-26T05:09:14Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '563e8312-e1f0-47bd-a487-47ffc93581f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/47945dcd-072f-4643-984d-9b8149348687')
  .query(true)
  .reply(200, {"jobId":"47945dcd-072f-4643-984d-9b8149348687","lastUpdateDateTime":"2021-06-25T05:09:20Z","createdDateTime":"2021-06-25T05:09:14Z","expirationDateTime":"2021-06-26T05:09:14Z","status":"succeeded","errors":[],"displayName":"testJob","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T05:09:20.5744466Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '08f43f0c-f90a-48b6-9806-82694dfbb071',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:20 GMT'
]);
