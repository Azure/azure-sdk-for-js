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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/4e9eb6a9-c321-4c4c-8e2d-1d6787b2f630',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '1555ffe2-7344-4f1a-8491-348a5660759f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/4e9eb6a9-c321-4c4c-8e2d-1d6787b2f630')
  .query(true)
  .reply(200, {"jobId":"4e9eb6a9-c321-4c4c-8e2d-1d6787b2f630","lastUpdateDateTime":"2021-04-28T20:14:55Z","createdDateTime":"2021-04-28T20:14:55Z","expirationDateTime":"2021-04-29T20:14:55Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e2838bd5-29b2-47cd-8802-25a6124ed536',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/text/analytics/v3.1-preview.4/entities/health/jobs/4e9eb6a9-c321-4c4c-8e2d-1d6787b2f630')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/4e9eb6a9-c321-4c4c-8e2d-1d6787b2f630',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'aeba7042-6f7b-44bf-804b-aed34b13181b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:55 GMT'
]);
