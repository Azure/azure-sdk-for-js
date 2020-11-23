let nock = require('nock');

module.exports.hash = "cffa65676522d9a15f5effdfbb404278";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/a8685f2e-a1a4-4465-9304-ba6d5b73f406',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  'ea959710-3f9e-416f-93bb-ecc13951f2f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a8685f2e-a1a4-4465-9304-ba6d5b73f406')
  .query(true)
  .reply(200, {"jobId":"a8685f2e-a1a4-4465-9304-ba6d5b73f406","lastUpdateDateTime":"2020-11-20T00:13:15Z","createdDateTime":"2020-11-20T00:13:15Z","expirationDateTime":"2020-11-21T00:13:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c2446918-7646-46ba-90e0-10759831ee77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a8685f2e-a1a4-4465-9304-ba6d5b73f406')
  .query(true)
  .reply(200, {"jobId":"a8685f2e-a1a4-4465-9304-ba6d5b73f406","lastUpdateDateTime":"2020-11-20T00:13:15Z","createdDateTime":"2020-11-20T00:13:15Z","expirationDateTime":"2020-11-21T00:13:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '583d47db-f494-43de-bcd5-7ba218235793',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a8685f2e-a1a4-4465-9304-ba6d5b73f406')
  .query(true)
  .reply(200, {"jobId":"a8685f2e-a1a4-4465-9304-ba6d5b73f406","lastUpdateDateTime":"2020-11-20T00:13:17Z","createdDateTime":"2020-11-20T00:13:15Z","expirationDateTime":"2020-11-21T00:13:15Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '20c3e661-58cf-4f7f-ad06-d7eaea3fd317',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:17 GMT'
]);
