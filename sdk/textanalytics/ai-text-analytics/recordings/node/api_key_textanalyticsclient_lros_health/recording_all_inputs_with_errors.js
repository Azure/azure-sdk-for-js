let nock = require('nock');

module.exports.hash = "502c2a738b30a7fc46c968423a28b552";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/09c370d7-6c0d-40cd-b8e4-21f129108c5d',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '49c217c3-211c-43d8-a2fb-f07c19755449',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/09c370d7-6c0d-40cd-b8e4-21f129108c5d')
  .query(true)
  .reply(200, {"jobId":"09c370d7-6c0d-40cd-b8e4-21f129108c5d","lastUpdateDateTime":"2021-04-28T20:14:11Z","createdDateTime":"2021-04-28T20:14:11Z","expirationDateTime":"2021-04-29T20:14:11Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '0058006e-4a6e-495f-831b-16ba4508cd59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/09c370d7-6c0d-40cd-b8e4-21f129108c5d')
  .query(true)
  .reply(200, {"jobId":"09c370d7-6c0d-40cd-b8e4-21f129108c5d","lastUpdateDateTime":"2021-04-28T20:14:11Z","createdDateTime":"2021-04-28T20:14:11Z","expirationDateTime":"2021-04-29T20:14:11Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '59dd442c-a55e-4840-9078-f79f89994e98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/09c370d7-6c0d-40cd-b8e4-21f129108c5d')
  .query(true)
  .reply(200, {"jobId":"09c370d7-6c0d-40cd-b8e4-21f129108c5d","lastUpdateDateTime":"2021-04-28T20:14:11Z","createdDateTime":"2021-04-28T20:14:11Z","expirationDateTime":"2021-04-29T20:14:11Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '7542d936-247c-4dd5-b54e-c1d7f3c98a6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/09c370d7-6c0d-40cd-b8e4-21f129108c5d')
  .query(true)
  .reply(200, {"jobId":"09c370d7-6c0d-40cd-b8e4-21f129108c5d","lastUpdateDateTime":"2021-04-28T20:14:11Z","createdDateTime":"2021-04-28T20:14:11Z","expirationDateTime":"2021-04-29T20:14:11Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '9232fd2b-9fa5-46c4-b0b3-314b1489aedf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:13 GMT'
]);
