let nock = require('nock');

module.exports.hash = "4fe6d983363e697807ee4c3c068d2783";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/f3087337-3b16-454a-bf9c-007ae3bde1da',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  'fbca9de9-52de-43d3-9e51-6ab41294d2a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:40 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/f3087337-3b16-454a-bf9c-007ae3bde1da')
  .query(true)
  .reply(200, {"jobId":"f3087337-3b16-454a-bf9c-007ae3bde1da","lastUpdateDateTime":"2021-08-03T03:16:41Z","createdDateTime":"2021-08-03T03:16:40Z","expirationDateTime":"2021-08-04T03:16:40Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ea1cbd3d-665c-4432-aeb8-bacc80306bd4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:40 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/f3087337-3b16-454a-bf9c-007ae3bde1da')
  .query(true)
  .reply(200, {"jobId":"f3087337-3b16-454a-bf9c-007ae3bde1da","lastUpdateDateTime":"2021-08-03T03:16:41Z","createdDateTime":"2021-08-03T03:16:40Z","expirationDateTime":"2021-08-04T03:16:40Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c8b33aeb-6a03-4ff7-ade2-44f8897d7cfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:40 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/f3087337-3b16-454a-bf9c-007ae3bde1da')
  .query(true)
  .reply(200, {"jobId":"f3087337-3b16-454a-bf9c-007ae3bde1da","lastUpdateDateTime":"2021-08-03T03:16:42Z","createdDateTime":"2021-08-03T03:16:40Z","expirationDateTime":"2021-08-04T03:16:40Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '34a6a104-d8e0-4735-bcd2-176540d7f354',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:42 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/f3087337-3b16-454a-bf9c-007ae3bde1da')
  .query(true)
  .reply(200, {"jobId":"f3087337-3b16-454a-bf9c-007ae3bde1da","lastUpdateDateTime":"2021-08-03T03:16:42Z","createdDateTime":"2021-08-03T03:16:40Z","expirationDateTime":"2021-08-04T03:16:40Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '044efad2-6304-49cd-80db-921b6d530530',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:42 GMT'
]);
