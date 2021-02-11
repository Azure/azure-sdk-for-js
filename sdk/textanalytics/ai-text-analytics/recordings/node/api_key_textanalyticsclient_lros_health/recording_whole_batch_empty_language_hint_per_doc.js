let nock = require('nock');

module.exports.hash = "85e088063b7f6f13cb0c473fbcea2448";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/71ed3a2a-76cf-44e6-8795-af1e75404968',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'c3a1dec2-ada6-4618-803c-043fc4088232',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/71ed3a2a-76cf-44e6-8795-af1e75404968')
  .query(true)
  .reply(200, {"jobId":"71ed3a2a-76cf-44e6-8795-af1e75404968","lastUpdateDateTime":"2020-12-30T17:28:46Z","createdDateTime":"2020-12-30T17:28:46Z","expirationDateTime":"2020-12-31T17:28:46Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '9c46b504-28ea-4eef-a6e0-f567218d108d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/71ed3a2a-76cf-44e6-8795-af1e75404968')
  .query(true)
  .reply(200, {"jobId":"71ed3a2a-76cf-44e6-8795-af1e75404968","lastUpdateDateTime":"2020-12-30T17:28:46Z","createdDateTime":"2020-12-30T17:28:46Z","expirationDateTime":"2020-12-31T17:28:46Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f3be8c8b-dfb1-4910-80a4-bf742f06d622',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/71ed3a2a-76cf-44e6-8795-af1e75404968')
  .query(true)
  .reply(200, {"jobId":"71ed3a2a-76cf-44e6-8795-af1e75404968","lastUpdateDateTime":"2020-12-30T17:28:46Z","createdDateTime":"2020-12-30T17:28:46Z","expirationDateTime":"2020-12-31T17:28:46Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '3f2695f1-f419-4591-bc51-ba6d6525d1fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/71ed3a2a-76cf-44e6-8795-af1e75404968')
  .query(true)
  .reply(200, {"jobId":"71ed3a2a-76cf-44e6-8795-af1e75404968","lastUpdateDateTime":"2020-12-30T17:28:46Z","createdDateTime":"2020-12-30T17:28:46Z","expirationDateTime":"2020-12-31T17:28:46Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'b6057c1b-dbe7-4452-9240-d5c78f428708',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/71ed3a2a-76cf-44e6-8795-af1e75404968')
  .query(true)
  .reply(200, {"jobId":"71ed3a2a-76cf-44e6-8795-af1e75404968","lastUpdateDateTime":"2020-12-30T17:28:46Z","createdDateTime":"2020-12-30T17:28:46Z","expirationDateTime":"2020-12-31T17:28:46Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '07fa64b0-272c-4ce1-9f45-be27a62fb299',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/71ed3a2a-76cf-44e6-8795-af1e75404968')
  .query(true)
  .reply(200, {"jobId":"71ed3a2a-76cf-44e6-8795-af1e75404968","lastUpdateDateTime":"2020-12-30T17:28:46Z","createdDateTime":"2020-12-30T17:28:46Z","expirationDateTime":"2020-12-31T17:28:46Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ca4191bf-0818-4c72-ad3f-8a64ae17aa8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/71ed3a2a-76cf-44e6-8795-af1e75404968')
  .query(true)
  .reply(200, {"jobId":"71ed3a2a-76cf-44e6-8795-af1e75404968","lastUpdateDateTime":"2020-12-30T17:28:56Z","createdDateTime":"2020-12-30T17:28:46Z","expirationDateTime":"2020-12-31T17:28:46Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '1810a370-aec2-4dee-ac85-bcfbdca53240',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/71ed3a2a-76cf-44e6-8795-af1e75404968')
  .query(true)
  .reply(200, {"jobId":"71ed3a2a-76cf-44e6-8795-af1e75404968","lastUpdateDateTime":"2020-12-30T17:28:57Z","createdDateTime":"2020-12-30T17:28:46Z","expirationDateTime":"2020-12-31T17:28:46Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '4fa88ebe-c553-4e28-b2ed-b52be82f406b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/71ed3a2a-76cf-44e6-8795-af1e75404968')
  .query(true)
  .reply(200, {"jobId":"71ed3a2a-76cf-44e6-8795-af1e75404968","lastUpdateDateTime":"2020-12-30T17:28:57Z","createdDateTime":"2020-12-30T17:28:46Z","expirationDateTime":"2020-12-31T17:28:46Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '4745d42c-420b-4666-8a81-50fce21769fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:58 GMT'
]);
