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
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/adb0a31c-50d3-44cc-bcf5-e8ea0dc0b859',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '6b32449f-0146-44bb-ba5b-61d9e43726d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/adb0a31c-50d3-44cc-bcf5-e8ea0dc0b859')
  .query(true)
  .reply(200, {"jobId":"adb0a31c-50d3-44cc-bcf5-e8ea0dc0b859","lastUpdateDateTime":"2020-12-22T20:08:34Z","createdDateTime":"2020-12-22T20:08:34Z","expirationDateTime":"2020-12-23T20:08:34Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f68d504e-a08d-4baa-8ae3-ed20656e3349',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/text/analytics/v3.1-preview.3/entities/health/jobs/adb0a31c-50d3-44cc-bcf5-e8ea0dc0b859')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/adb0a31c-50d3-44cc-bcf5-e8ea0dc0b859',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'cc7cb521-96f4-4aa4-b886-6d9dd6a285a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:34 GMT'
]);
