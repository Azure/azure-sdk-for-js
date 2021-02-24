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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/0d951d04-0e4c-4382-b2a2-45f6b5cd58e3',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  'ec759410-fc86-47b0-9adc-9d3fadb6804c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/0d951d04-0e4c-4382-b2a2-45f6b5cd58e3')
  .query(true)
  .reply(200, {"jobId":"0d951d04-0e4c-4382-b2a2-45f6b5cd58e3","lastUpdateDateTime":"2021-02-23T19:35:28Z","createdDateTime":"2021-02-23T19:35:28Z","expirationDateTime":"2021-02-24T19:35:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a8586827-1297-4492-874f-8717bf3b5745',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/0d951d04-0e4c-4382-b2a2-45f6b5cd58e3')
  .query(true)
  .reply(200, {"jobId":"0d951d04-0e4c-4382-b2a2-45f6b5cd58e3","lastUpdateDateTime":"2021-02-23T19:35:28Z","createdDateTime":"2021-02-23T19:35:28Z","expirationDateTime":"2021-02-24T19:35:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'd0d79547-143c-407b-913b-6e4ce115c066',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/0d951d04-0e4c-4382-b2a2-45f6b5cd58e3')
  .query(true)
  .reply(200, {"jobId":"0d951d04-0e4c-4382-b2a2-45f6b5cd58e3","lastUpdateDateTime":"2021-02-23T19:35:28Z","createdDateTime":"2021-02-23T19:35:28Z","expirationDateTime":"2021-02-24T19:35:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '49adbcc3-ecee-483e-8255-c7e7b0afe644',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/0d951d04-0e4c-4382-b2a2-45f6b5cd58e3')
  .query(true)
  .reply(200, {"jobId":"0d951d04-0e4c-4382-b2a2-45f6b5cd58e3","lastUpdateDateTime":"2021-02-23T19:35:31Z","createdDateTime":"2021-02-23T19:35:28Z","expirationDateTime":"2021-02-24T19:35:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'e74d5fcd-f1fa-4539-b144-760664bcc1cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/0d951d04-0e4c-4382-b2a2-45f6b5cd58e3')
  .query(true)
  .reply(200, {"jobId":"0d951d04-0e4c-4382-b2a2-45f6b5cd58e3","lastUpdateDateTime":"2021-02-23T19:35:31Z","createdDateTime":"2021-02-23T19:35:28Z","expirationDateTime":"2021-02-24T19:35:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '625cd6b2-0de2-45eb-9354-62bbfb18d033',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:32 GMT'
]);
