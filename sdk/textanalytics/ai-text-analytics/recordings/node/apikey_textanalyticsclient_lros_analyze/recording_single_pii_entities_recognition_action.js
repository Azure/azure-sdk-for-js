let nock = require('nock');

module.exports.hash = "ac00d978031a3ea05adbfa89b8857468";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"3","text":"Is 998.214.865-68 your Brazilian CPF number?"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  'd00893d9-0e61-4287-87bc-c6fb55d2b7a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:20Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '4f1387da-7b41-474e-84bb-38984077953f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:20Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '2f46498d-70c6-491b-a9db-212e3f4d5d46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:22Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '4a8dfa53-4854-4da2-a513-55ba57bdcc88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:22Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '9f4fc043-fbfd-4b5d-bbf2-42b8bef670d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:22Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '4ddb47ef-19e0-401d-8f7c-77b8673cc9dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:22Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '31bdbe5c-e689-44fd-b15a-7e46f83930ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:22Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f0ae6fe2-55d8-4c14-bbd3-70a5ca40a6ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:22Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '8d472bea-d200-49d9-8a4c-3bafe1b974a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:22Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'aef2692f-0a63-46a5-8b07-b8add66b85bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:22Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '803dc6a7-69d4-40c9-95af-f0135fffce94',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:22Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'b79ea5e6-8bb6-47a0-8edf-7469ae8b872f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:40Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T05:02:40.3029779Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '85ec9e6f-08b1-42db-92f7-d48d2a56f0b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/97f5e31c-cbf8-4d48-ada9-f8dd0705a46b')
  .query(true)
  .reply(200, {"jobId":"97f5e31c-cbf8-4d48-ada9-f8dd0705a46b","lastUpdateDateTime":"2021-06-25T05:02:40Z","createdDateTime":"2021-06-25T05:02:20Z","expirationDateTime":"2021-06-26T05:02:20Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T05:02:40.3029779Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  'a0d0c8ac-634f-4a35-a65f-34af92f513a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:02:41 GMT'
]);
