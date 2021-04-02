let nock = require('nock');

module.exports.hash = "c593c23bb954898040bbb1706f0cdaf7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/10b5093a-f458-4c94-ab5c-7bba70edcfa6',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  'b3543f56-24f6-4449-ab20-bc4162ad951f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/10b5093a-f458-4c94-ab5c-7bba70edcfa6')
  .query(true)
  .reply(200, {"jobId":"10b5093a-f458-4c94-ab5c-7bba70edcfa6","lastUpdateDateTime":"2020-12-22T20:07:20Z","createdDateTime":"2020-12-22T20:07:20Z","expirationDateTime":"2020-12-23T20:07:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7e50ec04-41c5-4118-9f45-9633fb42b12c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/10b5093a-f458-4c94-ab5c-7bba70edcfa6')
  .query(true)
  .reply(200, {"jobId":"10b5093a-f458-4c94-ab5c-7bba70edcfa6","lastUpdateDateTime":"2020-12-22T20:07:20Z","createdDateTime":"2020-12-22T20:07:20Z","expirationDateTime":"2020-12-23T20:07:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '13f23744-6687-41fd-8427-a52556a14dfe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/10b5093a-f458-4c94-ab5c-7bba70edcfa6')
  .query(true)
  .reply(200, {"jobId":"10b5093a-f458-4c94-ab5c-7bba70edcfa6","lastUpdateDateTime":"2020-12-22T20:07:20Z","createdDateTime":"2020-12-22T20:07:20Z","expirationDateTime":"2020-12-23T20:07:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '79c6ecb0-ecee-45cb-ba55-aefa7db5a6f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/10b5093a-f458-4c94-ab5c-7bba70edcfa6')
  .query(true)
  .reply(200, {"jobId":"10b5093a-f458-4c94-ab5c-7bba70edcfa6","lastUpdateDateTime":"2020-12-22T20:07:23Z","createdDateTime":"2020-12-22T20:07:20Z","expirationDateTime":"2020-12-23T20:07:20Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '215',
  'apim-request-id',
  '1732258b-a3c7-41ee-8dcb-373b6836ea97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/10b5093a-f458-4c94-ab5c-7bba70edcfa6')
  .query(true)
  .reply(200, {"jobId":"10b5093a-f458-4c94-ab5c-7bba70edcfa6","lastUpdateDateTime":"2020-12-22T20:07:23Z","createdDateTime":"2020-12-22T20:07:20Z","expirationDateTime":"2020-12-23T20:07:20Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  'aecae061-3092-4a94-acda-2f51280f30e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:24 GMT'
]);
