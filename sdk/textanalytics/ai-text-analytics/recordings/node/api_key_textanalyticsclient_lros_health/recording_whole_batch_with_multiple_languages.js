let nock = require('nock');

module.exports.hash = "6aedc920d53dc1c84668bd7b6c5a9f6c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"1","text":"I should take my cat to the veterinarian."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/6d5e859f-f822-4176-9382-b78ee62a84f7',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  'dc309a73-5903-4b32-ae86-f7c5161b71f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/6d5e859f-f822-4176-9382-b78ee62a84f7')
  .query(true)
  .reply(200, {"jobId":"6d5e859f-f822-4176-9382-b78ee62a84f7","lastUpdateDateTime":"2021-05-12T19:05:28Z","createdDateTime":"2021-05-12T19:05:28Z","expirationDateTime":"2021-05-13T19:05:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '201072cd-54df-4d7a-96c4-0041f82bf54e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/6d5e859f-f822-4176-9382-b78ee62a84f7')
  .query(true)
  .reply(200, {"jobId":"6d5e859f-f822-4176-9382-b78ee62a84f7","lastUpdateDateTime":"2021-05-12T19:05:28Z","createdDateTime":"2021-05-12T19:05:28Z","expirationDateTime":"2021-05-13T19:05:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '1f3545d7-7821-4f08-a445-6841727b1f05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/6d5e859f-f822-4176-9382-b78ee62a84f7')
  .query(true)
  .reply(200, {"jobId":"6d5e859f-f822-4176-9382-b78ee62a84f7","lastUpdateDateTime":"2021-05-12T19:05:28Z","createdDateTime":"2021-05-12T19:05:28Z","expirationDateTime":"2021-05-13T19:05:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'b534b326-ed65-4634-a4d0-c846b347a6db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/6d5e859f-f822-4176-9382-b78ee62a84f7')
  .query(true)
  .reply(200, {"jobId":"6d5e859f-f822-4176-9382-b78ee62a84f7","lastUpdateDateTime":"2021-05-12T19:05:32Z","createdDateTime":"2021-05-12T19:05:28Z","expirationDateTime":"2021-05-13T19:05:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.96}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '53f1bf40-4a8c-47f2-8095-ff4c41994d3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/6d5e859f-f822-4176-9382-b78ee62a84f7')
  .query(true)
  .reply(200, {"jobId":"6d5e859f-f822-4176-9382-b78ee62a84f7","lastUpdateDateTime":"2021-05-12T19:05:32Z","createdDateTime":"2021-05-12T19:05:28Z","expirationDateTime":"2021-05-13T19:05:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.96}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '332370c4-caf8-42a0-a3e1-5733514a022c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:32 GMT'
]);
