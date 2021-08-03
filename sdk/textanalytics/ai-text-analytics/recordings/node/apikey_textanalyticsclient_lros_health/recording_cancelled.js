let nock = require('nock');

module.exports.hash = "046726cf9dbc05307b6526966952ecfa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/3ce9a1e7-5938-444c-a7a4-a7663ac02eed',
  'x-envoy-upstream-service-time',
  '143',
  'apim-request-id',
  '80077c43-c377-49c6-96d0-2566883a61bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3ce9a1e7-5938-444c-a7a4-a7663ac02eed')
  .query(true)
  .reply(200, {"jobId":"3ce9a1e7-5938-444c-a7a4-a7663ac02eed","lastUpdateDateTime":"2021-08-03T22:43:48Z","createdDateTime":"2021-08-03T22:43:48Z","expirationDateTime":"2021-08-04T22:43:48Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '5b2bbad1-9da8-485f-9c5d-1339214a6197',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:47 GMT'
]);
