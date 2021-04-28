let nock = require('nock');

module.exports.hash = "a2af35bb8906288de33b66444bb8db36";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/9a80aea9-a0d5-49a0-88f7-a722d92567f1',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'af5da2e7-5be0-4f82-95f9-8ebb6b707f17',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/9a80aea9-a0d5-49a0-88f7-a722d92567f1')
  .query(true)
  .reply(200, {"jobId":"9a80aea9-a0d5-49a0-88f7-a722d92567f1","lastUpdateDateTime":"2021-04-28T21:05:25Z","createdDateTime":"2021-04-28T21:05:25Z","expirationDateTime":"2021-04-29T21:05:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '5d531d5a-c485-4785-b003-53a33c3181ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/9a80aea9-a0d5-49a0-88f7-a722d92567f1')
  .query(true)
  .reply(200, {"jobId":"9a80aea9-a0d5-49a0-88f7-a722d92567f1","lastUpdateDateTime":"2021-04-28T21:05:25Z","createdDateTime":"2021-04-28T21:05:25Z","expirationDateTime":"2021-04-29T21:05:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '563832dd-ed19-444e-9f17-22bb5cd272dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/9a80aea9-a0d5-49a0-88f7-a722d92567f1')
  .query(true)
  .reply(200, {"jobId":"9a80aea9-a0d5-49a0-88f7-a722d92567f1","lastUpdateDateTime":"2021-04-28T21:05:25Z","createdDateTime":"2021-04-28T21:05:25Z","expirationDateTime":"2021-04-29T21:05:25Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '557c5922-9f08-409f-956e-3d028531a891',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/9a80aea9-a0d5-49a0-88f7-a722d92567f1')
  .query(true)
  .reply(200, {"jobId":"9a80aea9-a0d5-49a0-88f7-a722d92567f1","lastUpdateDateTime":"2021-04-28T21:05:25Z","createdDateTime":"2021-04-28T21:05:25Z","expirationDateTime":"2021-04-29T21:05:25Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'fd4cd545-ab6d-436b-8fc6-61fa531e1f54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:27 GMT'
]);
