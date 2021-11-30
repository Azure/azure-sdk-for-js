let nock = require('nock');

module.exports.hash = "cadb222b1add133df1ecfeacb4026b4b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/2ddc7f31-bce3-466a-ad33-a1176fb93d03',
  'x-envoy-upstream-service-time',
  '437',
  'apim-request-id',
  '66e6538e-ac53-4378-abe2-ac5f90156fed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/2ddc7f31-bce3-466a-ad33-a1176fb93d03')
  .query(true)
  .reply(200, {"jobId":"2ddc7f31-bce3-466a-ad33-a1176fb93d03","lastUpdateDateTime":"2021-10-23T00:40:15Z","createdDateTime":"2021-10-23T00:40:14Z","expirationDateTime":"2021-10-24T00:40:14Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'cc4a3b1e-4c38-465c-ac17-a88adaafc7de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/2ddc7f31-bce3-466a-ad33-a1176fb93d03')
  .query(true)
  .reply(200, {"jobId":"2ddc7f31-bce3-466a-ad33-a1176fb93d03","lastUpdateDateTime":"2021-10-23T00:40:15Z","createdDateTime":"2021-10-23T00:40:14Z","expirationDateTime":"2021-10-24T00:40:14Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7e8c99a4-84f1-4184-b608-49b50976f15b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/2ddc7f31-bce3-466a-ad33-a1176fb93d03')
  .query(true)
  .reply(200, {"jobId":"2ddc7f31-bce3-466a-ad33-a1176fb93d03","lastUpdateDateTime":"2021-10-23T00:40:15Z","createdDateTime":"2021-10-23T00:40:14Z","expirationDateTime":"2021-10-24T00:40:14Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '26713734-4589-4068-a0a8-7af9c0eb5148',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/2ddc7f31-bce3-466a-ad33-a1176fb93d03')
  .query(true)
  .reply(200, {"jobId":"2ddc7f31-bce3-466a-ad33-a1176fb93d03","lastUpdateDateTime":"2021-10-23T00:40:15Z","createdDateTime":"2021-10-23T00:40:14Z","expirationDateTime":"2021-10-24T00:40:14Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '7f1ed91a-e2b1-4678-9143-327b19dfb3cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/2ddc7f31-bce3-466a-ad33-a1176fb93d03')
  .query(true)
  .reply(200, {"jobId":"2ddc7f31-bce3-466a-ad33-a1176fb93d03","lastUpdateDateTime":"2021-10-23T00:40:21Z","createdDateTime":"2021-10-23T00:40:14Z","expirationDateTime":"2021-10-24T00:40:14Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '8ca82831-ece6-43b6-912f-49b4e6d75428',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/2ddc7f31-bce3-466a-ad33-a1176fb93d03')
  .query(true)
  .reply(200, {"jobId":"2ddc7f31-bce3-466a-ad33-a1176fb93d03","lastUpdateDateTime":"2021-10-23T00:40:23Z","createdDateTime":"2021-10-23T00:40:14Z","expirationDateTime":"2021-10-24T00:40:14Z","status":"running","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:40:23.1543074Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.94}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '17551a01-f66c-495a-90ad-60fe09798e52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/2ddc7f31-bce3-466a-ad33-a1176fb93d03')
  .query(true)
  .reply(200, {"jobId":"2ddc7f31-bce3-466a-ad33-a1176fb93d03","lastUpdateDateTime":"2021-10-23T00:40:24Z","createdDateTime":"2021-10-23T00:40:14Z","expirationDateTime":"2021-10-24T00:40:14Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:40:23.1543074Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.94}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:40:24.3895266Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:40:24.478907Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Español","document"],"warnings":[]},{"id":"3","keyPhrases":["は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '235',
  'apim-request-id',
  '9ddb0680-c53f-4369-9cd1-043bec35b9e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/2ddc7f31-bce3-466a-ad33-a1176fb93d03')
  .query(true)
  .reply(200, {"jobId":"2ddc7f31-bce3-466a-ad33-a1176fb93d03","lastUpdateDateTime":"2021-10-23T00:40:24Z","createdDateTime":"2021-10-23T00:40:14Z","expirationDateTime":"2021-10-24T00:40:14Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:40:23.1543074Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.94}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:40:24.3895266Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:40:24.478907Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Español","document"],"warnings":[]},{"id":"3","keyPhrases":["は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '243',
  'apim-request-id',
  'db4a68a1-62a6-4abd-b931-f8ec8b987653',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:26 GMT'
]);
