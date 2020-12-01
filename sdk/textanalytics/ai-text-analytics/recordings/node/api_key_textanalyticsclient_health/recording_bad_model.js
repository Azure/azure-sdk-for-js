let nock = require('nock');

module.exports.hash = "4cac60339874945338dbaff4c1d08efe";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/cddc861d-fa87-42ec-a362-1fbbe4ef6d86',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '62491529-0949-4b0c-afde-f30950239e99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Oct 2020 22:14:01 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/cddc861d-fa87-42ec-a362-1fbbe4ef6d86')
  .query(true)
  .reply(200, {"jobId":"cddc861d-fa87-42ec-a362-1fbbe4ef6d86","lastUpdateDateTime":"2020-10-28T22:14:01Z","createdDateTime":"2020-10-28T22:14:01Z","expirationDateTime":"2020-10-29T22:14:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '0c65ab81-5ea4-43d4-b8a8-94de393667ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Oct 2020 22:14:01 GMT'
]);
