let nock = require('nock');

module.exports.hash = "92e8aef16b4d5c34323ddac582aca6d4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/429236f3-cb2f-4b11-8bb2-d94b54d606c0',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  '8bdd4e4b-8a43-4292-a3c5-ae4177237015',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/429236f3-cb2f-4b11-8bb2-d94b54d606c0')
  .query(true)
  .reply(200, {"jobId":"429236f3-cb2f-4b11-8bb2-d94b54d606c0","lastUpdateDateTime":"2021-05-12T19:05:48Z","createdDateTime":"2021-05-12T19:05:48Z","expirationDateTime":"2021-05-13T19:05:48Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '0ca21768-d727-4cbd-8ec9-b16090a9a6dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('//text/analytics/v3.1-preview.5/entities/health/jobs/429236f3-cb2f-4b11-8bb2-d94b54d606c0')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/429236f3-cb2f-4b11-8bb2-d94b54d606c0',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  'bcd0518b-84dd-4b6c-81b6-f3bef781e292',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:47 GMT'
]);
