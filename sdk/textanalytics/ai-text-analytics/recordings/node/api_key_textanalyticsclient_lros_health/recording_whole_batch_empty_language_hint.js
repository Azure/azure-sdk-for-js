let nock = require('nock');

module.exports.hash = "53b8cbb2f8b9222a4857fd83eee00a3a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/009ec67d-9d28-4cd8-8d36-e2bc6ad786de',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  'a14fc4e7-4086-48f4-ad84-40c57b2416cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/009ec67d-9d28-4cd8-8d36-e2bc6ad786de')
  .query(true)
  .reply(200, {"jobId":"009ec67d-9d28-4cd8-8d36-e2bc6ad786de","lastUpdateDateTime":"2021-05-12T19:05:16Z","createdDateTime":"2021-05-12T19:05:16Z","expirationDateTime":"2021-05-13T19:05:16Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'b8a359b5-18cf-4588-a676-5e3483169ee1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/009ec67d-9d28-4cd8-8d36-e2bc6ad786de')
  .query(true)
  .reply(200, {"jobId":"009ec67d-9d28-4cd8-8d36-e2bc6ad786de","lastUpdateDateTime":"2021-05-12T19:05:16Z","createdDateTime":"2021-05-12T19:05:16Z","expirationDateTime":"2021-05-13T19:05:16Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '1520d093-abb4-49f7-8850-2d00358e1131',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/009ec67d-9d28-4cd8-8d36-e2bc6ad786de')
  .query(true)
  .reply(200, {"jobId":"009ec67d-9d28-4cd8-8d36-e2bc6ad786de","lastUpdateDateTime":"2021-05-12T19:05:17Z","createdDateTime":"2021-05-12T19:05:16Z","expirationDateTime":"2021-05-13T19:05:16Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  'bf3beba1-4a39-46a4-b5b3-e3cf871e34ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/009ec67d-9d28-4cd8-8d36-e2bc6ad786de')
  .query(true)
  .reply(200, {"jobId":"009ec67d-9d28-4cd8-8d36-e2bc6ad786de","lastUpdateDateTime":"2021-05-12T19:05:17Z","createdDateTime":"2021-05-12T19:05:16Z","expirationDateTime":"2021-05-13T19:05:16Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '6a8e148f-9c3a-4b0e-994d-0bfde634010a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:17 GMT'
]);
