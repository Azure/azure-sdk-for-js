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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/279a53a4-484e-424c-89e1-5f09a97f631e',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '9ed0a5a9-b56c-4f3e-9426-57456bc78fc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/279a53a4-484e-424c-89e1-5f09a97f631e')
  .query(true)
  .reply(200, {"jobId":"279a53a4-484e-424c-89e1-5f09a97f631e","lastUpdateDateTime":"2021-03-04T20:18:34Z","createdDateTime":"2021-03-04T20:18:34Z","expirationDateTime":"2021-03-05T20:18:34Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '72450a22-ce1c-4a34-b4b5-4b840997cecc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/279a53a4-484e-424c-89e1-5f09a97f631e')
  .query(true)
  .reply(200, {"jobId":"279a53a4-484e-424c-89e1-5f09a97f631e","lastUpdateDateTime":"2021-03-04T20:18:34Z","createdDateTime":"2021-03-04T20:18:34Z","expirationDateTime":"2021-03-05T20:18:34Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6ff47b9a-1cd5-455f-a2a9-e80283028920',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/279a53a4-484e-424c-89e1-5f09a97f631e')
  .query(true)
  .reply(200, {"jobId":"279a53a4-484e-424c-89e1-5f09a97f631e","lastUpdateDateTime":"2021-03-04T20:18:35Z","createdDateTime":"2021-03-04T20:18:34Z","expirationDateTime":"2021-03-05T20:18:34Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '4a19b25a-c4af-4bb1-86b7-9df175561948',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/279a53a4-484e-424c-89e1-5f09a97f631e')
  .query(true)
  .reply(200, {"jobId":"279a53a4-484e-424c-89e1-5f09a97f631e","lastUpdateDateTime":"2021-03-04T20:18:35Z","createdDateTime":"2021-03-04T20:18:34Z","expirationDateTime":"2021-03-05T20:18:34Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'b8a407ec-3f38-4139-8fe2-9111a0cb1844',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:36 GMT'
]);
