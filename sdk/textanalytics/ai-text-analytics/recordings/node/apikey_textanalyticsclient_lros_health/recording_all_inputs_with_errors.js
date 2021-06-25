let nock = require('nock');

module.exports.hash = "0c018911d7b8c915100686d9373b4af8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/a4c37b16-f653-486a-a29e-41a55edfa3f0',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  '24a5619f-a8fc-4f56-b8a1-750ab78d5c80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/a4c37b16-f653-486a-a29e-41a55edfa3f0')
  .query(true)
  .reply(200, {"jobId":"a4c37b16-f653-486a-a29e-41a55edfa3f0","lastUpdateDateTime":"2021-06-25T19:56:21Z","createdDateTime":"2021-06-25T19:56:20Z","expirationDateTime":"2021-06-26T19:56:20Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'cce7d183-47f5-44c6-9be1-4502b990dc00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/a4c37b16-f653-486a-a29e-41a55edfa3f0')
  .query(true)
  .reply(200, {"jobId":"a4c37b16-f653-486a-a29e-41a55edfa3f0","lastUpdateDateTime":"2021-06-25T19:56:21Z","createdDateTime":"2021-06-25T19:56:20Z","expirationDateTime":"2021-06-26T19:56:20Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '10527dc3-0849-4645-94c4-274148f8ec24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/a4c37b16-f653-486a-a29e-41a55edfa3f0')
  .query(true)
  .reply(200, {"jobId":"a4c37b16-f653-486a-a29e-41a55edfa3f0","lastUpdateDateTime":"2021-06-25T19:56:21Z","createdDateTime":"2021-06-25T19:56:20Z","expirationDateTime":"2021-06-26T19:56:20Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'eb3fbcd0-c4b1-49b4-b573-c1b7d8fa18df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/a4c37b16-f653-486a-a29e-41a55edfa3f0')
  .query(true)
  .reply(200, {"jobId":"a4c37b16-f653-486a-a29e-41a55edfa3f0","lastUpdateDateTime":"2021-06-25T19:56:21Z","createdDateTime":"2021-06-25T19:56:20Z","expirationDateTime":"2021-06-26T19:56:20Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  'c1ee8a4d-2d36-408b-b0d5-37c5e35a69f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:23 GMT'
]);
