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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/b58e9ac5-45c5-4950-992f-c099a2ec3d74',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '646a54af-b60d-4e92-a6a3-266f17bca360',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b58e9ac5-45c5-4950-992f-c099a2ec3d74')
  .query(true)
  .reply(200, {"jobId":"b58e9ac5-45c5-4950-992f-c099a2ec3d74","lastUpdateDateTime":"2021-02-23T02:42:42Z","createdDateTime":"2021-02-23T02:42:42Z","expirationDateTime":"2021-02-24T02:42:42Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'd4c60dc4-3c26-4fd9-8896-a894d26e09ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b58e9ac5-45c5-4950-992f-c099a2ec3d74')
  .query(true)
  .reply(200, {"jobId":"b58e9ac5-45c5-4950-992f-c099a2ec3d74","lastUpdateDateTime":"2021-02-23T02:42:42Z","createdDateTime":"2021-02-23T02:42:42Z","expirationDateTime":"2021-02-24T02:42:42Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '60f9b912-159c-4455-9176-3d7d2cfe44e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b58e9ac5-45c5-4950-992f-c099a2ec3d74')
  .query(true)
  .reply(200, {"jobId":"b58e9ac5-45c5-4950-992f-c099a2ec3d74","lastUpdateDateTime":"2021-02-23T02:42:42Z","createdDateTime":"2021-02-23T02:42:42Z","expirationDateTime":"2021-02-24T02:42:42Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '81371fa6-713d-495b-95a1-169f20eda7fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b58e9ac5-45c5-4950-992f-c099a2ec3d74')
  .query(true)
  .reply(200, {"jobId":"b58e9ac5-45c5-4950-992f-c099a2ec3d74","lastUpdateDateTime":"2021-02-23T02:42:42Z","createdDateTime":"2021-02-23T02:42:42Z","expirationDateTime":"2021-02-24T02:42:42Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2096f094-2113-4734-8dfa-ec4bdaf2ab74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b58e9ac5-45c5-4950-992f-c099a2ec3d74')
  .query(true)
  .reply(200, {"jobId":"b58e9ac5-45c5-4950-992f-c099a2ec3d74","lastUpdateDateTime":"2021-02-23T02:42:46Z","createdDateTime":"2021-02-23T02:42:42Z","expirationDateTime":"2021-02-24T02:42:42Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '38eb9f6a-4a2b-4512-8486-40d9767ab525',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b58e9ac5-45c5-4950-992f-c099a2ec3d74')
  .query(true)
  .reply(200, {"jobId":"b58e9ac5-45c5-4950-992f-c099a2ec3d74","lastUpdateDateTime":"2021-02-23T02:42:46Z","createdDateTime":"2021-02-23T02:42:42Z","expirationDateTime":"2021-02-24T02:42:42Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '7daef753-1aa9-4cc5-aa04-d4cfe36b4cd3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:48 GMT'
]);
