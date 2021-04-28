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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/d55e7a3a-8622-4fb7-be10-b2fa0f508b43',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'c1d03bca-814f-4270-90ed-3fc8fc7f2ee0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/d55e7a3a-8622-4fb7-be10-b2fa0f508b43')
  .query(true)
  .reply(200, {"jobId":"d55e7a3a-8622-4fb7-be10-b2fa0f508b43","lastUpdateDateTime":"2021-04-28T21:05:20Z","createdDateTime":"2021-04-28T21:05:20Z","expirationDateTime":"2021-04-29T21:05:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '8e5e915a-2c79-4047-b93a-99230aeebaee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/d55e7a3a-8622-4fb7-be10-b2fa0f508b43')
  .query(true)
  .reply(200, {"jobId":"d55e7a3a-8622-4fb7-be10-b2fa0f508b43","lastUpdateDateTime":"2021-04-28T21:05:20Z","createdDateTime":"2021-04-28T21:05:20Z","expirationDateTime":"2021-04-29T21:05:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '993ec56a-7073-4ac5-af0f-abfa2c4286a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/d55e7a3a-8622-4fb7-be10-b2fa0f508b43')
  .query(true)
  .reply(200, {"jobId":"d55e7a3a-8622-4fb7-be10-b2fa0f508b43","lastUpdateDateTime":"2021-04-28T21:05:20Z","createdDateTime":"2021-04-28T21:05:20Z","expirationDateTime":"2021-04-29T21:05:20Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.96}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'ce501cf7-c6a6-4ad2-9af1-f67715fc7ae5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/d55e7a3a-8622-4fb7-be10-b2fa0f508b43')
  .query(true)
  .reply(200, {"jobId":"d55e7a3a-8622-4fb7-be10-b2fa0f508b43","lastUpdateDateTime":"2021-04-28T21:05:20Z","createdDateTime":"2021-04-28T21:05:20Z","expirationDateTime":"2021-04-29T21:05:20Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.96}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'fd52439c-eb0d-4edf-9cbe-26fc52f606f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:22 GMT'
]);
