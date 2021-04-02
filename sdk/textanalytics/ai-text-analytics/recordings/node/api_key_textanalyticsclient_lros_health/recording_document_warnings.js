let nock = require('nock');

module.exports.hash = "7023a97b5122e497be844a46fb68fd25";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/ef23cc73-3426-4c93-867c-0391ca1edbcb',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  'fcdad614-8378-4641-a0c3-962aefd5748c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/ef23cc73-3426-4c93-867c-0391ca1edbcb')
  .query(true)
  .reply(200, {"jobId":"ef23cc73-3426-4c93-867c-0391ca1edbcb","lastUpdateDateTime":"2020-12-22T20:07:26Z","createdDateTime":"2020-12-22T20:07:26Z","expirationDateTime":"2020-12-23T20:07:26Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '03bc9ee9-5457-4c2a-8d70-e6321dde8e36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/ef23cc73-3426-4c93-867c-0391ca1edbcb')
  .query(true)
  .reply(200, {"jobId":"ef23cc73-3426-4c93-867c-0391ca1edbcb","lastUpdateDateTime":"2020-12-22T20:07:26Z","createdDateTime":"2020-12-22T20:07:26Z","expirationDateTime":"2020-12-23T20:07:26Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '063d9b2d-e6c3-424e-bd96-f90f36f92960',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/ef23cc73-3426-4c93-867c-0391ca1edbcb')
  .query(true)
  .reply(200, {"jobId":"ef23cc73-3426-4c93-867c-0391ca1edbcb","lastUpdateDateTime":"2020-12-22T20:07:28Z","createdDateTime":"2020-12-22T20:07:26Z","expirationDateTime":"2020-12-23T20:07:26Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'bb788bcd-059c-4fe8-91f0-2ad226f7ec7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/ef23cc73-3426-4c93-867c-0391ca1edbcb')
  .query(true)
  .reply(200, {"jobId":"ef23cc73-3426-4c93-867c-0391ca1edbcb","lastUpdateDateTime":"2020-12-22T20:07:28Z","createdDateTime":"2020-12-22T20:07:26Z","expirationDateTime":"2020-12-23T20:07:26Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '50442918-3204-476a-86bf-8310a456e025',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:28 GMT'
]);
