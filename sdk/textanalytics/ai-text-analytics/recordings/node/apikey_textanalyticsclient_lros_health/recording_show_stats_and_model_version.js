let nock = require('nock');

module.exports.hash = "1e575b94347ebbe18d25ab65a2be1654";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/979a5edf-2c09-46dd-a2fc-e98bdfba1426',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  'aad2f040-72f1-4b12-9a03-3c0eec18dc01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:23 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/979a5edf-2c09-46dd-a2fc-e98bdfba1426')
  .query(true)
  .reply(200, {"jobId":"979a5edf-2c09-46dd-a2fc-e98bdfba1426","lastUpdateDateTime":"2021-08-03T03:16:23Z","createdDateTime":"2021-08-03T03:16:23Z","expirationDateTime":"2021-08-04T03:16:23Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'afea365d-971d-4fde-88f4-37f49ee3f4cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:23 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/979a5edf-2c09-46dd-a2fc-e98bdfba1426')
  .query(true)
  .reply(200, {"jobId":"979a5edf-2c09-46dd-a2fc-e98bdfba1426","lastUpdateDateTime":"2021-08-03T03:16:23Z","createdDateTime":"2021-08-03T03:16:23Z","expirationDateTime":"2021-08-04T03:16:23Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '231510b5-c8f7-4dc3-a702-2b047f7b7d8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:23 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/979a5edf-2c09-46dd-a2fc-e98bdfba1426')
  .query(true)
  .reply(200, {"jobId":"979a5edf-2c09-46dd-a2fc-e98bdfba1426","lastUpdateDateTime":"2021-08-03T03:16:23Z","createdDateTime":"2021-08-03T03:16:23Z","expirationDateTime":"2021-08-04T03:16:23Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e52645e2-015e-4d03-9a68-220199171d2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:25 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/979a5edf-2c09-46dd-a2fc-e98bdfba1426')
  .query(true)
  .reply(200, {"jobId":"979a5edf-2c09-46dd-a2fc-e98bdfba1426","lastUpdateDateTime":"2021-08-03T03:16:27Z","createdDateTime":"2021-08-03T03:16:23Z","expirationDateTime":"2021-08-04T03:16:23Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '7d0990c5-3b23-4d55-93bb-e59faef3041a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:27 GMT'
]);
