let nock = require('nock');

module.exports.hash = "53b8cbb2f8b9222a4857fd83eee00a3a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/786b58d9-7c38-4187-a6f7-509622639a15',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '82a82163-32da-4900-891f-b3e33df2a165',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/786b58d9-7c38-4187-a6f7-509622639a15')
  .query(true)
  .reply(200, {"jobId":"786b58d9-7c38-4187-a6f7-509622639a15","lastUpdateDateTime":"2021-04-28T21:05:15Z","createdDateTime":"2021-04-28T21:05:15Z","expirationDateTime":"2021-04-29T21:05:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'e6c67483-cda8-4db2-9796-91f211cee1da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/786b58d9-7c38-4187-a6f7-509622639a15')
  .query(true)
  .reply(200, {"jobId":"786b58d9-7c38-4187-a6f7-509622639a15","lastUpdateDateTime":"2021-04-28T21:05:15Z","createdDateTime":"2021-04-28T21:05:15Z","expirationDateTime":"2021-04-29T21:05:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '149a0e90-732c-4e50-b546-3b4da2734081',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/786b58d9-7c38-4187-a6f7-509622639a15')
  .query(true)
  .reply(200, {"jobId":"786b58d9-7c38-4187-a6f7-509622639a15","lastUpdateDateTime":"2021-04-28T21:05:15Z","createdDateTime":"2021-04-28T21:05:15Z","expirationDateTime":"2021-04-29T21:05:15Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '642ec132-bccb-4dca-b647-f7d32276eb22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/786b58d9-7c38-4187-a6f7-509622639a15')
  .query(true)
  .reply(200, {"jobId":"786b58d9-7c38-4187-a6f7-509622639a15","lastUpdateDateTime":"2021-04-28T21:05:15Z","createdDateTime":"2021-04-28T21:05:15Z","expirationDateTime":"2021-04-29T21:05:15Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  '026292d7-c6da-4012-bb31-bd470fe9a031',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:17 GMT'
]);
