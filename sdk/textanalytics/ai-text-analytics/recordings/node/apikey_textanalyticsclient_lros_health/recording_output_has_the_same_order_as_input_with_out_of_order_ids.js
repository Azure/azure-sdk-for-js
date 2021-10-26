let nock = require('nock');

module.exports.hash = "4234bf615139a007710624ac07ffab34";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/3499d49b-6523-4664-85b0-f1ab3103ce2d',
  'x-envoy-upstream-service-time',
  '243',
  'apim-request-id',
  '49cfda48-fb89-4ad4-a509-2ab470b24e7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3499d49b-6523-4664-85b0-f1ab3103ce2d')
  .query(true)
  .reply(200, {"jobId":"3499d49b-6523-4664-85b0-f1ab3103ce2d","lastUpdateDateTime":"2021-10-23T00:42:38Z","createdDateTime":"2021-10-23T00:42:38Z","expirationDateTime":"2021-10-24T00:42:38Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '772ff8a8-8aa8-4b20-95f6-9d0e9c33aaa8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3499d49b-6523-4664-85b0-f1ab3103ce2d')
  .query(true)
  .reply(200, {"jobId":"3499d49b-6523-4664-85b0-f1ab3103ce2d","lastUpdateDateTime":"2021-10-23T00:42:38Z","createdDateTime":"2021-10-23T00:42:38Z","expirationDateTime":"2021-10-24T00:42:38Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f2279368-305a-4e2e-8e70-3f81219fec28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3499d49b-6523-4664-85b0-f1ab3103ce2d')
  .query(true)
  .reply(200, {"jobId":"3499d49b-6523-4664-85b0-f1ab3103ce2d","lastUpdateDateTime":"2021-10-23T00:42:39Z","createdDateTime":"2021-10-23T00:42:38Z","expirationDateTime":"2021-10-24T00:42:38Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '102b07f1-2211-45ad-8cca-45f3de98c7dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3499d49b-6523-4664-85b0-f1ab3103ce2d')
  .query(true)
  .reply(200, {"jobId":"3499d49b-6523-4664-85b0-f1ab3103ce2d","lastUpdateDateTime":"2021-10-23T00:42:39Z","createdDateTime":"2021-10-23T00:42:38Z","expirationDateTime":"2021-10-24T00:42:38Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'b9e4cc70-64ab-4775-aee8-33f6a70fbdce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:40 GMT'
]);
