let nock = require('nock');

module.exports.hash = "0e70f96b1e4ef4786849ff26599336e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/34b0732c-2583-4702-9e35-55ba7bbbc70b',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  '64564237-04fa-4c3d-9802-f87bdc776e44',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/34b0732c-2583-4702-9e35-55ba7bbbc70b')
  .query(true)
  .reply(200, {"jobId":"34b0732c-2583-4702-9e35-55ba7bbbc70b","lastUpdateDateTime":"2021-06-25T19:56:29Z","createdDateTime":"2021-06-25T19:56:29Z","expirationDateTime":"2021-06-26T19:56:29Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '08ef14bf-3c6a-4c00-84ee-0a815dea13bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/34b0732c-2583-4702-9e35-55ba7bbbc70b')
  .query(true)
  .reply(200, {"jobId":"34b0732c-2583-4702-9e35-55ba7bbbc70b","lastUpdateDateTime":"2021-06-25T19:56:29Z","createdDateTime":"2021-06-25T19:56:29Z","expirationDateTime":"2021-06-26T19:56:29Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2f2eb403-c166-41ec-afa0-9d63d4422db4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/34b0732c-2583-4702-9e35-55ba7bbbc70b')
  .query(true)
  .reply(200, {"jobId":"34b0732c-2583-4702-9e35-55ba7bbbc70b","lastUpdateDateTime":"2021-06-25T19:56:31Z","createdDateTime":"2021-06-25T19:56:29Z","expirationDateTime":"2021-06-26T19:56:29Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '8f0f3628-f76e-4e5d-a773-0be32f77ce79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/34b0732c-2583-4702-9e35-55ba7bbbc70b')
  .query(true)
  .reply(200, {"jobId":"34b0732c-2583-4702-9e35-55ba7bbbc70b","lastUpdateDateTime":"2021-06-25T19:56:31Z","createdDateTime":"2021-06-25T19:56:29Z","expirationDateTime":"2021-06-26T19:56:29Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'e9fe1a73-9dc9-4b8a-8165-55e7808f235f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:31 GMT'
]);
