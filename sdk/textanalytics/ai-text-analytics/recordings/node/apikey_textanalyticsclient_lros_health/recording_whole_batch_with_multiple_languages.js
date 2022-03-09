let nock = require('nock');

module.exports.hash = "98dc178ac1375fa26068fd73bbef6e47";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"1","text":"I should take my cat to the veterinarian."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/65ed680f-76ad-4828-a77e-2c6b3e80fd45',
  'x-envoy-upstream-service-time',
  '798',
  'apim-request-id',
  '502e4204-8591-4678-a40e-02d6554ca698',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/65ed680f-76ad-4828-a77e-2c6b3e80fd45')
  .query(true)
  .reply(200, {"jobId":"65ed680f-76ad-4828-a77e-2c6b3e80fd45","lastUpdateDateTime":"2021-10-23T00:42:52Z","createdDateTime":"2021-10-23T00:42:51Z","expirationDateTime":"2021-10-24T00:42:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '1b34f523-acee-4c21-8400-b313bb818c76',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/65ed680f-76ad-4828-a77e-2c6b3e80fd45')
  .query(true)
  .reply(200, {"jobId":"65ed680f-76ad-4828-a77e-2c6b3e80fd45","lastUpdateDateTime":"2021-10-23T00:42:52Z","createdDateTime":"2021-10-23T00:42:51Z","expirationDateTime":"2021-10-24T00:42:51Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '7b45b102-f39c-4379-aa47-9123e127cc64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/65ed680f-76ad-4828-a77e-2c6b3e80fd45')
  .query(true)
  .reply(200, {"jobId":"65ed680f-76ad-4828-a77e-2c6b3e80fd45","lastUpdateDateTime":"2021-10-23T00:42:53Z","createdDateTime":"2021-10-23T00:42:51Z","expirationDateTime":"2021-10-24T00:42:51Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.98}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  'f630cc81-1880-46c6-afe1-eafbae0bc08a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/65ed680f-76ad-4828-a77e-2c6b3e80fd45')
  .query(true)
  .reply(200, {"jobId":"65ed680f-76ad-4828-a77e-2c6b3e80fd45","lastUpdateDateTime":"2021-10-23T00:42:53Z","createdDateTime":"2021-10-23T00:42:51Z","expirationDateTime":"2021-10-24T00:42:51Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.98}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '31939960-9073-47ce-85f2-0e3fc931e7cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:54 GMT'
]);
