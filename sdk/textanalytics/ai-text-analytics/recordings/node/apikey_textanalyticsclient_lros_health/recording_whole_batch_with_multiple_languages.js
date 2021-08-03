let nock = require('nock');

module.exports.hash = "475873b6384b961b148934bfd317912c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"I should take my cat to the veterinarian."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/2b5f6da1-2090-4281-bdd0-6792cac81d8b',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  '505e672c-516a-4094-bab8-e2f8e2378abb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/2b5f6da1-2090-4281-bdd0-6792cac81d8b')
  .query(true)
  .reply(200, {"jobId":"2b5f6da1-2090-4281-bdd0-6792cac81d8b","lastUpdateDateTime":"2021-06-25T19:56:45Z","createdDateTime":"2021-06-25T19:56:45Z","expirationDateTime":"2021-06-26T19:56:45Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c973ddc9-734b-43ee-830a-9bb13b84cc37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/2b5f6da1-2090-4281-bdd0-6792cac81d8b')
  .query(true)
  .reply(200, {"jobId":"2b5f6da1-2090-4281-bdd0-6792cac81d8b","lastUpdateDateTime":"2021-06-25T19:56:45Z","createdDateTime":"2021-06-25T19:56:45Z","expirationDateTime":"2021-06-26T19:56:45Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7195993c-9f79-4923-a7cb-85421ebc2280',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/2b5f6da1-2090-4281-bdd0-6792cac81d8b')
  .query(true)
  .reply(200, {"jobId":"2b5f6da1-2090-4281-bdd0-6792cac81d8b","lastUpdateDateTime":"2021-06-25T19:56:46Z","createdDateTime":"2021-06-25T19:56:45Z","expirationDateTime":"2021-06-26T19:56:45Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.98}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'cf605c5b-4467-4198-be5e-8ae7757dba64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/2b5f6da1-2090-4281-bdd0-6792cac81d8b')
  .query(true)
  .reply(200, {"jobId":"2b5f6da1-2090-4281-bdd0-6792cac81d8b","lastUpdateDateTime":"2021-06-25T19:56:46Z","createdDateTime":"2021-06-25T19:56:45Z","expirationDateTime":"2021-06-26T19:56:45Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.98}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '642b1379-15cb-432c-a231-8d9387f41b6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:47 GMT'
]);
