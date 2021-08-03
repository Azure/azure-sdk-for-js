let nock = require('nock');

module.exports.hash = "4fe6d983363e697807ee4c3c068d2783";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/91942678-1be1-4917-9784-7f15b88d94e5',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  '9078b509-ea59-41f0-9349-f59f1f6f9326',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/91942678-1be1-4917-9784-7f15b88d94e5')
  .query(true)
  .reply(200, {"jobId":"91942678-1be1-4917-9784-7f15b88d94e5","lastUpdateDateTime":"2021-06-25T19:56:48Z","createdDateTime":"2021-06-25T19:56:48Z","expirationDateTime":"2021-06-26T19:56:48Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '24e5704c-debe-4262-b2fb-23233737e5a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/91942678-1be1-4917-9784-7f15b88d94e5')
  .query(true)
  .reply(200, {"jobId":"91942678-1be1-4917-9784-7f15b88d94e5","lastUpdateDateTime":"2021-06-25T19:56:48Z","createdDateTime":"2021-06-25T19:56:48Z","expirationDateTime":"2021-06-26T19:56:48Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '1ae897f2-e406-4357-8aea-d9067502aa41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/91942678-1be1-4917-9784-7f15b88d94e5')
  .query(true)
  .reply(200, {"jobId":"91942678-1be1-4917-9784-7f15b88d94e5","lastUpdateDateTime":"2021-06-25T19:56:48Z","createdDateTime":"2021-06-25T19:56:48Z","expirationDateTime":"2021-06-26T19:56:48Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'b26da439-df73-4fde-9e41-60ff63683151',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/91942678-1be1-4917-9784-7f15b88d94e5')
  .query(true)
  .reply(200, {"jobId":"91942678-1be1-4917-9784-7f15b88d94e5","lastUpdateDateTime":"2021-06-25T19:56:48Z","createdDateTime":"2021-06-25T19:56:48Z","expirationDateTime":"2021-06-26T19:56:48Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'e91964b3-e65f-46c0-ac48-dfa68167c760',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:50 GMT'
]);
