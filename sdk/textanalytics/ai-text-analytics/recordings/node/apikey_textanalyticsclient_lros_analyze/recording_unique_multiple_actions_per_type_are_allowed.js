let nock = require('nock');

module.exports.hash = "86edab6950b9f06ea6a638ea3c018c6c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"},"taskName":"action1"},{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"},"taskName":"action2"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/e4d1ae35-edc6-48bc-bc17-edcdeb00a289',
  'x-envoy-upstream-service-time',
  '506',
  'apim-request-id',
  '3f21a150-5706-4656-b840-a24b9177201b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 27 Oct 2021 03:31:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/e4d1ae35-edc6-48bc-bc17-edcdeb00a289')
  .query(true)
  .reply(200, {"jobId":"e4d1ae35-edc6-48bc-bc17-edcdeb00a289","lastUpdateDateTime":"2021-10-27T03:31:35Z","createdDateTime":"2021-10-27T03:31:35Z","expirationDateTime":"2021-10-28T03:31:35Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '87d683fd-9d18-4013-9def-1e115b97b8e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 27 Oct 2021 03:31:34 GMT'
]);
