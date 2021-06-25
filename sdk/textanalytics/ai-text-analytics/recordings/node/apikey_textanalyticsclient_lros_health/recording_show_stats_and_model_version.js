let nock = require('nock');

module.exports.hash = "1e575b94347ebbe18d25ab65a2be1654";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/d6ca09a8-07bd-4b00-973f-74b8a8030f15',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '29585bed-d866-489f-82bd-43dc592a54c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d6ca09a8-07bd-4b00-973f-74b8a8030f15')
  .query(true)
  .reply(200, {"jobId":"d6ca09a8-07bd-4b00-973f-74b8a8030f15","lastUpdateDateTime":"2021-06-25T05:10:45Z","createdDateTime":"2021-06-25T05:10:45Z","expirationDateTime":"2021-06-26T05:10:45Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a92c5223-34fd-4c28-b903-083f3571a5a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d6ca09a8-07bd-4b00-973f-74b8a8030f15')
  .query(true)
  .reply(200, {"jobId":"d6ca09a8-07bd-4b00-973f-74b8a8030f15","lastUpdateDateTime":"2021-06-25T05:10:45Z","createdDateTime":"2021-06-25T05:10:45Z","expirationDateTime":"2021-06-26T05:10:45Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '96d141d4-c901-48ad-a698-cf3d450437ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d6ca09a8-07bd-4b00-973f-74b8a8030f15')
  .query(true)
  .reply(200, {"jobId":"d6ca09a8-07bd-4b00-973f-74b8a8030f15","lastUpdateDateTime":"2021-06-25T05:10:45Z","createdDateTime":"2021-06-25T05:10:45Z","expirationDateTime":"2021-06-26T05:10:45Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '0654bc30-8b25-4a73-913d-c01ec9512b13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d6ca09a8-07bd-4b00-973f-74b8a8030f15')
  .query(true)
  .reply(200, {"jobId":"d6ca09a8-07bd-4b00-973f-74b8a8030f15","lastUpdateDateTime":"2021-06-25T05:10:49Z","createdDateTime":"2021-06-25T05:10:45Z","expirationDateTime":"2021-06-26T05:10:45Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  '51147b3a-718e-498f-920e-8513dbbdcb62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:49 GMT'
]);
