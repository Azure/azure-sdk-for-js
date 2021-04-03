let nock = require('nock');

module.exports.hash = "6aedc920d53dc1c84668bd7b6c5a9f6c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"I should take my cat to the veterinarian."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/0c6c6c93-d8ff-47eb-b3fa-98ac4970eade',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '80c0c66b-e559-4264-8a7a-7965c867b38f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/0c6c6c93-d8ff-47eb-b3fa-98ac4970eade')
  .query(true)
  .reply(200, {"jobId":"0c6c6c93-d8ff-47eb-b3fa-98ac4970eade","lastUpdateDateTime":"2021-03-04T20:18:50Z","createdDateTime":"2021-03-04T20:18:50Z","expirationDateTime":"2021-03-05T20:18:50Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'dee2e632-fbc9-479e-9056-5cd3dc71c293',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/0c6c6c93-d8ff-47eb-b3fa-98ac4970eade')
  .query(true)
  .reply(200, {"jobId":"0c6c6c93-d8ff-47eb-b3fa-98ac4970eade","lastUpdateDateTime":"2021-03-04T20:18:50Z","createdDateTime":"2021-03-04T20:18:50Z","expirationDateTime":"2021-03-05T20:18:50Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e58d18ef-423a-488b-98d4-f4e12d114ac8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/0c6c6c93-d8ff-47eb-b3fa-98ac4970eade')
  .query(true)
  .reply(200, {"jobId":"0c6c6c93-d8ff-47eb-b3fa-98ac4970eade","lastUpdateDateTime":"2021-03-04T20:18:50Z","createdDateTime":"2021-03-04T20:18:50Z","expirationDateTime":"2021-03-05T20:18:50Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.96}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '63169331-7cdb-40b2-b4e6-bb8f38c3c679',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/0c6c6c93-d8ff-47eb-b3fa-98ac4970eade')
  .query(true)
  .reply(200, {"jobId":"0c6c6c93-d8ff-47eb-b3fa-98ac4970eade","lastUpdateDateTime":"2021-03-04T20:18:50Z","createdDateTime":"2021-03-04T20:18:50Z","expirationDateTime":"2021-03-05T20:18:50Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.96}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '3379de48-8ed1-441f-8839-80ddbff17b1c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:52 GMT'
]);
