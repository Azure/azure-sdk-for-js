let nock = require('nock');

module.exports.hash = "1569981548fb7e275b78787d7340dd48";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/7ad23c2d-46fb-42fc-9a95-19b8ed5e6e6d',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  'ec4f6b72-3e7c-412b-b6f1-be9de446a14f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:30 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/7ad23c2d-46fb-42fc-9a95-19b8ed5e6e6d')
  .query(true)
  .reply(200, {"jobId":"7ad23c2d-46fb-42fc-9a95-19b8ed5e6e6d","lastUpdateDateTime":"2021-08-03T03:16:30Z","createdDateTime":"2021-08-03T03:16:30Z","expirationDateTime":"2021-08-04T03:16:30Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '0704f06d-57cb-430f-a21a-6e251f005dee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:30 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/7ad23c2d-46fb-42fc-9a95-19b8ed5e6e6d')
  .query(true)
  .reply(200, {"jobId":"7ad23c2d-46fb-42fc-9a95-19b8ed5e6e6d","lastUpdateDateTime":"2021-08-03T03:16:30Z","createdDateTime":"2021-08-03T03:16:30Z","expirationDateTime":"2021-08-04T03:16:30Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '1b77db7f-aa50-4e8d-adec-c1e255cd0c49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:30 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/7ad23c2d-46fb-42fc-9a95-19b8ed5e6e6d')
  .query(true)
  .reply(200, {"jobId":"7ad23c2d-46fb-42fc-9a95-19b8ed5e6e6d","lastUpdateDateTime":"2021-08-03T03:16:32Z","createdDateTime":"2021-08-03T03:16:30Z","expirationDateTime":"2021-08-04T03:16:30Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '33b30fa5-eb9c-4d12-ace1-a76678ec2849',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:32 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/7ad23c2d-46fb-42fc-9a95-19b8ed5e6e6d')
  .query(true)
  .reply(200, {"jobId":"7ad23c2d-46fb-42fc-9a95-19b8ed5e6e6d","lastUpdateDateTime":"2021-08-03T03:16:32Z","createdDateTime":"2021-08-03T03:16:30Z","expirationDateTime":"2021-08-04T03:16:30Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '10edfaa5-ad1a-411d-bc06-572421e945ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:32 GMT'
]);
