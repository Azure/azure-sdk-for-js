let nock = require('nock');

module.exports.hash = "046726cf9dbc05307b6526966952ecfa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/dde76bc4-fa16-4177-aa15-27e8f2ce4af3',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '690dde51-d8f5-4f40-9562-f5e0ca79e7a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:50 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/dde76bc4-fa16-4177-aa15-27e8f2ce4af3')
  .query(true)
  .reply(200, {"jobId":"dde76bc4-fa16-4177-aa15-27e8f2ce4af3","lastUpdateDateTime":"2021-08-03T03:16:51Z","createdDateTime":"2021-08-03T03:16:50Z","expirationDateTime":"2021-08-04T03:16:50Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'dd9a6960-e3d8-409d-b95d-55638ab09d9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:50 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .delete('/text/analytics/v3.2-preview.1/entities/health/jobs/dde76bc4-fa16-4177-aa15-27e8f2ce4af3')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/dde76bc4-fa16-4177-aa15-27e8f2ce4af3',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  'cbd25dc0-f7e6-4ddd-9d79-51365aff5313',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:50 GMT'
]);
