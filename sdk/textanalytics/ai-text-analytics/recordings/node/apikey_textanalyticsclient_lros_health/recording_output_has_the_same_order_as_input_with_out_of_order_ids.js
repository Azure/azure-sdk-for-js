let nock = require('nock');

module.exports.hash = "f8ca12f876e21d3f7de101188f121177";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/c53d89db-1718-4d5a-83b8-dce00391a746',
  'x-envoy-upstream-service-time',
  '249',
  'apim-request-id',
  '2e120700-3649-416a-bcf2-c18b165216fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:18 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/c53d89db-1718-4d5a-83b8-dce00391a746')
  .query(true)
  .reply(200, {"jobId":"c53d89db-1718-4d5a-83b8-dce00391a746","lastUpdateDateTime":"2021-08-03T03:16:18Z","createdDateTime":"2021-08-03T03:16:18Z","expirationDateTime":"2021-08-04T03:16:18Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bbb527d6-5e01-45cb-8474-eb8caffdc9c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:18 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/c53d89db-1718-4d5a-83b8-dce00391a746')
  .query(true)
  .reply(200, {"jobId":"c53d89db-1718-4d5a-83b8-dce00391a746","lastUpdateDateTime":"2021-08-03T03:16:18Z","createdDateTime":"2021-08-03T03:16:18Z","expirationDateTime":"2021-08-04T03:16:18Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9bf500a7-948a-49ee-869c-4ef3cc9dee10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:18 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/c53d89db-1718-4d5a-83b8-dce00391a746')
  .query(true)
  .reply(200, {"jobId":"c53d89db-1718-4d5a-83b8-dce00391a746","lastUpdateDateTime":"2021-08-03T03:16:18Z","createdDateTime":"2021-08-03T03:16:18Z","expirationDateTime":"2021-08-04T03:16:18Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e8702b62-5112-4098-926d-17cb89249496',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:20 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/c53d89db-1718-4d5a-83b8-dce00391a746')
  .query(true)
  .reply(200, {"jobId":"c53d89db-1718-4d5a-83b8-dce00391a746","lastUpdateDateTime":"2021-08-03T03:16:22Z","createdDateTime":"2021-08-03T03:16:18Z","expirationDateTime":"2021-08-04T03:16:18Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  'b2e050f6-9c0a-49c8-9293-02f01da778c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:22 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/c53d89db-1718-4d5a-83b8-dce00391a746')
  .query(true)
  .reply(200, {"jobId":"c53d89db-1718-4d5a-83b8-dce00391a746","lastUpdateDateTime":"2021-08-03T03:16:22Z","createdDateTime":"2021-08-03T03:16:18Z","expirationDateTime":"2021-08-04T03:16:18Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  'e95e977f-1b04-43e8-9733-406864a630b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:22 GMT'
]);
