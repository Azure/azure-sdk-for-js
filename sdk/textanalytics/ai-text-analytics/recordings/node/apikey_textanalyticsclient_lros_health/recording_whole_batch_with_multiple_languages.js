let nock = require('nock');

module.exports.hash = "4ef5201e02a9fc85b112c0ed27c5ed5b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"I should take my cat to the veterinarian."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/bf652b64-8d9c-43e4-b7e4-bf2458cd3795',
  'x-envoy-upstream-service-time',
  '265',
  'apim-request-id',
  '2ff5e38c-1fc4-422f-98b5-a95b6e16008f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/bf652b64-8d9c-43e4-b7e4-bf2458cd3795')
  .query(true)
  .reply(200, {"jobId":"bf652b64-8d9c-43e4-b7e4-bf2458cd3795","lastUpdateDateTime":"2021-08-03T22:43:35Z","createdDateTime":"2021-08-03T22:43:35Z","expirationDateTime":"2021-08-04T22:43:35Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'dc272c97-6381-4a73-b85f-bd4726c48cce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/bf652b64-8d9c-43e4-b7e4-bf2458cd3795')
  .query(true)
  .reply(200, {"jobId":"bf652b64-8d9c-43e4-b7e4-bf2458cd3795","lastUpdateDateTime":"2021-08-03T22:43:35Z","createdDateTime":"2021-08-03T22:43:35Z","expirationDateTime":"2021-08-04T22:43:35Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7cb11fa1-2fa2-496e-aa68-e0a1b527e5c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/bf652b64-8d9c-43e4-b7e4-bf2458cd3795')
  .query(true)
  .reply(200, {"jobId":"bf652b64-8d9c-43e4-b7e4-bf2458cd3795","lastUpdateDateTime":"2021-08-03T22:43:37Z","createdDateTime":"2021-08-03T22:43:35Z","expirationDateTime":"2021-08-04T22:43:35Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e66fbc55-db7a-465c-92d1-bf69b8509579',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/bf652b64-8d9c-43e4-b7e4-bf2458cd3795')
  .query(true)
  .reply(200, {"jobId":"bf652b64-8d9c-43e4-b7e4-bf2458cd3795","lastUpdateDateTime":"2021-08-03T22:43:37Z","createdDateTime":"2021-08-03T22:43:35Z","expirationDateTime":"2021-08-04T22:43:35Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.98}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'd60c03c6-0b3e-4678-9c1c-03c09beb66c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/bf652b64-8d9c-43e4-b7e4-bf2458cd3795')
  .query(true)
  .reply(200, {"jobId":"bf652b64-8d9c-43e4-b7e4-bf2458cd3795","lastUpdateDateTime":"2021-08-03T22:43:37Z","createdDateTime":"2021-08-03T22:43:35Z","expirationDateTime":"2021-08-04T22:43:35Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.98}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '26e1c43e-d543-4780-aac5-c2c3ecdb3efa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:39 GMT'
]);
