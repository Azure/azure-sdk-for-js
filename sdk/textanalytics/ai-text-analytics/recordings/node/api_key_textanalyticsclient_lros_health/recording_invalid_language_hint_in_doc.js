let nock = require('nock');

module.exports.hash = "a2af35bb8906288de33b66444bb8db36";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/5f320a54-b444-4c4e-b9a7-0f0fae109d85',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '27c3f075-567b-488f-8aba-c1b793cf00c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5f320a54-b444-4c4e-b9a7-0f0fae109d85')
  .query(true)
  .reply(200, {"jobId":"5f320a54-b444-4c4e-b9a7-0f0fae109d85","lastUpdateDateTime":"2021-03-04T20:18:55Z","createdDateTime":"2021-03-04T20:18:55Z","expirationDateTime":"2021-03-05T20:18:55Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e05347a7-fca2-4ae4-b7ce-af469861b180',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5f320a54-b444-4c4e-b9a7-0f0fae109d85')
  .query(true)
  .reply(200, {"jobId":"5f320a54-b444-4c4e-b9a7-0f0fae109d85","lastUpdateDateTime":"2021-03-04T20:18:55Z","createdDateTime":"2021-03-04T20:18:55Z","expirationDateTime":"2021-03-05T20:18:55Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f12ba4f0-61f5-44af-935c-8810df53768a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5f320a54-b444-4c4e-b9a7-0f0fae109d85')
  .query(true)
  .reply(200, {"jobId":"5f320a54-b444-4c4e-b9a7-0f0fae109d85","lastUpdateDateTime":"2021-03-04T20:18:55Z","createdDateTime":"2021-03-04T20:18:55Z","expirationDateTime":"2021-03-05T20:18:55Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '4e60af54-4546-41b8-b854-02ddb6435bc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5f320a54-b444-4c4e-b9a7-0f0fae109d85')
  .query(true)
  .reply(200, {"jobId":"5f320a54-b444-4c4e-b9a7-0f0fae109d85","lastUpdateDateTime":"2021-03-04T20:18:55Z","createdDateTime":"2021-03-04T20:18:55Z","expirationDateTime":"2021-03-05T20:18:55Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  'e0e63fa4-6326-42ec-9604-012e540c0345',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:56 GMT'
]);
