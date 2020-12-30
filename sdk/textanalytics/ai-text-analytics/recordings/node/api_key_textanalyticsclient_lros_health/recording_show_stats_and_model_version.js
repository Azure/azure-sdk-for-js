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
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/6f922b36-42b0-40b5-971b-e33d398cff1e',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '33071d44-4255-4136-98b9-a4b00df22eb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/6f922b36-42b0-40b5-971b-e33d398cff1e')
  .query(true)
  .reply(200, {"jobId":"6f922b36-42b0-40b5-971b-e33d398cff1e","lastUpdateDateTime":"2020-12-30T17:28:32Z","createdDateTime":"2020-12-30T17:28:32Z","expirationDateTime":"2020-12-31T17:28:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5b7af5c8-4f42-4013-8711-71a87248c944',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/6f922b36-42b0-40b5-971b-e33d398cff1e')
  .query(true)
  .reply(200, {"jobId":"6f922b36-42b0-40b5-971b-e33d398cff1e","lastUpdateDateTime":"2020-12-30T17:28:32Z","createdDateTime":"2020-12-30T17:28:32Z","expirationDateTime":"2020-12-31T17:28:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4faec184-18db-43fd-868f-462b80536b19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/6f922b36-42b0-40b5-971b-e33d398cff1e')
  .query(true)
  .reply(200, {"jobId":"6f922b36-42b0-40b5-971b-e33d398cff1e","lastUpdateDateTime":"2020-12-30T17:28:32Z","createdDateTime":"2020-12-30T17:28:32Z","expirationDateTime":"2020-12-31T17:28:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '824316c4-e6a8-425c-84a1-2ba2fdf2ddf1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/6f922b36-42b0-40b5-971b-e33d398cff1e')
  .query(true)
  .reply(200, {"jobId":"6f922b36-42b0-40b5-971b-e33d398cff1e","lastUpdateDateTime":"2020-12-30T17:28:36Z","createdDateTime":"2020-12-30T17:28:32Z","expirationDateTime":"2020-12-31T17:28:32Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '065febbe-b1ee-48b1-9c36-b73cdea31588',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:36 GMT'
]);
