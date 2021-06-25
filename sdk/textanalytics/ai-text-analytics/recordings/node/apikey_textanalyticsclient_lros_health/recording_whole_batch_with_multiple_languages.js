let nock = require('nock');

module.exports.hash = "475873b6384b961b148934bfd317912c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"I should take my cat to the veterinarian."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/b15d1673-f268-4afc-9590-f7af8924da2b',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  '8c1ca1f3-2103-4d5d-894c-4c97fea40b38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b15d1673-f268-4afc-9590-f7af8924da2b')
  .query(true)
  .reply(200, {"jobId":"b15d1673-f268-4afc-9590-f7af8924da2b","lastUpdateDateTime":"2021-06-25T05:11:12Z","createdDateTime":"2021-06-25T05:11:12Z","expirationDateTime":"2021-06-26T05:11:12Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '9519d1fe-5cf6-4e68-afeb-3c94ce981a62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b15d1673-f268-4afc-9590-f7af8924da2b')
  .query(true)
  .reply(200, {"jobId":"b15d1673-f268-4afc-9590-f7af8924da2b","lastUpdateDateTime":"2021-06-25T05:11:12Z","createdDateTime":"2021-06-25T05:11:12Z","expirationDateTime":"2021-06-26T05:11:12Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '09ced217-5ee2-403e-a4c6-2b0e14644c39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b15d1673-f268-4afc-9590-f7af8924da2b')
  .query(true)
  .reply(200, {"jobId":"b15d1673-f268-4afc-9590-f7af8924da2b","lastUpdateDateTime":"2021-06-25T05:11:14Z","createdDateTime":"2021-06-25T05:11:12Z","expirationDateTime":"2021-06-26T05:11:12Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.98}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '856c5cc8-a18d-4b16-9187-f0cb4eb8568a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b15d1673-f268-4afc-9590-f7af8924da2b')
  .query(true)
  .reply(200, {"jobId":"b15d1673-f268-4afc-9590-f7af8924da2b","lastUpdateDateTime":"2021-06-25T05:11:14Z","createdDateTime":"2021-06-25T05:11:12Z","expirationDateTime":"2021-06-26T05:11:12Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.98}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '044f6926-849b-45f7-9aef-1dcf1dbdffb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:14 GMT'
]);
