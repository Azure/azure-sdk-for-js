let nock = require('nock');

module.exports.hash = "95091b45dc61495bb4243ad632fd8fa2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/40f5adea-ec31-47e3-98cd-6dfc82814c94',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  'eb835e4e-7adb-44d7-895e-81fecc42ace9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/40f5adea-ec31-47e3-98cd-6dfc82814c94')
  .query(true)
  .reply(200, {"jobId":"40f5adea-ec31-47e3-98cd-6dfc82814c94","lastUpdateDateTime":"2021-06-25T19:56:51Z","createdDateTime":"2021-06-25T19:56:50Z","expirationDateTime":"2021-06-26T19:56:50Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e29da8c0-7a72-4dc7-b2af-42ecf4fcfb3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/40f5adea-ec31-47e3-98cd-6dfc82814c94')
  .query(true)
  .reply(200, {"jobId":"40f5adea-ec31-47e3-98cd-6dfc82814c94","lastUpdateDateTime":"2021-06-25T19:56:51Z","createdDateTime":"2021-06-25T19:56:50Z","expirationDateTime":"2021-06-26T19:56:50Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7a1d38df-7e2c-461d-9c1e-0664e91488b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/40f5adea-ec31-47e3-98cd-6dfc82814c94')
  .query(true)
  .reply(200, {"jobId":"40f5adea-ec31-47e3-98cd-6dfc82814c94","lastUpdateDateTime":"2021-06-25T19:56:51Z","createdDateTime":"2021-06-25T19:56:50Z","expirationDateTime":"2021-06-26T19:56:50Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'cbd75f1a-41d9-4f8a-b68e-c48ae816e07a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/40f5adea-ec31-47e3-98cd-6dfc82814c94')
  .query(true)
  .reply(200, {"jobId":"40f5adea-ec31-47e3-98cd-6dfc82814c94","lastUpdateDateTime":"2021-06-25T19:56:51Z","createdDateTime":"2021-06-25T19:56:50Z","expirationDateTime":"2021-06-26T19:56:50Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'e5d42af7-2142-415d-80bd-ea97eaf9dc79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:52 GMT'
]);
