let nock = require('nock');

module.exports.hash = "ccc06bbc882856bacdf46a31a9bfb5a0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/5b500ba8-035b-4b7e-99dd-e9bc477a36ae',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '6e1a4a13-25c5-476e-aec4-7b6866d11e2f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5b500ba8-035b-4b7e-99dd-e9bc477a36ae')
  .query(true)
  .reply(200, {"jobId":"5b500ba8-035b-4b7e-99dd-e9bc477a36ae","lastUpdateDateTime":"2021-03-04T20:18:52Z","createdDateTime":"2021-03-04T20:18:52Z","expirationDateTime":"2021-03-05T20:18:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c2f40dbe-6993-4823-adf5-9cf3b99fd89a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5b500ba8-035b-4b7e-99dd-e9bc477a36ae')
  .query(true)
  .reply(200, {"jobId":"5b500ba8-035b-4b7e-99dd-e9bc477a36ae","lastUpdateDateTime":"2021-03-04T20:18:52Z","createdDateTime":"2021-03-04T20:18:52Z","expirationDateTime":"2021-03-05T20:18:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c1b66226-40f9-471c-a9b8-8c7d8da75b33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5b500ba8-035b-4b7e-99dd-e9bc477a36ae')
  .query(true)
  .reply(200, {"jobId":"5b500ba8-035b-4b7e-99dd-e9bc477a36ae","lastUpdateDateTime":"2021-03-04T20:18:53Z","createdDateTime":"2021-03-04T20:18:52Z","expirationDateTime":"2021-03-05T20:18:52Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'b9f06b38-554a-44b7-9ec3-fa2ec173ce55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5b500ba8-035b-4b7e-99dd-e9bc477a36ae')
  .query(true)
  .reply(200, {"jobId":"5b500ba8-035b-4b7e-99dd-e9bc477a36ae","lastUpdateDateTime":"2021-03-04T20:18:53Z","createdDateTime":"2021-03-04T20:18:52Z","expirationDateTime":"2021-03-05T20:18:52Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '962ab413-4472-457f-80e0-440eaceee47d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:54 GMT'
]);
