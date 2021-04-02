let nock = require('nock');

module.exports.hash = "1a43a63a556d45de656692cceda73c4f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/f33f31a6-52cc-4efd-b43e-50b2573ae122',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  'c786b786-0db5-40ab-bf8d-e2d5bd227ae2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f33f31a6-52cc-4efd-b43e-50b2573ae122')
  .query(true)
  .reply(200, {"jobId":"f33f31a6-52cc-4efd-b43e-50b2573ae122","lastUpdateDateTime":"2020-12-22T20:07:40Z","createdDateTime":"2020-12-22T20:07:40Z","expirationDateTime":"2020-12-23T20:07:40Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'd6d83f21-37b9-4521-be2f-0fea7032342f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f33f31a6-52cc-4efd-b43e-50b2573ae122')
  .query(true)
  .reply(200, {"jobId":"f33f31a6-52cc-4efd-b43e-50b2573ae122","lastUpdateDateTime":"2020-12-22T20:07:40Z","createdDateTime":"2020-12-22T20:07:40Z","expirationDateTime":"2020-12-23T20:07:40Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '51d81f81-476c-4a13-9416-4d7ba40f1a0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f33f31a6-52cc-4efd-b43e-50b2573ae122')
  .query(true)
  .reply(200, {"jobId":"f33f31a6-52cc-4efd-b43e-50b2573ae122","lastUpdateDateTime":"2020-12-22T20:07:40Z","createdDateTime":"2020-12-22T20:07:40Z","expirationDateTime":"2020-12-23T20:07:40Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '39f92585-1eeb-4c9c-9d01-d022c547bc64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/f33f31a6-52cc-4efd-b43e-50b2573ae122')
  .query(true)
  .reply(200, {"jobId":"f33f31a6-52cc-4efd-b43e-50b2573ae122","lastUpdateDateTime":"2020-12-22T20:07:43Z","createdDateTime":"2020-12-22T20:07:40Z","expirationDateTime":"2020-12-23T20:07:40Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '13ca2f3e-e260-42cd-aec7-7ee92e544b9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:44 GMT'
]);
