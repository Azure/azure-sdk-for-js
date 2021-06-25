let nock = require('nock');

module.exports.hash = "586a571f3405fc4a91192c8057f26eba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987","language":"en"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"UnicodeCodePoint"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/5668b7cf-1841-432f-9b38-69fb0af8fd2b',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  'f4ac1d59-c97a-432a-b7b6-3e47b68912d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/5668b7cf-1841-432f-9b38-69fb0af8fd2b')
  .query(true)
  .reply(200, {"jobId":"5668b7cf-1841-432f-9b38-69fb0af8fd2b","lastUpdateDateTime":"2021-06-25T19:55:21Z","createdDateTime":"2021-06-25T19:55:21Z","expirationDateTime":"2021-06-26T19:55:21Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '945cd6f6-f524-4c4a-bf69-2d9ba91daa00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/5668b7cf-1841-432f-9b38-69fb0af8fd2b')
  .query(true)
  .reply(200, {"jobId":"5668b7cf-1841-432f-9b38-69fb0af8fd2b","lastUpdateDateTime":"2021-06-25T19:55:21Z","createdDateTime":"2021-06-25T19:55:21Z","expirationDateTime":"2021-06-26T19:55:21Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '473d75e1-3f0e-42db-8818-5070d8cb158a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/5668b7cf-1841-432f-9b38-69fb0af8fd2b')
  .query(true)
  .reply(200, {"jobId":"5668b7cf-1841-432f-9b38-69fb0af8fd2b","lastUpdateDateTime":"2021-06-25T19:55:21Z","createdDateTime":"2021-06-25T19:55:21Z","expirationDateTime":"2021-06-26T19:55:21Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '81b49ed4-d2a5-48aa-a102-31d0924e78b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/5668b7cf-1841-432f-9b38-69fb0af8fd2b')
  .query(true)
  .reply(200, {"jobId":"5668b7cf-1841-432f-9b38-69fb0af8fd2b","lastUpdateDateTime":"2021-06-25T19:55:21Z","createdDateTime":"2021-06-25T19:55:21Z","expirationDateTime":"2021-06-26T19:55:21Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'dfe31c3b-324a-4d8e-88be-09ca06fe6bb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/5668b7cf-1841-432f-9b38-69fb0af8fd2b')
  .query(true)
  .reply(200, {"jobId":"5668b7cf-1841-432f-9b38-69fb0af8fd2b","lastUpdateDateTime":"2021-06-25T19:55:27Z","createdDateTime":"2021-06-25T19:55:21Z","expirationDateTime":"2021-06-26T19:55:21Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:55:27.0427821Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '9b7977d0-bc85-4e54-bb35-fce49d6fa1c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/5668b7cf-1841-432f-9b38-69fb0af8fd2b')
  .query(true)
  .reply(200, {"jobId":"5668b7cf-1841-432f-9b38-69fb0af8fd2b","lastUpdateDateTime":"2021-06-25T19:55:27Z","createdDateTime":"2021-06-25T19:55:21Z","expirationDateTime":"2021-06-26T19:55:21Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:55:27.0427821Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '3afc8c4f-13dd-4af7-9f89-be99212bee13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:28 GMT'
]);
