let nock = require('nock');

module.exports.hash = "b5f82998ec382ffdc25c0a92c73703fd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/7089fd23-0150-4887-9a84-eee58c8b1bcb',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '1bdc16c3-f100-4669-8c37-3d567b5e5912',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/7089fd23-0150-4887-9a84-eee58c8b1bcb')
  .query(true)
  .reply(200, {"jobId":"7089fd23-0150-4887-9a84-eee58c8b1bcb","lastUpdateDateTime":"2021-02-23T19:34:57Z","createdDateTime":"2021-02-23T19:34:57Z","expirationDateTime":"2021-02-24T19:34:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '20f30923-d5ab-4d74-8504-c00a829c7244',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/7089fd23-0150-4887-9a84-eee58c8b1bcb')
  .query(true)
  .reply(200, {"jobId":"7089fd23-0150-4887-9a84-eee58c8b1bcb","lastUpdateDateTime":"2021-02-23T19:34:57Z","createdDateTime":"2021-02-23T19:34:57Z","expirationDateTime":"2021-02-24T19:34:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '14ee535e-d009-4b28-98c7-fdc5c51d3c83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/7089fd23-0150-4887-9a84-eee58c8b1bcb')
  .query(true)
  .reply(200, {"jobId":"7089fd23-0150-4887-9a84-eee58c8b1bcb","lastUpdateDateTime":"2021-02-23T19:34:57Z","createdDateTime":"2021-02-23T19:34:57Z","expirationDateTime":"2021-02-24T19:34:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '907df09f-d494-4c9e-8581-2345cd6b9249',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/7089fd23-0150-4887-9a84-eee58c8b1bcb')
  .query(true)
  .reply(200, {"jobId":"7089fd23-0150-4887-9a84-eee58c8b1bcb","lastUpdateDateTime":"2021-02-23T19:34:57Z","createdDateTime":"2021-02-23T19:34:57Z","expirationDateTime":"2021-02-24T19:34:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '35d5635c-9252-4842-9e44-880aee66dd20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/7089fd23-0150-4887-9a84-eee58c8b1bcb')
  .query(true)
  .reply(200, {"jobId":"7089fd23-0150-4887-9a84-eee58c8b1bcb","lastUpdateDateTime":"2021-02-23T19:35:01Z","createdDateTime":"2021-02-23T19:34:57Z","expirationDateTime":"2021-02-24T19:34:57Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '7fc67b6a-72da-455c-84bc-e11c82e9c1e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/7089fd23-0150-4887-9a84-eee58c8b1bcb')
  .query(true)
  .reply(200, {"jobId":"7089fd23-0150-4887-9a84-eee58c8b1bcb","lastUpdateDateTime":"2021-02-23T19:35:01Z","createdDateTime":"2021-02-23T19:34:57Z","expirationDateTime":"2021-02-24T19:34:57Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '48866d4f-16f2-43ba-9234-a2fad1ca467c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:03 GMT'
]);
