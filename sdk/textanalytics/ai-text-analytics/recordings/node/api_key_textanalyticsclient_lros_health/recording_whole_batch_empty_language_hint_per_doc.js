let nock = require('nock');

module.exports.hash = "b3ad7c6bd1c67bae64359f501d8d1c4d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/80eed55d-5d7b-44de-abed-9700455d81d8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '5082d353-ef84-4377-a7a3-6ae00942c9ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/80eed55d-5d7b-44de-abed-9700455d81d8')
  .query(true)
  .reply(200, {"jobId":"80eed55d-5d7b-44de-abed-9700455d81d8","lastUpdateDateTime":"2021-04-28T21:05:17Z","createdDateTime":"2021-04-28T21:05:17Z","expirationDateTime":"2021-04-29T21:05:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '62f88aeb-e3ca-4587-8716-74e195b6edf1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/80eed55d-5d7b-44de-abed-9700455d81d8')
  .query(true)
  .reply(200, {"jobId":"80eed55d-5d7b-44de-abed-9700455d81d8","lastUpdateDateTime":"2021-04-28T21:05:17Z","createdDateTime":"2021-04-28T21:05:17Z","expirationDateTime":"2021-04-29T21:05:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b8e33da6-9c31-4a15-985a-152781283fb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/80eed55d-5d7b-44de-abed-9700455d81d8')
  .query(true)
  .reply(200, {"jobId":"80eed55d-5d7b-44de-abed-9700455d81d8","lastUpdateDateTime":"2021-04-28T21:05:19Z","createdDateTime":"2021-04-28T21:05:17Z","expirationDateTime":"2021-04-29T21:05:17Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '394739dc-3830-4f39-9617-89ee4bbe4228',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/80eed55d-5d7b-44de-abed-9700455d81d8')
  .query(true)
  .reply(200, {"jobId":"80eed55d-5d7b-44de-abed-9700455d81d8","lastUpdateDateTime":"2021-04-28T21:05:19Z","createdDateTime":"2021-04-28T21:05:17Z","expirationDateTime":"2021-04-29T21:05:17Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '2631f2ac-7f5c-4fe2-b9e3-bfe151741503',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:20 GMT'
]);
