let nock = require('nock');

module.exports.hash = "7e0246d6ba5acb88ac5c7802a06ec0b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/d0c84c10-b267-4d43-8bcb-af1c693abac5',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  'a97df7f2-b62e-41ab-83fa-e623117694ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/d0c84c10-b267-4d43-8bcb-af1c693abac5')
  .query(true)
  .reply(200, {"jobId":"d0c84c10-b267-4d43-8bcb-af1c693abac5","lastUpdateDateTime":"2020-11-20T00:13:29Z","createdDateTime":"2020-11-20T00:13:29Z","expirationDateTime":"2020-11-21T00:13:29Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '570b5be1-40b0-487a-b449-5330c77ad00b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/d0c84c10-b267-4d43-8bcb-af1c693abac5')
  .query(true)
  .reply(200, {"jobId":"d0c84c10-b267-4d43-8bcb-af1c693abac5","lastUpdateDateTime":"2020-11-20T00:13:29Z","createdDateTime":"2020-11-20T00:13:29Z","expirationDateTime":"2020-11-21T00:13:29Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '7c69ab4f-12bf-4dc1-8377-c767b5dbdef7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/d0c84c10-b267-4d43-8bcb-af1c693abac5')
  .query(true)
  .reply(200, {"jobId":"d0c84c10-b267-4d43-8bcb-af1c693abac5","lastUpdateDateTime":"2020-11-20T00:13:29Z","createdDateTime":"2020-11-20T00:13:29Z","expirationDateTime":"2020-11-21T00:13:29Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b148a895-8a47-452a-83a3-0fda400a00f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/d0c84c10-b267-4d43-8bcb-af1c693abac5')
  .query(true)
  .reply(200, {"jobId":"d0c84c10-b267-4d43-8bcb-af1c693abac5","lastUpdateDateTime":"2020-11-20T00:13:32Z","createdDateTime":"2020-11-20T00:13:29Z","expirationDateTime":"2020-11-21T00:13:29Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '17b8fcf0-c4e4-4ff7-9c82-8d6b491b9ab0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/d0c84c10-b267-4d43-8bcb-af1c693abac5')
  .query(true)
  .reply(200, {"jobId":"d0c84c10-b267-4d43-8bcb-af1c693abac5","lastUpdateDateTime":"2020-11-20T00:13:32Z","createdDateTime":"2020-11-20T00:13:29Z","expirationDateTime":"2020-11-21T00:13:29Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'a972f473-9c24-4bfb-b863-caef8e1cdfd4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:34 GMT'
]);
