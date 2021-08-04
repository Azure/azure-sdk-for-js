let nock = require('nock');

module.exports.hash = "95091b45dc61495bb4243ad632fd8fa2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/e3f3e497-7f58-472a-9d02-50bc640c71f4',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  'c91f4403-c895-4b33-8f24-9bacab3696cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e3f3e497-7f58-472a-9d02-50bc640c71f4')
  .query(true)
  .reply(200, {"jobId":"e3f3e497-7f58-472a-9d02-50bc640c71f4","lastUpdateDateTime":"2021-08-03T22:43:44Z","createdDateTime":"2021-08-03T22:43:44Z","expirationDateTime":"2021-08-04T22:43:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6c5ac6e2-4517-4d4b-8d01-34ce2584ab3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e3f3e497-7f58-472a-9d02-50bc640c71f4')
  .query(true)
  .reply(200, {"jobId":"e3f3e497-7f58-472a-9d02-50bc640c71f4","lastUpdateDateTime":"2021-08-03T22:43:45Z","createdDateTime":"2021-08-03T22:43:44Z","expirationDateTime":"2021-08-04T22:43:44Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '5ef9e707-527d-49c8-9974-c8dadd05c2c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e3f3e497-7f58-472a-9d02-50bc640c71f4')
  .query(true)
  .reply(200, {"jobId":"e3f3e497-7f58-472a-9d02-50bc640c71f4","lastUpdateDateTime":"2021-08-03T22:43:45Z","createdDateTime":"2021-08-03T22:43:44Z","expirationDateTime":"2021-08-04T22:43:44Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '33e87a10-ead7-477f-8dab-cee7ea3f5e02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:44 GMT'
]);
