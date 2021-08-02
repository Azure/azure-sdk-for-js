let nock = require('nock');

module.exports.hash = "204756a0ef7bb31d61c833d32a9152fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/analyze', {"displayName":"testJob","analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/07e6a9b5-f94f-4f7a-a52b-72dfeedb7663',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '83b4e7c7-dbd4-4209-a230-6541e26d52ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/07e6a9b5-f94f-4f7a-a52b-72dfeedb7663')
  .query(true)
  .reply(200, {"jobId":"07e6a9b5-f94f-4f7a-a52b-72dfeedb7663","lastUpdateDateTime":"2021-06-25T19:55:12Z","createdDateTime":"2021-06-25T19:55:12Z","expirationDateTime":"2021-06-26T19:55:12Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9978b729-5856-406b-b262-c4e61a7d1b75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/07e6a9b5-f94f-4f7a-a52b-72dfeedb7663')
  .query(true)
  .reply(200, {"jobId":"07e6a9b5-f94f-4f7a-a52b-72dfeedb7663","lastUpdateDateTime":"2021-06-25T19:55:12Z","createdDateTime":"2021-06-25T19:55:12Z","expirationDateTime":"2021-06-26T19:55:12Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '9c4be965-0d1f-4bd5-a134-fdde2a994ee2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/07e6a9b5-f94f-4f7a-a52b-72dfeedb7663')
  .query(true)
  .reply(200, {"jobId":"07e6a9b5-f94f-4f7a-a52b-72dfeedb7663","lastUpdateDateTime":"2021-06-25T19:55:12Z","createdDateTime":"2021-06-25T19:55:12Z","expirationDateTime":"2021-06-26T19:55:12Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6eff8be9-23ad-498a-b46f-ad697deb616d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/07e6a9b5-f94f-4f7a-a52b-72dfeedb7663')
  .query(true)
  .reply(200, {"jobId":"07e6a9b5-f94f-4f7a-a52b-72dfeedb7663","lastUpdateDateTime":"2021-06-25T19:55:12Z","createdDateTime":"2021-06-25T19:55:12Z","expirationDateTime":"2021-06-26T19:55:12Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '3be20669-dcfa-4257-a6e8-9dd0ad75f522',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/07e6a9b5-f94f-4f7a-a52b-72dfeedb7663')
  .query(true)
  .reply(200, {"jobId":"07e6a9b5-f94f-4f7a-a52b-72dfeedb7663","lastUpdateDateTime":"2021-06-25T19:55:12Z","createdDateTime":"2021-06-25T19:55:12Z","expirationDateTime":"2021-06-26T19:55:12Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'af95f344-e51e-4b21-827f-bc0e1ce905b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/07e6a9b5-f94f-4f7a-a52b-72dfeedb7663')
  .query(true)
  .reply(200, {"jobId":"07e6a9b5-f94f-4f7a-a52b-72dfeedb7663","lastUpdateDateTime":"2021-06-25T19:55:19Z","createdDateTime":"2021-06-25T19:55:12Z","expirationDateTime":"2021-06-26T19:55:12Z","status":"succeeded","errors":[],"displayName":"testJob","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:55:19.5336533Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  'f2c61db9-01a5-48c6-ad41-f7f57e5f4aa7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:21 GMT'
]);
