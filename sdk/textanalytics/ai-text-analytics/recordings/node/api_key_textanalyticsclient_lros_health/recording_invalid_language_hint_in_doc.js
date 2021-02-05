let nock = require('nock');

module.exports.hash = "0d5c1d3d6320331d571ad7ee110268a3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/b83ca4af-139a-4354-a338-a25fc4707b56',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  'e9d30b93-3b19-41ac-8f01-16e218e324fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/b83ca4af-139a-4354-a338-a25fc4707b56')
  .query(true)
  .reply(200, {"jobId":"b83ca4af-139a-4354-a338-a25fc4707b56","lastUpdateDateTime":"2020-12-30T17:29:06Z","createdDateTime":"2020-12-30T17:29:06Z","expirationDateTime":"2020-12-31T17:29:06Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '7af4a808-64f1-4281-93b8-111fc209ee27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/b83ca4af-139a-4354-a338-a25fc4707b56')
  .query(true)
  .reply(200, {"jobId":"b83ca4af-139a-4354-a338-a25fc4707b56","lastUpdateDateTime":"2020-12-30T17:29:06Z","createdDateTime":"2020-12-30T17:29:06Z","expirationDateTime":"2020-12-31T17:29:06Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ef158b14-9bc8-4baf-98c5-81925965dd29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/b83ca4af-139a-4354-a338-a25fc4707b56')
  .query(true)
  .reply(200, {"jobId":"b83ca4af-139a-4354-a338-a25fc4707b56","lastUpdateDateTime":"2020-12-30T17:29:06Z","createdDateTime":"2020-12-30T17:29:06Z","expirationDateTime":"2020-12-31T17:29:06Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '223e9295-567c-47a1-b29f-04af0689825e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/b83ca4af-139a-4354-a338-a25fc4707b56')
  .query(true)
  .reply(200, {"jobId":"b83ca4af-139a-4354-a338-a25fc4707b56","lastUpdateDateTime":"2020-12-30T17:29:10Z","createdDateTime":"2020-12-30T17:29:06Z","expirationDateTime":"2020-12-31T17:29:06Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '330',
  'apim-request-id',
  '7164a8d7-0a87-4376-9b81-d1744eb6838d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/b83ca4af-139a-4354-a338-a25fc4707b56')
  .query(true)
  .reply(200, {"jobId":"b83ca4af-139a-4354-a338-a25fc4707b56","lastUpdateDateTime":"2020-12-30T17:29:10Z","createdDateTime":"2020-12-30T17:29:06Z","expirationDateTime":"2020-12-31T17:29:06Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'cea438c1-86f2-4b80-98dc-ecc1fd066018',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:10 GMT'
]);
