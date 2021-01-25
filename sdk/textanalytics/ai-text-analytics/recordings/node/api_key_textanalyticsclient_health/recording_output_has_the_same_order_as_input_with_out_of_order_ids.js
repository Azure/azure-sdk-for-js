let nock = require('nock');

module.exports.hash = "79ffad72cae3f38bf89c94425918744d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/f51c4f70-2c49-4d09-b0b7-e3fcb508c4fb',
  'x-envoy-upstream-service-time',
  '733',
  'apim-request-id',
  '3f788037-de9a-4a23-ae48-50d0c17f8294',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f51c4f70-2c49-4d09-b0b7-e3fcb508c4fb')
  .query(true)
  .reply(200, {"jobId":"f51c4f70-2c49-4d09-b0b7-e3fcb508c4fb","lastUpdateDateTime":"2020-11-20T00:13:12Z","createdDateTime":"2020-11-20T00:13:11Z","expirationDateTime":"2020-11-21T00:13:11Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '74923aec-c6da-41c0-98ec-03538bbdde6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f51c4f70-2c49-4d09-b0b7-e3fcb508c4fb')
  .query(true)
  .reply(200, {"jobId":"f51c4f70-2c49-4d09-b0b7-e3fcb508c4fb","lastUpdateDateTime":"2020-11-20T00:13:12Z","createdDateTime":"2020-11-20T00:13:11Z","expirationDateTime":"2020-11-21T00:13:11Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '94633930-2ead-44f5-bf5a-257cce914ae1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f51c4f70-2c49-4d09-b0b7-e3fcb508c4fb')
  .query(true)
  .reply(200, {"jobId":"f51c4f70-2c49-4d09-b0b7-e3fcb508c4fb","lastUpdateDateTime":"2020-11-20T00:13:13Z","createdDateTime":"2020-11-20T00:13:11Z","expirationDateTime":"2020-11-21T00:13:11Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '8f2f4d89-d73f-4c97-9f58-b1f4e35cf8e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f51c4f70-2c49-4d09-b0b7-e3fcb508c4fb')
  .query(true)
  .reply(200, {"jobId":"f51c4f70-2c49-4d09-b0b7-e3fcb508c4fb","lastUpdateDateTime":"2020-11-20T00:13:13Z","createdDateTime":"2020-11-20T00:13:11Z","expirationDateTime":"2020-11-21T00:13:11Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '0719def2-a092-4e40-a7c3-9d4253efde51',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:14 GMT'
]);
