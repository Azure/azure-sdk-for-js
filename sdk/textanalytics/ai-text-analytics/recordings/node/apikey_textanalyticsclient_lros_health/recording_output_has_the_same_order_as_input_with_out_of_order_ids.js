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
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/b92072c8-9cf5-449a-9fb4-364a14abc9a0',
  'x-envoy-upstream-service-time',
  '225',
  'apim-request-id',
  '79242d16-0d7a-4589-9528-b2ffabae26bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b92072c8-9cf5-449a-9fb4-364a14abc9a0')
  .query(true)
  .reply(200, {"jobId":"b92072c8-9cf5-449a-9fb4-364a14abc9a0","lastUpdateDateTime":"2021-06-25T19:56:32Z","createdDateTime":"2021-06-25T19:56:32Z","expirationDateTime":"2021-06-26T19:56:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'aee15d89-d562-4471-9417-b3fb8117cf5e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b92072c8-9cf5-449a-9fb4-364a14abc9a0')
  .query(true)
  .reply(200, {"jobId":"b92072c8-9cf5-449a-9fb4-364a14abc9a0","lastUpdateDateTime":"2021-06-25T19:56:32Z","createdDateTime":"2021-06-25T19:56:32Z","expirationDateTime":"2021-06-26T19:56:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '468d00be-4fcb-4da3-879b-da989235238a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b92072c8-9cf5-449a-9fb4-364a14abc9a0')
  .query(true)
  .reply(200, {"jobId":"b92072c8-9cf5-449a-9fb4-364a14abc9a0","lastUpdateDateTime":"2021-06-25T19:56:34Z","createdDateTime":"2021-06-25T19:56:32Z","expirationDateTime":"2021-06-26T19:56:32Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'b1a31914-768b-4b4f-962f-f0eb68ef7805',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b92072c8-9cf5-449a-9fb4-364a14abc9a0')
  .query(true)
  .reply(200, {"jobId":"b92072c8-9cf5-449a-9fb4-364a14abc9a0","lastUpdateDateTime":"2021-06-25T19:56:34Z","createdDateTime":"2021-06-25T19:56:32Z","expirationDateTime":"2021-06-26T19:56:32Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  '1945d99e-2110-4614-b50e-4ebd8d17fc25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:34 GMT'
]);
