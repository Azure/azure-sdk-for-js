let nock = require('nock');

module.exports.hash = "586a571f3405fc4a91192c8057f26eba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987","language":"en"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"UnicodeCodePoint"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/f232d592-a3cd-480d-8d67-a7dd521e2fa6',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  'a945661d-a163-4959-9c06-fddf91c9e965',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/f232d592-a3cd-480d-8d67-a7dd521e2fa6')
  .query(true)
  .reply(200, {"jobId":"f232d592-a3cd-480d-8d67-a7dd521e2fa6","lastUpdateDateTime":"2021-06-25T05:09:20Z","createdDateTime":"2021-06-25T05:09:20Z","expirationDateTime":"2021-06-26T05:09:20Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'fc7e2322-b6bd-47c5-a85a-5c2baf81d8f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/f232d592-a3cd-480d-8d67-a7dd521e2fa6')
  .query(true)
  .reply(200, {"jobId":"f232d592-a3cd-480d-8d67-a7dd521e2fa6","lastUpdateDateTime":"2021-06-25T05:09:20Z","createdDateTime":"2021-06-25T05:09:20Z","expirationDateTime":"2021-06-26T05:09:20Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '17baad79-1d3c-489f-bb29-a30250af9c1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/f232d592-a3cd-480d-8d67-a7dd521e2fa6')
  .query(true)
  .reply(200, {"jobId":"f232d592-a3cd-480d-8d67-a7dd521e2fa6","lastUpdateDateTime":"2021-06-25T05:09:22Z","createdDateTime":"2021-06-25T05:09:20Z","expirationDateTime":"2021-06-26T05:09:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '11cc519f-f758-4a96-9978-0f1ab505c399',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/f232d592-a3cd-480d-8d67-a7dd521e2fa6')
  .query(true)
  .reply(200, {"jobId":"f232d592-a3cd-480d-8d67-a7dd521e2fa6","lastUpdateDateTime":"2021-06-25T05:09:22Z","createdDateTime":"2021-06-25T05:09:20Z","expirationDateTime":"2021-06-26T05:09:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'd7cec77e-0398-43cb-90b8-b6ac35c0525d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/f232d592-a3cd-480d-8d67-a7dd521e2fa6')
  .query(true)
  .reply(200, {"jobId":"f232d592-a3cd-480d-8d67-a7dd521e2fa6","lastUpdateDateTime":"2021-06-25T05:09:22Z","createdDateTime":"2021-06-25T05:09:20Z","expirationDateTime":"2021-06-26T05:09:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ffbab0a9-50c3-4294-b64e-2bd2f7edd605',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/f232d592-a3cd-480d-8d67-a7dd521e2fa6')
  .query(true)
  .reply(200, {"jobId":"f232d592-a3cd-480d-8d67-a7dd521e2fa6","lastUpdateDateTime":"2021-06-25T05:09:22Z","createdDateTime":"2021-06-25T05:09:20Z","expirationDateTime":"2021-06-26T05:09:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'efd4c13f-accd-4c49-9219-888a6cb79b33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/f232d592-a3cd-480d-8d67-a7dd521e2fa6')
  .query(true)
  .reply(200, {"jobId":"f232d592-a3cd-480d-8d67-a7dd521e2fa6","lastUpdateDateTime":"2021-06-25T05:09:22Z","createdDateTime":"2021-06-25T05:09:20Z","expirationDateTime":"2021-06-26T05:09:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '146f353d-e1b2-493e-bc22-c1d54d01bf32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/f232d592-a3cd-480d-8d67-a7dd521e2fa6')
  .query(true)
  .reply(200, {"jobId":"f232d592-a3cd-480d-8d67-a7dd521e2fa6","lastUpdateDateTime":"2021-06-25T05:09:22Z","createdDateTime":"2021-06-25T05:09:20Z","expirationDateTime":"2021-06-26T05:09:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '6a9c8bd8-89c5-4209-9357-e35a9ca6786c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/f232d592-a3cd-480d-8d67-a7dd521e2fa6')
  .query(true)
  .reply(200, {"jobId":"f232d592-a3cd-480d-8d67-a7dd521e2fa6","lastUpdateDateTime":"2021-06-25T05:09:34Z","createdDateTime":"2021-06-25T05:09:20Z","expirationDateTime":"2021-06-26T05:09:20Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T05:09:34.5454632Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'be9ab5a2-971f-4d44-9d94-a68b49ae581a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/f232d592-a3cd-480d-8d67-a7dd521e2fa6')
  .query(true)
  .reply(200, {"jobId":"f232d592-a3cd-480d-8d67-a7dd521e2fa6","lastUpdateDateTime":"2021-06-25T05:09:34Z","createdDateTime":"2021-06-25T05:09:20Z","expirationDateTime":"2021-06-26T05:09:20Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T05:09:34.5454632Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '652cdde5-e6a1-44a0-9174-22b25d485792',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:34 GMT'
]);
