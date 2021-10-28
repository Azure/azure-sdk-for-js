let nock = require('nock');

module.exports.hash = "5eb1f48c0b2ff864b7682bef634467f1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"},"taskName":"action1"},{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"},"taskName":"action2"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/7e900bc7-2c19-432c-b23f-34b2cbb23dd8',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  '8ea77591-e2c2-4dba-93e3-2692e359b96d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:46:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/7e900bc7-2c19-432c-b23f-34b2cbb23dd8')
  .query(true)
  .reply(200, {"jobId":"7e900bc7-2c19-432c-b23f-34b2cbb23dd8","lastUpdateDateTime":"2021-10-28T02:46:53Z","createdDateTime":"2021-10-28T02:46:53Z","expirationDateTime":"2021-10-29T02:46:53Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '8da5cba7-bdcf-47ac-ae43-e9f472e2b8d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:46:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/7e900bc7-2c19-432c-b23f-34b2cbb23dd8')
  .query(true)
  .reply(200, {"jobId":"7e900bc7-2c19-432c-b23f-34b2cbb23dd8","lastUpdateDateTime":"2021-10-28T02:46:53Z","createdDateTime":"2021-10-28T02:46:53Z","expirationDateTime":"2021-10-29T02:46:53Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  'cabc24a9-9ba5-49b5-85fb-214a6aab6a23',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:46:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/7e900bc7-2c19-432c-b23f-34b2cbb23dd8')
  .query(true)
  .reply(200, {"jobId":"7e900bc7-2c19-432c-b23f-34b2cbb23dd8","lastUpdateDateTime":"2021-10-28T02:46:53Z","createdDateTime":"2021-10-28T02:46:53Z","expirationDateTime":"2021-10-29T02:46:53Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2ff34ab7-8312-4799-a87c-8c2b27e0cb4f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:46:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/7e900bc7-2c19-432c-b23f-34b2cbb23dd8')
  .query(true)
  .reply(200, {"jobId":"7e900bc7-2c19-432c-b23f-34b2cbb23dd8","lastUpdateDateTime":"2021-10-28T02:46:53Z","createdDateTime":"2021-10-28T02:46:53Z","expirationDateTime":"2021-10-29T02:46:53Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '5db68b86-fa84-4f27-9821-0b7621c4ed05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:46:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/7e900bc7-2c19-432c-b23f-34b2cbb23dd8')
  .query(true)
  .reply(200, {"jobId":"7e900bc7-2c19-432c-b23f-34b2cbb23dd8","lastUpdateDateTime":"2021-10-28T02:46:53Z","createdDateTime":"2021-10-28T02:46:53Z","expirationDateTime":"2021-10-29T02:46:53Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f731bd0e-9e5f-4f89-910d-367f105617d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:46:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/7e900bc7-2c19-432c-b23f-34b2cbb23dd8')
  .query(true)
  .reply(200, {"jobId":"7e900bc7-2c19-432c-b23f-34b2cbb23dd8","lastUpdateDateTime":"2021-10-28T02:47:01Z","createdDateTime":"2021-10-28T02:46:53Z","expirationDateTime":"2021-10-29T02:46:53Z","status":"running","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-28T02:47:01.4399609Z","taskName":"action1","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '0c60e344-8f99-448d-ad8b-83b277e463f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:47:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/7e900bc7-2c19-432c-b23f-34b2cbb23dd8')
  .query(true)
  .reply(200, {"jobId":"7e900bc7-2c19-432c-b23f-34b2cbb23dd8","lastUpdateDateTime":"2021-10-28T02:47:01Z","createdDateTime":"2021-10-28T02:46:53Z","expirationDateTime":"2021-10-29T02:46:53Z","status":"succeeded","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-28T02:47:01.4399609Z","taskName":"action1","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-10-28T02:47:01.8640821Z","taskName":"action2","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '24905b2b-9769-4128-a4f2-0a532859b201',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:47:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/7e900bc7-2c19-432c-b23f-34b2cbb23dd8')
  .query(true)
  .reply(200, {"jobId":"7e900bc7-2c19-432c-b23f-34b2cbb23dd8","lastUpdateDateTime":"2021-10-28T02:47:01Z","createdDateTime":"2021-10-28T02:46:53Z","expirationDateTime":"2021-10-29T02:46:53Z","status":"succeeded","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-28T02:47:01.4399609Z","taskName":"action1","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-10-28T02:47:01.8640821Z","taskName":"action2","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '2654baa7-a5ab-43ed-a0b0-8d902dafa618',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 02:47:03 GMT'
]);
