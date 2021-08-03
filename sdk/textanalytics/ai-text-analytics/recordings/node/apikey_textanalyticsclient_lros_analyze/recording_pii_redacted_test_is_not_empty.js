let nock = require('nock');

module.exports.hash = "cc6235e70058b9b21b1bc57b78b521dd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/01d61357-98dd-4360-8f09-cc4c6d302b27',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '6b7d317f-3c08-44f1-861e-b6d753fdf75f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:26 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/01d61357-98dd-4360-8f09-cc4c6d302b27')
  .query(true)
  .reply(200, {"jobId":"01d61357-98dd-4360-8f09-cc4c6d302b27","lastUpdateDateTime":"2021-08-03T03:14:26Z","createdDateTime":"2021-08-03T03:14:26Z","expirationDateTime":"2021-08-04T03:14:26Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '117c9571-4416-4cc4-846a-e420e2869fa6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:26 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/01d61357-98dd-4360-8f09-cc4c6d302b27')
  .query(true)
  .reply(200, {"jobId":"01d61357-98dd-4360-8f09-cc4c6d302b27","lastUpdateDateTime":"2021-08-03T03:14:26Z","createdDateTime":"2021-08-03T03:14:26Z","expirationDateTime":"2021-08-04T03:14:26Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'aa96560a-5905-4caf-a875-b94b7d83fe87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:26 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/01d61357-98dd-4360-8f09-cc4c6d302b27')
  .query(true)
  .reply(200, {"jobId":"01d61357-98dd-4360-8f09-cc4c6d302b27","lastUpdateDateTime":"2021-08-03T03:14:26Z","createdDateTime":"2021-08-03T03:14:26Z","expirationDateTime":"2021-08-04T03:14:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'c862e77d-be5e-4c4d-ab7b-2b2021572d7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:28 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/01d61357-98dd-4360-8f09-cc4c6d302b27')
  .query(true)
  .reply(200, {"jobId":"01d61357-98dd-4360-8f09-cc4c6d302b27","lastUpdateDateTime":"2021-08-03T03:14:26Z","createdDateTime":"2021-08-03T03:14:26Z","expirationDateTime":"2021-08-04T03:14:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'cad3980c-34c5-4013-8b38-731ba6ef1933',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:30 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/01d61357-98dd-4360-8f09-cc4c6d302b27')
  .query(true)
  .reply(200, {"jobId":"01d61357-98dd-4360-8f09-cc4c6d302b27","lastUpdateDateTime":"2021-08-03T03:14:32Z","createdDateTime":"2021-08-03T03:14:26Z","expirationDateTime":"2021-08-04T03:14:26Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:14:32.6751736Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '35c9d97b-9f3c-45a7-a629-0ad7503ae263',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:32 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/01d61357-98dd-4360-8f09-cc4c6d302b27')
  .query(true)
  .reply(200, {"jobId":"01d61357-98dd-4360-8f09-cc4c6d302b27","lastUpdateDateTime":"2021-08-03T03:14:32Z","createdDateTime":"2021-08-03T03:14:26Z","expirationDateTime":"2021-08-04T03:14:26Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:14:32.6751736Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  'bdc8997d-ec0e-47f0-b5a0-7fa6f1b06b91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:32 GMT'
]);
