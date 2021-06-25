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
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/ce2af675-67ab-41df-b827-887a9a5287ed',
  'x-envoy-upstream-service-time',
  '208',
  'apim-request-id',
  '481ed123-ca49-4961-a138-b44bba4e0e2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/ce2af675-67ab-41df-b827-887a9a5287ed')
  .query(true)
  .reply(200, {"jobId":"ce2af675-67ab-41df-b827-887a9a5287ed","lastUpdateDateTime":"2021-06-25T19:56:35Z","createdDateTime":"2021-06-25T19:56:34Z","expirationDateTime":"2021-06-26T19:56:34Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'efa3c09d-a22d-4976-b72e-85241b371451',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/ce2af675-67ab-41df-b827-887a9a5287ed')
  .query(true)
  .reply(200, {"jobId":"ce2af675-67ab-41df-b827-887a9a5287ed","lastUpdateDateTime":"2021-06-25T19:56:35Z","createdDateTime":"2021-06-25T19:56:34Z","expirationDateTime":"2021-06-26T19:56:34Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '649307ff-af48-426c-8165-a8ac4743a73e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/ce2af675-67ab-41df-b827-887a9a5287ed')
  .query(true)
  .reply(200, {"jobId":"ce2af675-67ab-41df-b827-887a9a5287ed","lastUpdateDateTime":"2021-06-25T19:56:36Z","createdDateTime":"2021-06-25T19:56:34Z","expirationDateTime":"2021-06-26T19:56:34Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '2abb8355-5cf4-4bc6-8703-026e2d95a745',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:36 GMT'
]);
