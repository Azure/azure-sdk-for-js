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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/9863f642-cd6d-4aca-9d01-1349835f859d',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '282e1bf8-ea63-436f-bf04-ca10e164aaa0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/9863f642-cd6d-4aca-9d01-1349835f859d')
  .query(true)
  .reply(200, {"jobId":"9863f642-cd6d-4aca-9d01-1349835f859d","lastUpdateDateTime":"2021-03-04T20:19:00Z","createdDateTime":"2021-03-04T20:18:59Z","expirationDateTime":"2021-03-05T20:18:59Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '52b58677-8295-41b5-bb36-ae9b5f608def',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/text/analytics/v3.1-preview.4/entities/health/jobs/9863f642-cd6d-4aca-9d01-1349835f859d')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/9863f642-cd6d-4aca-9d01-1349835f859d',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '407c9801-f137-4053-b12b-74894eaa0671',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:59 GMT'
]);
