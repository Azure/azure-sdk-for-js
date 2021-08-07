let nock = require('nock');

module.exports.hash = "f8ca12f876e21d3f7de101188f121177";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/dd3a6501-f68f-41f6-a27c-579ec9bf3fcc',
  'x-envoy-upstream-service-time',
  '240',
  'apim-request-id',
  '9d4a15d7-2f00-40c7-a918-a614fe2939bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/dd3a6501-f68f-41f6-a27c-579ec9bf3fcc')
  .query(true)
  .reply(200, {"jobId":"dd3a6501-f68f-41f6-a27c-579ec9bf3fcc","lastUpdateDateTime":"2021-08-03T22:43:19Z","createdDateTime":"2021-08-03T22:43:19Z","expirationDateTime":"2021-08-04T22:43:19Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '50857952-4653-438c-ae8d-ee27c1ca5d8c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/dd3a6501-f68f-41f6-a27c-579ec9bf3fcc')
  .query(true)
  .reply(200, {"jobId":"dd3a6501-f68f-41f6-a27c-579ec9bf3fcc","lastUpdateDateTime":"2021-08-03T22:43:19Z","createdDateTime":"2021-08-03T22:43:19Z","expirationDateTime":"2021-08-04T22:43:19Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a544f3e4-12dc-4943-bb43-a5a20e9d262a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/dd3a6501-f68f-41f6-a27c-579ec9bf3fcc')
  .query(true)
  .reply(200, {"jobId":"dd3a6501-f68f-41f6-a27c-579ec9bf3fcc","lastUpdateDateTime":"2021-08-03T22:43:20Z","createdDateTime":"2021-08-03T22:43:19Z","expirationDateTime":"2021-08-04T22:43:19Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '804a6766-ab34-4237-a2c0-b0910279f606',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/dd3a6501-f68f-41f6-a27c-579ec9bf3fcc')
  .query(true)
  .reply(200, {"jobId":"dd3a6501-f68f-41f6-a27c-579ec9bf3fcc","lastUpdateDateTime":"2021-08-03T22:43:20Z","createdDateTime":"2021-08-03T22:43:19Z","expirationDateTime":"2021-08-04T22:43:19Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '74a8faa8-3f40-4e7b-b583-c8ff3451ff50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:21 GMT'
]);
