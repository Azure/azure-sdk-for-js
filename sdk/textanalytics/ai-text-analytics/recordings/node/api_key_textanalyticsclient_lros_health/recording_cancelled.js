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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/0d2da4de-6d71-41c7-8101-6d5a2b1547fa',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '3480c443-3f38-4e6c-aa1c-743d91d24875',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/0d2da4de-6d71-41c7-8101-6d5a2b1547fa')
  .query(true)
  .reply(200, {"jobId":"0d2da4de-6d71-41c7-8101-6d5a2b1547fa","lastUpdateDateTime":"2021-02-23T02:43:03Z","createdDateTime":"2021-02-23T02:43:03Z","expirationDateTime":"2021-02-24T02:43:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '391fa272-c7f7-4c27-8cec-6809d95ba385',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/text/analytics/v3.1-preview.4/entities/health/jobs/0d2da4de-6d71-41c7-8101-6d5a2b1547fa')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/0d2da4de-6d71-41c7-8101-6d5a2b1547fa',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'ab59b633-3a9b-4f65-a046-9b6320fa1961',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:02 GMT'
]);
