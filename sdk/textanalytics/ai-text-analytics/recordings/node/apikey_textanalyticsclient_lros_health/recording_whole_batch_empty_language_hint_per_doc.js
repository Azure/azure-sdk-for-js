let nock = require('nock');

module.exports.hash = "7b424c93f75bfddb132b20861a2983df";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/2e3f077a-f4d5-404c-b41e-2dee558e0dbe',
  'x-envoy-upstream-service-time',
  '321',
  'apim-request-id',
  '29a40b6f-b004-44fd-8d7f-0f522649bff8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2e3f077a-f4d5-404c-b41e-2dee558e0dbe')
  .query(true)
  .reply(200, {"jobId":"2e3f077a-f4d5-404c-b41e-2dee558e0dbe","lastUpdateDateTime":"2021-10-23T00:42:49Z","createdDateTime":"2021-10-23T00:42:48Z","expirationDateTime":"2021-10-24T00:42:48Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '3f77e648-9f0a-48e4-8409-5df7f4d22e9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2e3f077a-f4d5-404c-b41e-2dee558e0dbe')
  .query(true)
  .reply(200, {"jobId":"2e3f077a-f4d5-404c-b41e-2dee558e0dbe","lastUpdateDateTime":"2021-10-23T00:42:49Z","createdDateTime":"2021-10-23T00:42:48Z","expirationDateTime":"2021-10-24T00:42:48Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '36cb4d48-178d-49a0-92da-cbacd90ab622',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2e3f077a-f4d5-404c-b41e-2dee558e0dbe')
  .query(true)
  .reply(200, {"jobId":"2e3f077a-f4d5-404c-b41e-2dee558e0dbe","lastUpdateDateTime":"2021-10-23T00:42:50Z","createdDateTime":"2021-10-23T00:42:48Z","expirationDateTime":"2021-10-24T00:42:48Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '321f2ff7-d0f9-400f-8d93-eca2e41e2aa2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2e3f077a-f4d5-404c-b41e-2dee558e0dbe')
  .query(true)
  .reply(200, {"jobId":"2e3f077a-f4d5-404c-b41e-2dee558e0dbe","lastUpdateDateTime":"2021-10-23T00:42:50Z","createdDateTime":"2021-10-23T00:42:48Z","expirationDateTime":"2021-10-24T00:42:48Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '8e01a937-0ed3-4195-9771-f4d43da2c1b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:50 GMT'
]);
