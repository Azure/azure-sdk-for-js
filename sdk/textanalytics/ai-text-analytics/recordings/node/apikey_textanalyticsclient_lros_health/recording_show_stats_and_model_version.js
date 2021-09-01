let nock = require('nock');

module.exports.hash = "1e575b94347ebbe18d25ab65a2be1654";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/033b92a9-fb02-47f2-a9d7-7765b8054262',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  '4ccb19d2-c241-4136-9978-ed27586b5885',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/033b92a9-fb02-47f2-a9d7-7765b8054262')
  .query(true)
  .reply(200, {"jobId":"033b92a9-fb02-47f2-a9d7-7765b8054262","lastUpdateDateTime":"2021-08-03T22:43:22Z","createdDateTime":"2021-08-03T22:43:22Z","expirationDateTime":"2021-08-04T22:43:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '616afc0a-3267-4c89-9076-a7e72fac20f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/033b92a9-fb02-47f2-a9d7-7765b8054262')
  .query(true)
  .reply(200, {"jobId":"033b92a9-fb02-47f2-a9d7-7765b8054262","lastUpdateDateTime":"2021-08-03T22:43:22Z","createdDateTime":"2021-08-03T22:43:22Z","expirationDateTime":"2021-08-04T22:43:22Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '40eb07dc-cda5-4ee4-b38f-336db63a22ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/033b92a9-fb02-47f2-a9d7-7765b8054262')
  .query(true)
  .reply(200, {"jobId":"033b92a9-fb02-47f2-a9d7-7765b8054262","lastUpdateDateTime":"2021-08-03T22:43:22Z","createdDateTime":"2021-08-03T22:43:22Z","expirationDateTime":"2021-08-04T22:43:22Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  'c0d16bec-3b5c-4a7b-b7aa-337d337a3b7b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:24 GMT'
]);
