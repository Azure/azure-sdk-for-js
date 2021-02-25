let nock = require('nock');

module.exports.hash = "29d09cad09699f8d65a8066b64223a17";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/5a17841c-bf28-47cf-a95a-541d288bf629',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '85be2478-6287-4c9c-abac-23b2dae1bb7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5a17841c-bf28-47cf-a95a-541d288bf629')
  .query(true)
  .reply(200, {"jobId":"5a17841c-bf28-47cf-a95a-541d288bf629","lastUpdateDateTime":"2021-02-23T19:35:03Z","createdDateTime":"2021-02-23T19:35:03Z","expirationDateTime":"2021-02-24T19:35:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '53242b0a-3963-4b9b-a667-af018c9e907f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5a17841c-bf28-47cf-a95a-541d288bf629')
  .query(true)
  .reply(200, {"jobId":"5a17841c-bf28-47cf-a95a-541d288bf629","lastUpdateDateTime":"2021-02-23T19:35:03Z","createdDateTime":"2021-02-23T19:35:03Z","expirationDateTime":"2021-02-24T19:35:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'a1f307ba-401c-40f1-8728-dcb63bba77e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5a17841c-bf28-47cf-a95a-541d288bf629')
  .query(true)
  .reply(200, {"jobId":"5a17841c-bf28-47cf-a95a-541d288bf629","lastUpdateDateTime":"2021-02-23T19:35:03Z","createdDateTime":"2021-02-23T19:35:03Z","expirationDateTime":"2021-02-24T19:35:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '0bd6eb87-b567-40c8-ac2e-770670d3c81a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5a17841c-bf28-47cf-a95a-541d288bf629')
  .query(true)
  .reply(200, {"jobId":"5a17841c-bf28-47cf-a95a-541d288bf629","lastUpdateDateTime":"2021-02-23T19:35:06Z","createdDateTime":"2021-02-23T19:35:03Z","expirationDateTime":"2021-02-24T19:35:03Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '70f558f1-4b5d-4b63-8e47-01f8f66ab5f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5a17841c-bf28-47cf-a95a-541d288bf629')
  .query(true)
  .reply(200, {"jobId":"5a17841c-bf28-47cf-a95a-541d288bf629","lastUpdateDateTime":"2021-02-23T19:35:06Z","createdDateTime":"2021-02-23T19:35:03Z","expirationDateTime":"2021-02-24T19:35:03Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  'b3ea3347-694e-4404-bab2-cf8c1b82d166',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:07 GMT'
]);
