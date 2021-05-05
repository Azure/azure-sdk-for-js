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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/86704f65-d06c-41fa-9874-4319ac37e02a',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  'fe9528b3-503c-41ca-a105-dfbc2a222719',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/86704f65-d06c-41fa-9874-4319ac37e02a')
  .query(true)
  .reply(200, {"jobId":"86704f65-d06c-41fa-9874-4319ac37e02a","lastUpdateDateTime":"2021-04-28T21:05:32Z","createdDateTime":"2021-04-28T21:05:32Z","expirationDateTime":"2021-04-29T21:05:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f77c3936-cdc7-4300-8bed-0f4cdc4dd878',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/text/analytics/v3.1-preview.4/entities/health/jobs/86704f65-d06c-41fa-9874-4319ac37e02a')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/86704f65-d06c-41fa-9874-4319ac37e02a',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'e5ffc706-451f-4f85-8d8e-d39bd3d48f46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:32 GMT'
]);
