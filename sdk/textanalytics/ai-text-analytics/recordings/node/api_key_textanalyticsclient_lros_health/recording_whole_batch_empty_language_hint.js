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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/5d9f2ab7-4de4-42fc-aeb9-bc22e0cdfec1',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  '25acdd4d-3b11-46a6-bfcd-2cc613daf56c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5d9f2ab7-4de4-42fc-aeb9-bc22e0cdfec1')
  .query(true)
  .reply(200, {"jobId":"5d9f2ab7-4de4-42fc-aeb9-bc22e0cdfec1","lastUpdateDateTime":"2021-02-23T19:35:17Z","createdDateTime":"2021-02-23T19:35:17Z","expirationDateTime":"2021-02-24T19:35:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '446082e1-1a51-4c3d-90c0-88b8f6514f4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5d9f2ab7-4de4-42fc-aeb9-bc22e0cdfec1')
  .query(true)
  .reply(200, {"jobId":"5d9f2ab7-4de4-42fc-aeb9-bc22e0cdfec1","lastUpdateDateTime":"2021-02-23T19:35:17Z","createdDateTime":"2021-02-23T19:35:17Z","expirationDateTime":"2021-02-24T19:35:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'ce9fd336-812e-4d1c-afec-3d9e8c0d096a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5d9f2ab7-4de4-42fc-aeb9-bc22e0cdfec1')
  .query(true)
  .reply(200, {"jobId":"5d9f2ab7-4de4-42fc-aeb9-bc22e0cdfec1","lastUpdateDateTime":"2021-02-23T19:35:17Z","createdDateTime":"2021-02-23T19:35:17Z","expirationDateTime":"2021-02-24T19:35:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '1bb622c5-86f1-45bc-9873-4f19abaaf855',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5d9f2ab7-4de4-42fc-aeb9-bc22e0cdfec1')
  .query(true)
  .reply(200, {"jobId":"5d9f2ab7-4de4-42fc-aeb9-bc22e0cdfec1","lastUpdateDateTime":"2021-02-23T19:35:21Z","createdDateTime":"2021-02-23T19:35:17Z","expirationDateTime":"2021-02-24T19:35:17Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":18,"length":14,"text":"day of my life","category":"Age","confidenceScore":0.82}],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  '456b1530-fe6c-4c43-a48b-6ed8d7960548',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5d9f2ab7-4de4-42fc-aeb9-bc22e0cdfec1')
  .query(true)
  .reply(200, {"jobId":"5d9f2ab7-4de4-42fc-aeb9-bc22e0cdfec1","lastUpdateDateTime":"2021-02-23T19:35:21Z","createdDateTime":"2021-02-23T19:35:17Z","expirationDateTime":"2021-02-24T19:35:17Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":18,"length":14,"text":"day of my life","category":"Age","confidenceScore":0.82}],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  'e6a3ad2a-3c1f-4842-9f4b-9e7961ace654',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:21 GMT'
]);
