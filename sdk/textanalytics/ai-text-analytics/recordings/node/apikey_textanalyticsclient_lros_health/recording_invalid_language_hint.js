let nock = require('nock');

module.exports.hash = "4fe6d983363e697807ee4c3c068d2783";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/b8ba8dd9-187d-4d07-bf58-8fde3875f200',
  'x-envoy-upstream-service-time',
  '182',
  'apim-request-id',
  'acc20f5c-829c-4a18-bcd5-55dcc9779606',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/b8ba8dd9-187d-4d07-bf58-8fde3875f200')
  .query(true)
  .reply(200, {"jobId":"b8ba8dd9-187d-4d07-bf58-8fde3875f200","lastUpdateDateTime":"2021-10-23T00:42:54Z","createdDateTime":"2021-10-23T00:42:54Z","expirationDateTime":"2021-10-24T00:42:54Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f2938db2-20f9-4c79-81ef-81b5363c3880',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/b8ba8dd9-187d-4d07-bf58-8fde3875f200')
  .query(true)
  .reply(200, {"jobId":"b8ba8dd9-187d-4d07-bf58-8fde3875f200","lastUpdateDateTime":"2021-10-23T00:42:54Z","createdDateTime":"2021-10-23T00:42:54Z","expirationDateTime":"2021-10-24T00:42:54Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'c04fab3d-6651-4ef2-b241-f88461a10be5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/b8ba8dd9-187d-4d07-bf58-8fde3875f200')
  .query(true)
  .reply(200, {"jobId":"b8ba8dd9-187d-4d07-bf58-8fde3875f200","lastUpdateDateTime":"2021-10-23T00:42:55Z","createdDateTime":"2021-10-23T00:42:54Z","expirationDateTime":"2021-10-24T00:42:54Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  '3ee7dca4-eac7-4e0f-b7c8-2bf468a0029a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/b8ba8dd9-187d-4d07-bf58-8fde3875f200')
  .query(true)
  .reply(200, {"jobId":"b8ba8dd9-187d-4d07-bf58-8fde3875f200","lastUpdateDateTime":"2021-10-23T00:42:55Z","createdDateTime":"2021-10-23T00:42:54Z","expirationDateTime":"2021-10-24T00:42:54Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  'de1656a8-248c-428b-b303-53fb4ae7d97b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:56 GMT'
]);
