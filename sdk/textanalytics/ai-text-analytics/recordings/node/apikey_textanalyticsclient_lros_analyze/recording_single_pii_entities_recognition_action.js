let nock = require('nock');

module.exports.hash = "ac00d978031a3ea05adbfa89b8857468";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"3","text":"Is 998.214.865-68 your Brazilian CPF number?"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  '626c24f2-dd02-488e-af2a-7dfdf4036726',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '7d225ff4-b2c1-43fb-8c37-7b691e49534f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5c848121-8d8b-47dc-9509-0a8064f35bcd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'c8e90e9b-5cb2-420b-bfe0-918aed695a1c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '8691536d-f257-4b64-93c9-dfeebc58e673',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'af08d124-de2a-46b5-8226-c486bd0b8631',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'df5541f7-b86c-4ff1-bcb5-8eed89684a64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7552b5f7-a3f5-42c4-9d6d-cc4102b8b545',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '013bff44-728b-43ad-b77b-a58ba4e1cb71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '566a3c29-cac5-4ae7-ba4b-80534cfd51ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '0e2fa0b5-f03e-4610-9ba4-9ff600cca470',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a0038342-b3be-4ee4-92ce-aa11e0f0c058',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:00Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '45c4d363-6d31-4399-8930-5e3ed6111c86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:23Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:49:23.0251551Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '00a38baf-35ac-4416-871e-099b9609cf03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/77267cc8-3ebf-4469-bde4-cd90d43b6cf6')
  .query(true)
  .reply(200, {"jobId":"77267cc8-3ebf-4469-bde4-cd90d43b6cf6","lastUpdateDateTime":"2021-06-25T19:49:23Z","createdDateTime":"2021-06-25T19:49:00Z","expirationDateTime":"2021-06-26T19:49:00Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:49:23.0251551Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '85753cbf-7fec-46b1-9b20-fc25f143a317',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:49:23 GMT'
]);
