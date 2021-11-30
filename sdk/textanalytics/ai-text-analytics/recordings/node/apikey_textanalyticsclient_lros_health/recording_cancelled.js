let nock = require('nock');

module.exports.hash = "046726cf9dbc05307b6526966952ecfa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/9bb2aa4b-5abd-4364-925f-3dff9988eedc',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '9923a5de-0f3d-494a-bb27-7ca6bd0a16aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/9bb2aa4b-5abd-4364-925f-3dff9988eedc')
  .query(true)
  .reply(200, {"jobId":"9bb2aa4b-5abd-4364-925f-3dff9988eedc","lastUpdateDateTime":"2021-10-23T00:43:03Z","createdDateTime":"2021-10-23T00:43:02Z","expirationDateTime":"2021-10-24T00:43:02Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'eff0bf47-3f71-463d-98e0-e8e12914f291',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:02 GMT'
]);
