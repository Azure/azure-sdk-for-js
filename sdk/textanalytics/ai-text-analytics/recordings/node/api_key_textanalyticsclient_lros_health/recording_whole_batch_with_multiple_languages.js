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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/31f7c0f3-62d9-4ed2-b659-36a40252c828',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '1c616da5-37b8-4097-abe2-f75a2b01b878',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/31f7c0f3-62d9-4ed2-b659-36a40252c828')
  .query(true)
  .reply(200, {"jobId":"31f7c0f3-62d9-4ed2-b659-36a40252c828","lastUpdateDateTime":"2021-04-28T20:14:38Z","createdDateTime":"2021-04-28T20:14:38Z","expirationDateTime":"2021-04-29T20:14:38Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f3713a5b-3756-4161-a82d-4f8e6a998598',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/31f7c0f3-62d9-4ed2-b659-36a40252c828')
  .query(true)
  .reply(200, {"jobId":"31f7c0f3-62d9-4ed2-b659-36a40252c828","lastUpdateDateTime":"2021-04-28T20:14:38Z","createdDateTime":"2021-04-28T20:14:38Z","expirationDateTime":"2021-04-29T20:14:38Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '1b97cffa-4a8b-47b3-b6fe-8aca6132a05e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/31f7c0f3-62d9-4ed2-b659-36a40252c828')
  .query(true)
  .reply(200, {"jobId":"31f7c0f3-62d9-4ed2-b659-36a40252c828","lastUpdateDateTime":"2021-04-28T20:14:38Z","createdDateTime":"2021-04-28T20:14:38Z","expirationDateTime":"2021-04-29T20:14:38Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.96}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '30597ea1-4037-473b-905a-56006797d118',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/31f7c0f3-62d9-4ed2-b659-36a40252c828')
  .query(true)
  .reply(200, {"jobId":"31f7c0f3-62d9-4ed2-b659-36a40252c828","lastUpdateDateTime":"2021-04-28T20:14:38Z","createdDateTime":"2021-04-28T20:14:38Z","expirationDateTime":"2021-04-29T20:14:38Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.96}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '9802cdf5-6561-449b-840a-04ff4b26550b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:39 GMT'
]);
