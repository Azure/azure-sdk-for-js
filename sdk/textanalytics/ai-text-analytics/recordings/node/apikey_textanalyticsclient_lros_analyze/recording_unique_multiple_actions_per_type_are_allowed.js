let nock = require('nock');

module.exports.hash = "86edab6950b9f06ea6a638ea3c018c6c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"},"taskName":"action1"},{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"},"taskName":"action2"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/14bbe87d-1434-42ef-8d10-413a4254da04',
  'x-envoy-upstream-service-time',
  '285',
  'apim-request-id',
  'c6df8ecf-9880-470e-943b-746838aaef22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 27 Oct 2021 23:28:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/14bbe87d-1434-42ef-8d10-413a4254da04')
  .query(true)
  .reply(200, {"jobId":"14bbe87d-1434-42ef-8d10-413a4254da04","lastUpdateDateTime":"2021-10-27T23:28:00Z","createdDateTime":"2021-10-27T23:28:00Z","expirationDateTime":"2021-10-28T23:28:00Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '57635805-ec22-4c9f-af50-aa95175f7238',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 27 Oct 2021 23:28:00 GMT'
]);
