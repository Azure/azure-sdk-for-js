let nock = require('nock');

module.exports.hash = "3dddaab7b19e346d6e0f571162c30323";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/4027c147-a20a-4ee6-a54f-522ea0cf9679',
  'x-envoy-upstream-service-time',
  '445',
  'apim-request-id',
  'a7aa27b9-f2ff-40b9-9530-329c33f5769a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/4027c147-a20a-4ee6-a54f-522ea0cf9679')
  .query(true)
  .reply(200, {"jobId":"4027c147-a20a-4ee6-a54f-522ea0cf9679","lastUpdateDateTime":"2020-12-22T20:08:20Z","createdDateTime":"2020-12-22T20:08:20Z","expirationDateTime":"2020-12-23T20:08:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '9b115a89-d8c2-444c-b167-705cd17c5ffa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/4027c147-a20a-4ee6-a54f-522ea0cf9679')
  .query(true)
  .reply(200, {"jobId":"4027c147-a20a-4ee6-a54f-522ea0cf9679","lastUpdateDateTime":"2020-12-22T20:08:20Z","createdDateTime":"2020-12-22T20:08:20Z","expirationDateTime":"2020-12-23T20:08:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '2971da1f-ee47-4146-9a4e-ba3fcb41c075',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/4027c147-a20a-4ee6-a54f-522ea0cf9679')
  .query(true)
  .reply(200, {"jobId":"4027c147-a20a-4ee6-a54f-522ea0cf9679","lastUpdateDateTime":"2020-12-22T20:08:20Z","createdDateTime":"2020-12-22T20:08:20Z","expirationDateTime":"2020-12-23T20:08:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b04d625e-baa3-4e53-8114-6e9820e3ff42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/4027c147-a20a-4ee6-a54f-522ea0cf9679')
  .query(true)
  .reply(200, {"jobId":"4027c147-a20a-4ee6-a54f-522ea0cf9679","lastUpdateDateTime":"2020-12-22T20:08:23Z","createdDateTime":"2020-12-22T20:08:20Z","expirationDateTime":"2020-12-23T20:08:20Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '3d5c143c-0455-4f86-ad52-90b4c95b89eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/4027c147-a20a-4ee6-a54f-522ea0cf9679')
  .query(true)
  .reply(200, {"jobId":"4027c147-a20a-4ee6-a54f-522ea0cf9679","lastUpdateDateTime":"2020-12-22T20:08:23Z","createdDateTime":"2020-12-22T20:08:20Z","expirationDateTime":"2020-12-23T20:08:20Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '604a4509-73e3-4eeb-8704-47ccffc42176',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:23 GMT'
]);
