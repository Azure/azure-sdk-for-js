let nock = require('nock');

module.exports.hash = "be39d2b1d12b7badfb88bab5fa7ea059";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"I should take my cat to the veterinarian."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/dfbcc149-c0a0-45e0-905d-373280fcdbe9',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'b70ebf8e-70d4-4788-9349-9640b8c3dd25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/dfbcc149-c0a0-45e0-905d-373280fcdbe9')
  .query(true)
  .reply(200, {"jobId":"dfbcc149-c0a0-45e0-905d-373280fcdbe9","lastUpdateDateTime":"2020-12-22T20:08:15Z","createdDateTime":"2020-12-22T20:08:15Z","expirationDateTime":"2020-12-23T20:08:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '9924aae3-bd22-43f0-bc5a-ee3b1db8c502',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/dfbcc149-c0a0-45e0-905d-373280fcdbe9')
  .query(true)
  .reply(200, {"jobId":"dfbcc149-c0a0-45e0-905d-373280fcdbe9","lastUpdateDateTime":"2020-12-22T20:08:15Z","createdDateTime":"2020-12-22T20:08:15Z","expirationDateTime":"2020-12-23T20:08:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '5b483584-22b3-4562-bd63-7db8e55d257c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/dfbcc149-c0a0-45e0-905d-373280fcdbe9')
  .query(true)
  .reply(200, {"jobId":"dfbcc149-c0a0-45e0-905d-373280fcdbe9","lastUpdateDateTime":"2020-12-22T20:08:15Z","createdDateTime":"2020-12-22T20:08:15Z","expirationDateTime":"2020-12-23T20:08:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'aceab873-d3fe-49fd-a273-624a5fe52a6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/dfbcc149-c0a0-45e0-905d-373280fcdbe9')
  .query(true)
  .reply(200, {"jobId":"dfbcc149-c0a0-45e0-905d-373280fcdbe9","lastUpdateDateTime":"2020-12-22T20:08:18Z","createdDateTime":"2020-12-22T20:08:15Z","expirationDateTime":"2020-12-23T20:08:15Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":17,"length":3,"text":"cat","category":"TreatmentName","confidenceScore":0.74,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0280589"},{"dataSource":"CHV","id":"0000027342"},{"dataSource":"NCI","id":"C10277"},{"dataSource":"PDQ","id":"CDR0000040974"}]},{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.99,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '1806000a-33b7-42ac-ad20-f4d34e42b7aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/dfbcc149-c0a0-45e0-905d-373280fcdbe9')
  .query(true)
  .reply(200, {"jobId":"dfbcc149-c0a0-45e0-905d-373280fcdbe9","lastUpdateDateTime":"2020-12-22T20:08:18Z","createdDateTime":"2020-12-22T20:08:15Z","expirationDateTime":"2020-12-23T20:08:15Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":17,"length":3,"text":"cat","category":"TreatmentName","confidenceScore":0.74,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0280589"},{"dataSource":"CHV","id":"0000027342"},{"dataSource":"NCI","id":"C10277"},{"dataSource":"PDQ","id":"CDR0000040974"}]},{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.99,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  '4013fcdd-50d9-481b-a597-41fcaaa0d726',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:19 GMT'
]);
