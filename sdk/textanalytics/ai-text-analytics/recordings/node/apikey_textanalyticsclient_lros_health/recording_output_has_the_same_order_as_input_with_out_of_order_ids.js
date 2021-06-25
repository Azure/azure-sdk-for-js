let nock = require('nock');

module.exports.hash = "4b2220c5d74f5da44971fae0df1a3912";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/6c8deb64-f35b-4e94-9e5b-db0938328bf8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  '39c95a6b-dc66-465d-a83f-ac0efafedf0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/6c8deb64-f35b-4e94-9e5b-db0938328bf8')
  .query(true)
  .reply(200, {"jobId":"6c8deb64-f35b-4e94-9e5b-db0938328bf8","lastUpdateDateTime":"2021-06-25T05:10:41Z","createdDateTime":"2021-06-25T05:10:41Z","expirationDateTime":"2021-06-26T05:10:41Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'df7a91c3-cb4c-4752-8e7d-bf52b4637ab9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/6c8deb64-f35b-4e94-9e5b-db0938328bf8')
  .query(true)
  .reply(200, {"jobId":"6c8deb64-f35b-4e94-9e5b-db0938328bf8","lastUpdateDateTime":"2021-06-25T05:10:41Z","createdDateTime":"2021-06-25T05:10:41Z","expirationDateTime":"2021-06-26T05:10:41Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '735ecde7-94a9-4c23-a1af-e451b1d0de2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/6c8deb64-f35b-4e94-9e5b-db0938328bf8')
  .query(true)
  .reply(200, {"jobId":"6c8deb64-f35b-4e94-9e5b-db0938328bf8","lastUpdateDateTime":"2021-06-25T05:10:41Z","createdDateTime":"2021-06-25T05:10:41Z","expirationDateTime":"2021-06-26T05:10:41Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e9b3b898-49e6-439c-bb88-71e2b7e2163d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/6c8deb64-f35b-4e94-9e5b-db0938328bf8')
  .query(true)
  .reply(200, {"jobId":"6c8deb64-f35b-4e94-9e5b-db0938328bf8","lastUpdateDateTime":"2021-06-25T05:10:44Z","createdDateTime":"2021-06-25T05:10:41Z","expirationDateTime":"2021-06-26T05:10:41Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  '299c7794-e110-49bb-ae18-cf1650de04a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/6c8deb64-f35b-4e94-9e5b-db0938328bf8')
  .query(true)
  .reply(200, {"jobId":"6c8deb64-f35b-4e94-9e5b-db0938328bf8","lastUpdateDateTime":"2021-06-25T05:10:44Z","createdDateTime":"2021-06-25T05:10:41Z","expirationDateTime":"2021-06-26T05:10:41Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  'ae7377dc-5e72-43fc-82b0-79b40f9a882e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:45 GMT'
]);
