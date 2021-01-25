let nock = require('nock');

module.exports.hash = "872f745b2bc3a3cc96feb56351e993e2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"I should take my cat to the veterinarian."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/6d6a863e-501c-480f-b109-279ebc8d6d28',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '16cac6bc-6f24-4d18-a277-d5634a84aa80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/6d6a863e-501c-480f-b109-279ebc8d6d28')
  .query(true)
  .reply(200, {"jobId":"6d6a863e-501c-480f-b109-279ebc8d6d28","lastUpdateDateTime":"2020-11-20T00:13:26Z","createdDateTime":"2020-11-20T00:13:26Z","expirationDateTime":"2020-11-21T00:13:26Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '62b49086-f2c1-4d7c-be8b-8a46f3a45b45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/6d6a863e-501c-480f-b109-279ebc8d6d28')
  .query(true)
  .reply(200, {"jobId":"6d6a863e-501c-480f-b109-279ebc8d6d28","lastUpdateDateTime":"2020-11-20T00:13:27Z","createdDateTime":"2020-11-20T00:13:26Z","expirationDateTime":"2020-11-21T00:13:26Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '72f0a072-7e16-483b-9b13-66a650ba3440',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/6d6a863e-501c-480f-b109-279ebc8d6d28')
  .query(true)
  .reply(200, {"jobId":"6d6a863e-501c-480f-b109-279ebc8d6d28","lastUpdateDateTime":"2020-11-20T00:13:27Z","createdDateTime":"2020-11-20T00:13:26Z","expirationDateTime":"2020-11-21T00:13:26Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":17,"length":3,"text":"cat","category":"TreatmentName","confidenceScore":0.74,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0280589"},{"dataSource":"CHV","id":"0000027342"},{"dataSource":"NCI","id":"C10277"},{"dataSource":"PDQ","id":"CDR0000040974"}]},{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.99,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '558a74d7-b32e-4ad7-914d-7e04978059e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/6d6a863e-501c-480f-b109-279ebc8d6d28')
  .query(true)
  .reply(200, {"jobId":"6d6a863e-501c-480f-b109-279ebc8d6d28","lastUpdateDateTime":"2020-11-20T00:13:27Z","createdDateTime":"2020-11-20T00:13:26Z","expirationDateTime":"2020-11-21T00:13:26Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":17,"length":3,"text":"cat","category":"TreatmentName","confidenceScore":0.74,"isNegated":false,"links":[{"dataSource":"UMLS","id":"C0280589"},{"dataSource":"CHV","id":"0000027342"},{"dataSource":"NCI","id":"C10277"},{"dataSource":"PDQ","id":"CDR0000040974"}]},{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.99,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'efcd1e3f-6bf3-44b8-8b6a-92c0333b9ead',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:28 GMT'
]);
