let nock = require('nock');

module.exports.hash = "b6dab0e11a2daa4075c7fcd42cd9c5a6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":"w"},{"id":"19","text":":P"},{"id":"1","text":":D"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/f1a412bd-c8b7-4324-b807-9176a6ef8b92',
  'x-envoy-upstream-service-time',
  '290',
  'apim-request-id',
  'd016f95c-a64b-4f89-9042-3cbd49cf5f6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:13 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f1a412bd-c8b7-4324-b807-9176a6ef8b92')
  .query(true)
  .reply(200, {"jobId":"f1a412bd-c8b7-4324-b807-9176a6ef8b92","lastUpdateDateTime":"2021-08-03T03:12:14Z","createdDateTime":"2021-08-03T03:12:14Z","expirationDateTime":"2021-08-04T03:12:14Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'cf31de87-de17-4f17-b7a0-8e29d7f69f3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:13 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f1a412bd-c8b7-4324-b807-9176a6ef8b92')
  .query(true)
  .reply(200, {"jobId":"f1a412bd-c8b7-4324-b807-9176a6ef8b92","lastUpdateDateTime":"2021-08-03T03:12:14Z","createdDateTime":"2021-08-03T03:12:14Z","expirationDateTime":"2021-08-04T03:12:14Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '729521d7-f5c7-4dde-abba-c53f872da210',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:14 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f1a412bd-c8b7-4324-b807-9176a6ef8b92')
  .query(true)
  .reply(200, {"jobId":"f1a412bd-c8b7-4324-b807-9176a6ef8b92","lastUpdateDateTime":"2021-08-03T03:12:16Z","createdDateTime":"2021-08-03T03:12:14Z","expirationDateTime":"2021-08-04T03:12:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f4d6c49a-a2cd-4f3f-b760-cceb37589a30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:16 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f1a412bd-c8b7-4324-b807-9176a6ef8b92')
  .query(true)
  .reply(200, {"jobId":"f1a412bd-c8b7-4324-b807-9176a6ef8b92","lastUpdateDateTime":"2021-08-03T03:12:16Z","createdDateTime":"2021-08-03T03:12:14Z","expirationDateTime":"2021-08-04T03:12:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'b5a4ab71-1725-4e10-a273-83b3dafe9cbd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:18 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f1a412bd-c8b7-4324-b807-9176a6ef8b92')
  .query(true)
  .reply(200, {"jobId":"f1a412bd-c8b7-4324-b807-9176a6ef8b92","lastUpdateDateTime":"2021-08-03T03:12:16Z","createdDateTime":"2021-08-03T03:12:14Z","expirationDateTime":"2021-08-04T03:12:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2a5327a7-72d4-4bd2-824b-1fae6c65d81a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:20 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f1a412bd-c8b7-4324-b807-9176a6ef8b92')
  .query(true)
  .reply(200, {"jobId":"f1a412bd-c8b7-4324-b807-9176a6ef8b92","lastUpdateDateTime":"2021-08-03T03:12:22Z","createdDateTime":"2021-08-03T03:12:14Z","expirationDateTime":"2021-08-04T03:12:14Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:22.5612349Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:22.6598441Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:22.2751767Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '275',
  'apim-request-id',
  '85a1c88d-1c48-4622-a0ed-929ece819aab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:23 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f1a412bd-c8b7-4324-b807-9176a6ef8b92')
  .query(true)
  .reply(200, {"jobId":"f1a412bd-c8b7-4324-b807-9176a6ef8b92","lastUpdateDateTime":"2021-08-03T03:12:22Z","createdDateTime":"2021-08-03T03:12:14Z","expirationDateTime":"2021-08-04T03:12:14Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:22.5612349Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:22.6598441Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:22.2751767Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '222',
  'apim-request-id',
  '74a308f2-424c-4461-a631-024ea91d25c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:23 GMT'
]);
