let nock = require('nock');

module.exports.hash = "be04d0e51d059ad348f98379e8986eda";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"I should take my cat to the veterinarian."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/c7aed8d5-8dda-437a-8299-f039f11c0571',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'baf63dcb-30fe-436b-8171-390c1f37c01f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/c7aed8d5-8dda-437a-8299-f039f11c0571')
  .query(true)
  .reply(200, {"jobId":"c7aed8d5-8dda-437a-8299-f039f11c0571","lastUpdateDateTime":"2020-12-30T17:28:59Z","createdDateTime":"2020-12-30T17:28:59Z","expirationDateTime":"2020-12-31T17:28:59Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '26b6a796-e9cc-4c90-8eb2-7c4a2f727f15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/c7aed8d5-8dda-437a-8299-f039f11c0571')
  .query(true)
  .reply(200, {"jobId":"c7aed8d5-8dda-437a-8299-f039f11c0571","lastUpdateDateTime":"2020-12-30T17:28:59Z","createdDateTime":"2020-12-30T17:28:59Z","expirationDateTime":"2020-12-31T17:28:59Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '14b40047-7c3e-468d-ac46-75ab52047836',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/c7aed8d5-8dda-437a-8299-f039f11c0571')
  .query(true)
  .reply(200, {"jobId":"c7aed8d5-8dda-437a-8299-f039f11c0571","lastUpdateDateTime":"2020-12-30T17:29:00Z","createdDateTime":"2020-12-30T17:28:59Z","expirationDateTime":"2020-12-31T17:28:59Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":17,"length":3,"text":"cat","category":"TreatmentName","confidenceScore":0.74,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0280589"},{"dataSource":"CHV","id":"0000027342"},{"dataSource":"NCI","id":"C10277"},{"dataSource":"PDQ","id":"CDR0000040974"}]},{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.99,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  'f2487364-f6d6-496b-8e85-51d73d7cc3ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/c7aed8d5-8dda-437a-8299-f039f11c0571')
  .query(true)
  .reply(200, {"jobId":"c7aed8d5-8dda-437a-8299-f039f11c0571","lastUpdateDateTime":"2020-12-30T17:29:00Z","createdDateTime":"2020-12-30T17:28:59Z","expirationDateTime":"2020-12-31T17:28:59Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":17,"length":3,"text":"cat","category":"TreatmentName","confidenceScore":0.74,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0280589"},{"dataSource":"CHV","id":"0000027342"},{"dataSource":"NCI","id":"C10277"},{"dataSource":"PDQ","id":"CDR0000040974"}]},{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.99,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '455faded-b35e-4bbb-8a4d-e348ec8a12f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:01 GMT'
]);
