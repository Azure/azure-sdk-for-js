let nock = require('nock');

module.exports.hash = "61c6632849c9566300af4ee3c143eac6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/c0454e00-e103-413c-ad90-f090e68086c4',
  'x-envoy-upstream-service-time',
  '226',
  'apim-request-id',
  '18411384-a36f-4f2f-a185-cd7c680f953f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/c0454e00-e103-413c-ad90-f090e68086c4')
  .query(true)
  .reply(200, {"jobId":"c0454e00-e103-413c-ad90-f090e68086c4","lastUpdateDateTime":"2021-10-23T00:37:17Z","createdDateTime":"2021-10-23T00:37:17Z","expirationDateTime":"2021-10-24T00:37:17Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '381ec100-b7f7-4323-a144-a80ecb107da2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/c0454e00-e103-413c-ad90-f090e68086c4')
  .query(true)
  .reply(200, {"jobId":"c0454e00-e103-413c-ad90-f090e68086c4","lastUpdateDateTime":"2021-10-23T00:37:17Z","createdDateTime":"2021-10-23T00:37:17Z","expirationDateTime":"2021-10-24T00:37:17Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '7a3f905a-caba-48fd-8021-eeb48183aa1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/c0454e00-e103-413c-ad90-f090e68086c4')
  .query(true)
  .reply(200, {"jobId":"c0454e00-e103-413c-ad90-f090e68086c4","lastUpdateDateTime":"2021-10-23T00:37:17Z","createdDateTime":"2021-10-23T00:37:17Z","expirationDateTime":"2021-10-24T00:37:17Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '546274ab-29c1-4c72-a440-936b63a937ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/c0454e00-e103-413c-ad90-f090e68086c4')
  .query(true)
  .reply(200, {"jobId":"c0454e00-e103-413c-ad90-f090e68086c4","lastUpdateDateTime":"2021-10-23T00:37:17Z","createdDateTime":"2021-10-23T00:37:17Z","expirationDateTime":"2021-10-24T00:37:17Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '2cb82066-5e2e-4126-b316-d1977ce74ab1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/c0454e00-e103-413c-ad90-f090e68086c4')
  .query(true)
  .reply(200, {"jobId":"c0454e00-e103-413c-ad90-f090e68086c4","lastUpdateDateTime":"2021-10-23T00:37:17Z","createdDateTime":"2021-10-23T00:37:17Z","expirationDateTime":"2021-10-24T00:37:17Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'ee1fb2c9-18ad-4710-a7bb-a1d032710805',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/c0454e00-e103-413c-ad90-f090e68086c4')
  .query(true)
  .reply(200, {"jobId":"c0454e00-e103-413c-ad90-f090e68086c4","lastUpdateDateTime":"2021-10-23T00:37:17Z","createdDateTime":"2021-10-23T00:37:17Z","expirationDateTime":"2021-10-24T00:37:17Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '044ba624-c68d-4746-94eb-ef52aa3fec4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/c0454e00-e103-413c-ad90-f090e68086c4')
  .query(true)
  .reply(200, {"jobId":"c0454e00-e103-413c-ad90-f090e68086c4","lastUpdateDateTime":"2021-10-23T00:37:17Z","createdDateTime":"2021-10-23T00:37:17Z","expirationDateTime":"2021-10-24T00:37:17Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'ece992d6-d3af-4c07-ac3c-a110a65c4a42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/c0454e00-e103-413c-ad90-f090e68086c4')
  .query(true)
  .reply(200, {"jobId":"c0454e00-e103-413c-ad90-f090e68086c4","lastUpdateDateTime":"2021-10-23T00:37:29Z","createdDateTime":"2021-10-23T00:37:17Z","expirationDateTime":"2021-10-24T00:37:17Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:37:29.3783566Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '313e7dee-bb82-4613-8229-f594f6d19b60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/c0454e00-e103-413c-ad90-f090e68086c4')
  .query(true)
  .reply(200, {"jobId":"c0454e00-e103-413c-ad90-f090e68086c4","lastUpdateDateTime":"2021-10-23T00:37:29Z","createdDateTime":"2021-10-23T00:37:17Z","expirationDateTime":"2021-10-24T00:37:17Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:37:29.3783566Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '3fe79ab0-29e0-4c9d-8008-c48b971cfb9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:30 GMT'
]);
