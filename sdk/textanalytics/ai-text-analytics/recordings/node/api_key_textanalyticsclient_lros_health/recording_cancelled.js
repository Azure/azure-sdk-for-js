let nock = require('nock');

module.exports.hash = "7e046d5b499701f2a8646549e6b587d0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/98c68cb8-ee6b-4f3d-8871-42fa69370a6a',
  'x-envoy-upstream-service-time',
  '242',
  'apim-request-id',
  'd0e14726-745f-433d-970a-e6feb8edda79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/98c68cb8-ee6b-4f3d-8871-42fa69370a6a')
  .query(true)
  .reply(200, {"jobId":"98c68cb8-ee6b-4f3d-8871-42fa69370a6a","lastUpdateDateTime":"2020-12-30T17:29:23Z","createdDateTime":"2020-12-30T17:29:23Z","expirationDateTime":"2020-12-31T17:29:23Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ff6113ba-5646-460d-b257-05195759246d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/text/analytics/v3.1-preview.3/entities/health/jobs/98c68cb8-ee6b-4f3d-8871-42fa69370a6a')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/98c68cb8-ee6b-4f3d-8871-42fa69370a6a',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '26a2612d-845b-4de9-b66c-a9981114b70c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:23 GMT'
]);
