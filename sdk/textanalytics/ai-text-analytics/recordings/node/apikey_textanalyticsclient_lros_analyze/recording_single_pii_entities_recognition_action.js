let nock = require('nock');

module.exports.hash = "70ebb48b8c690c3a54b627eeb3ac0ee6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"3","text":"Is 998.214.865-68 your Brazilian CPF number?"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/8ebd4f94-525c-43ee-8aa2-bb0eba182e8d',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  '380f628e-ca39-42b8-b0a4-d14d7f158c8f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/8ebd4f94-525c-43ee-8aa2-bb0eba182e8d')
  .query(true)
  .reply(200, {"jobId":"8ebd4f94-525c-43ee-8aa2-bb0eba182e8d","lastUpdateDateTime":"2021-08-03T03:10:58Z","createdDateTime":"2021-08-03T03:10:58Z","expirationDateTime":"2021-08-04T03:10:58Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7685fc6e-71ef-4586-8c51-629db0e7806f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:58 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/8ebd4f94-525c-43ee-8aa2-bb0eba182e8d')
  .query(true)
  .reply(200, {"jobId":"8ebd4f94-525c-43ee-8aa2-bb0eba182e8d","lastUpdateDateTime":"2021-08-03T03:10:58Z","createdDateTime":"2021-08-03T03:10:58Z","expirationDateTime":"2021-08-04T03:10:58Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '5eeb1460-f523-4bde-8ddb-1bad7cbe8f08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:58 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/8ebd4f94-525c-43ee-8aa2-bb0eba182e8d')
  .query(true)
  .reply(200, {"jobId":"8ebd4f94-525c-43ee-8aa2-bb0eba182e8d","lastUpdateDateTime":"2021-08-03T03:10:58Z","createdDateTime":"2021-08-03T03:10:58Z","expirationDateTime":"2021-08-04T03:10:58Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ca1fef2c-ae39-4c1f-b6ae-336e04d19e3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:00 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/8ebd4f94-525c-43ee-8aa2-bb0eba182e8d')
  .query(true)
  .reply(200, {"jobId":"8ebd4f94-525c-43ee-8aa2-bb0eba182e8d","lastUpdateDateTime":"2021-08-03T03:11:01Z","createdDateTime":"2021-08-03T03:10:58Z","expirationDateTime":"2021-08-04T03:10:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '574f5d04-47ca-4239-81dc-060d4970e4e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:02 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/8ebd4f94-525c-43ee-8aa2-bb0eba182e8d')
  .query(true)
  .reply(200, {"jobId":"8ebd4f94-525c-43ee-8aa2-bb0eba182e8d","lastUpdateDateTime":"2021-08-03T03:11:01Z","createdDateTime":"2021-08-03T03:10:58Z","expirationDateTime":"2021-08-04T03:10:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '556224fb-1bb6-46bb-bce1-614d032338cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:04 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/8ebd4f94-525c-43ee-8aa2-bb0eba182e8d')
  .query(true)
  .reply(200, {"jobId":"8ebd4f94-525c-43ee-8aa2-bb0eba182e8d","lastUpdateDateTime":"2021-08-03T03:11:01Z","createdDateTime":"2021-08-03T03:10:58Z","expirationDateTime":"2021-08-04T03:10:58Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ce89e8ce-acc3-4465-b2d5-8773cb99dc19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:06 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/8ebd4f94-525c-43ee-8aa2-bb0eba182e8d')
  .query(true)
  .reply(200, {"jobId":"8ebd4f94-525c-43ee-8aa2-bb0eba182e8d","lastUpdateDateTime":"2021-08-03T03:11:07Z","createdDateTime":"2021-08-03T03:10:58Z","expirationDateTime":"2021-08-04T03:10:58Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:11:07.3721669Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '6df60dd5-c7be-40b1-9281-52fa9a29cee8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:08 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/8ebd4f94-525c-43ee-8aa2-bb0eba182e8d')
  .query(true)
  .reply(200, {"jobId":"8ebd4f94-525c-43ee-8aa2-bb0eba182e8d","lastUpdateDateTime":"2021-08-03T03:11:07Z","createdDateTime":"2021-08-03T03:10:58Z","expirationDateTime":"2021-08-04T03:10:58Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:11:07.3721669Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'c06b7deb-b98b-47a7-b069-58010dbfcdb9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:11:08 GMT'
]);
