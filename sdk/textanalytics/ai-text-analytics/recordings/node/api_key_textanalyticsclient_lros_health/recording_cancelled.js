let nock = require('nock');

module.exports.hash = "92e8aef16b4d5c34323ddac582aca6d4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/0979c78b-5c35-4030-a248-6b7f3ed9d9b2',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '8f9618e2-fc64-4def-b374-ca2eb57c8ed7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/0979c78b-5c35-4030-a248-6b7f3ed9d9b2')
  .query(true)
  .reply(200, {"jobId":"0979c78b-5c35-4030-a248-6b7f3ed9d9b2","lastUpdateDateTime":"2021-02-23T19:35:44Z","createdDateTime":"2021-02-23T19:35:44Z","expirationDateTime":"2021-02-24T19:35:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '27c03c59-78c2-4534-9f6e-41f808a60009',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/text/analytics/v3.1-preview.4/entities/health/jobs/0979c78b-5c35-4030-a248-6b7f3ed9d9b2')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/0979c78b-5c35-4030-a248-6b7f3ed9d9b2',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '60c2f34b-6f4d-49dd-b19c-bd22137876f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:44 GMT'
]);
