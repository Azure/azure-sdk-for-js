let nock = require('nock');

module.exports.hash = "d7e8054512e98cb5ba9ae070e69b37f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  'fe940533-c1f6-4f0f-bcb3-c5b8ba4540b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:26Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '52174e08-447e-4a92-880c-a2635d9db661',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:26Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '2246a022-a5e1-445f-8331-4c98f650b3fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:26Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b3ecd50a-4e99-467d-ad3b-45cf6c3f48b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '909952f9-bfc1-41e5-8494-4ad1cf86bc23',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f7d1ad06-c461-457f-a6d5-16fe6783c581',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'be773854-bac9-45a2-9e5a-563ad74277b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'aac3dd3f-709c-4ff0-af74-903301dac470',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2d9c3444-b04c-4efe-b586-d3eeeff4262c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '92d1ee16-0f5d-4b6b-9d57-6de5da3c1c82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '94fba229-301f-4dbb-8cde-7b046cc2d55e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f740dd00-cfb9-4669-b37d-493805108cd2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '054d0bd7-d254-4bd1-9161-c36b6bd68139',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'b1573f49-246f-4bc8-afa2-62fd183f6a4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '46db7c66-1ad8-4ddb-aaa1-d215d39b0dbb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'dffd283e-9b8f-4d19-806a-e6862069fb6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '79038b48-6cf9-430c-9c81-62d51f07a362',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2b6be632-36ab-4445-b95f-8783407d011f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '466cc40c-2091-4362-8a1f-a451591e8b81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'cca0ea72-ebe3-4207-b3e0-43b62b074ffa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '3df5e25c-f607-49d8-9f99-f12b15b6d044',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:01:29Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '3e3fc8ec-cc99-4c59-9959-a7e4c258905a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:02:06Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T05:02:06.6727943Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '813e8668-aaf4-44c7-8349-a6e79e2fd2bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c')
  .query(true)
  .reply(200, {"jobId":"b9db8fe2-a0c9-48e8-ba02-2b612c4ae33c","lastUpdateDateTime":"2021-06-25T05:02:06Z","createdDateTime":"2021-06-25T05:01:26Z","expirationDateTime":"2021-06-26T05:01:26Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T05:02:06.6727943Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '7fdc0acf-e721-4a4b-a306-a0ed836caf01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:07 GMT'
]);
