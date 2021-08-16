let nock = require('nock');

module.exports.hash = "4fe6d983363e697807ee4c3c068d2783";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/3e4851e1-5c21-48f9-a5ae-589522b81017',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '21607d9a-6281-4050-9bed-8119a57b46a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3e4851e1-5c21-48f9-a5ae-589522b81017')
  .query(true)
  .reply(200, {"jobId":"3e4851e1-5c21-48f9-a5ae-589522b81017","lastUpdateDateTime":"2021-08-03T22:43:40Z","createdDateTime":"2021-08-03T22:43:39Z","expirationDateTime":"2021-08-04T22:43:39Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9998c025-991e-4e42-a394-44520702ca86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3e4851e1-5c21-48f9-a5ae-589522b81017')
  .query(true)
  .reply(200, {"jobId":"3e4851e1-5c21-48f9-a5ae-589522b81017","lastUpdateDateTime":"2021-08-03T22:43:40Z","createdDateTime":"2021-08-03T22:43:39Z","expirationDateTime":"2021-08-04T22:43:39Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5b11cd35-5ccc-4490-b8ac-9018705a5260',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3e4851e1-5c21-48f9-a5ae-589522b81017')
  .query(true)
  .reply(200, {"jobId":"3e4851e1-5c21-48f9-a5ae-589522b81017","lastUpdateDateTime":"2021-08-03T22:43:40Z","createdDateTime":"2021-08-03T22:43:39Z","expirationDateTime":"2021-08-04T22:43:39Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '06acd668-1067-4c39-981e-212c09bade10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3e4851e1-5c21-48f9-a5ae-589522b81017')
  .query(true)
  .reply(200, {"jobId":"3e4851e1-5c21-48f9-a5ae-589522b81017","lastUpdateDateTime":"2021-08-03T22:43:42Z","createdDateTime":"2021-08-03T22:43:39Z","expirationDateTime":"2021-08-04T22:43:39Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  'a740d125-3d4c-48f1-9472-80224c7172c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3e4851e1-5c21-48f9-a5ae-589522b81017')
  .query(true)
  .reply(200, {"jobId":"3e4851e1-5c21-48f9-a5ae-589522b81017","lastUpdateDateTime":"2021-08-03T22:43:42Z","createdDateTime":"2021-08-03T22:43:39Z","expirationDateTime":"2021-08-04T22:43:39Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '02a65451-9605-4f1d-9989-0289ae8b616e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:43 GMT'
]);
