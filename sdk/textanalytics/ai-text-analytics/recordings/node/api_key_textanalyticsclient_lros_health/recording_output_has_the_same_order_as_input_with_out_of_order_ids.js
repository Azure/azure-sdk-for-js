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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/b960f101-7640-427c-943f-c6d15e545077',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '379d96ff-c479-40fc-8c56-b7c5204e6ba1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b960f101-7640-427c-943f-c6d15e545077')
  .query(true)
  .reply(200, {"jobId":"b960f101-7640-427c-943f-c6d15e545077","lastUpdateDateTime":"2021-02-23T02:42:17Z","createdDateTime":"2021-02-23T02:42:17Z","expirationDateTime":"2021-02-24T02:42:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '5b745aeb-6d78-4c29-b2f7-dd59547360d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b960f101-7640-427c-943f-c6d15e545077')
  .query(true)
  .reply(200, {"jobId":"b960f101-7640-427c-943f-c6d15e545077","lastUpdateDateTime":"2021-02-23T02:42:17Z","createdDateTime":"2021-02-23T02:42:17Z","expirationDateTime":"2021-02-24T02:42:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '1d910a73-1d17-4016-8f53-02840ceff24e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b960f101-7640-427c-943f-c6d15e545077')
  .query(true)
  .reply(200, {"jobId":"b960f101-7640-427c-943f-c6d15e545077","lastUpdateDateTime":"2021-02-23T02:42:17Z","createdDateTime":"2021-02-23T02:42:17Z","expirationDateTime":"2021-02-24T02:42:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '0d41d43e-96cf-4ed1-85a8-5d2d6c8d131a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b960f101-7640-427c-943f-c6d15e545077')
  .query(true)
  .reply(200, {"jobId":"b960f101-7640-427c-943f-c6d15e545077","lastUpdateDateTime":"2021-02-23T02:42:21Z","createdDateTime":"2021-02-23T02:42:17Z","expirationDateTime":"2021-02-24T02:42:17Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'bd084f36-a506-4151-8062-20e6cabebf45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b960f101-7640-427c-943f-c6d15e545077')
  .query(true)
  .reply(200, {"jobId":"b960f101-7640-427c-943f-c6d15e545077","lastUpdateDateTime":"2021-02-23T02:42:21Z","createdDateTime":"2021-02-23T02:42:17Z","expirationDateTime":"2021-02-24T02:42:17Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'c23fe929-5a42-4b8e-956b-39c4fab7a79b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:21 GMT'
]);
