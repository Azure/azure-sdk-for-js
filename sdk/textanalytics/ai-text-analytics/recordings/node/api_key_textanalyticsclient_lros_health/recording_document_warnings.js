let nock = require('nock');

module.exports.hash = "f8a5f7ad0b9546a9cbb856f66ab9f72e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/5108b187-bfa8-4072-b1ee-dc8708f4016e',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'e763f97b-e50b-4f72-b79d-61a79982f377',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5108b187-bfa8-4072-b1ee-dc8708f4016e')
  .query(true)
  .reply(200, {"jobId":"5108b187-bfa8-4072-b1ee-dc8708f4016e","lastUpdateDateTime":"2021-02-23T02:42:08Z","createdDateTime":"2021-02-23T02:42:08Z","expirationDateTime":"2021-02-24T02:42:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '09d95e4a-5bb5-47ac-b40d-c79119ef73be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5108b187-bfa8-4072-b1ee-dc8708f4016e')
  .query(true)
  .reply(200, {"jobId":"5108b187-bfa8-4072-b1ee-dc8708f4016e","lastUpdateDateTime":"2021-02-23T02:42:08Z","createdDateTime":"2021-02-23T02:42:08Z","expirationDateTime":"2021-02-24T02:42:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f84cb656-b902-4771-88fd-9da4aaabbe77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5108b187-bfa8-4072-b1ee-dc8708f4016e')
  .query(true)
  .reply(200, {"jobId":"5108b187-bfa8-4072-b1ee-dc8708f4016e","lastUpdateDateTime":"2021-02-23T02:42:08Z","createdDateTime":"2021-02-23T02:42:08Z","expirationDateTime":"2021-02-24T02:42:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'd394339a-21c7-4fa5-aaf2-fff2f02d3b10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5108b187-bfa8-4072-b1ee-dc8708f4016e')
  .query(true)
  .reply(200, {"jobId":"5108b187-bfa8-4072-b1ee-dc8708f4016e","lastUpdateDateTime":"2021-02-23T02:42:11Z","createdDateTime":"2021-02-23T02:42:08Z","expirationDateTime":"2021-02-24T02:42:08Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  'ff30fc34-c618-48a4-8334-8fb20eaa43bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/5108b187-bfa8-4072-b1ee-dc8708f4016e')
  .query(true)
  .reply(200, {"jobId":"5108b187-bfa8-4072-b1ee-dc8708f4016e","lastUpdateDateTime":"2021-02-23T02:42:11Z","createdDateTime":"2021-02-23T02:42:08Z","expirationDateTime":"2021-02-24T02:42:08Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '25042d00-9680-4848-b624-1ee4071e79ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:13 GMT'
]);
