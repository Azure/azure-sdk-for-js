let nock = require('nock');

module.exports.hash = "4fe6d983363e697807ee4c3c068d2783";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/b1363833-8a26-42c1-8f9a-3ae755b2eb4d',
  'x-envoy-upstream-service-time',
  '5268',
  'apim-request-id',
  '67247392-c1fe-4f3e-8431-e2fab53a85c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b1363833-8a26-42c1-8f9a-3ae755b2eb4d')
  .query(true)
  .reply(200, {"jobId":"b1363833-8a26-42c1-8f9a-3ae755b2eb4d","lastUpdateDateTime":"2021-06-25T05:11:20Z","createdDateTime":"2021-06-25T05:11:15Z","expirationDateTime":"2021-06-26T05:11:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '6407c855-2577-4b03-baf9-2573a6e18d25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b1363833-8a26-42c1-8f9a-3ae755b2eb4d')
  .query(true)
  .reply(200, {"jobId":"b1363833-8a26-42c1-8f9a-3ae755b2eb4d","lastUpdateDateTime":"2021-06-25T05:11:20Z","createdDateTime":"2021-06-25T05:11:15Z","expirationDateTime":"2021-06-26T05:11:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ca7cf56f-7ae6-4689-a3b6-9f404e83dbce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b1363833-8a26-42c1-8f9a-3ae755b2eb4d')
  .query(true)
  .reply(200, {"jobId":"b1363833-8a26-42c1-8f9a-3ae755b2eb4d","lastUpdateDateTime":"2021-06-25T05:11:20Z","createdDateTime":"2021-06-25T05:11:15Z","expirationDateTime":"2021-06-26T05:11:15Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'ecf673f1-0c0e-454f-bdf0-77be008a1d13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b1363833-8a26-42c1-8f9a-3ae755b2eb4d')
  .query(true)
  .reply(200, {"jobId":"b1363833-8a26-42c1-8f9a-3ae755b2eb4d","lastUpdateDateTime":"2021-06-25T05:11:20Z","createdDateTime":"2021-06-25T05:11:15Z","expirationDateTime":"2021-06-26T05:11:15Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '3bf4c5f9-1fc8-40d2-8843-3977a37b61a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:21 GMT'
]);
