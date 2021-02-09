let nock = require('nock');

module.exports.hash = "0c1d176f079a7f3a55008c6d6c081cb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '43720175-c77c-4660-af72-fe69dc0f4800',
  'x-ms-ests-server',
  '2.1.11459.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnHJHRxqM71KmcExfVMzal9z_bg1AQAAAM97r9cOAAAA; expires=Sun, 07-Mar-2021 17:47:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 05 Feb 2021 17:47:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"bad","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"bad","stringIndexType":"TextElements_v8"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000',
  'x-envoy-upstream-service-time',
  '231',
  'apim-request-id',
  'b3d7ef4d-c29f-4ae7-b6b2-ecb497adbb85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:01Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:01Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '05641a7c-5d9f-4faf-a5ab-992588b45f43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:01Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:01Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '04461ffc-0e3a-4a1c-bdc1-47c82164bee5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:01Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:01Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '035bc6dc-b943-49db-805c-5ccbeb8cea45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '7c26f02d-0715-4a41-a166-f1ec25c7703d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '8eedd429-0c9f-4cf3-8076-b0e5e1ee842c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'e7793937-4d7a-4303-82ca-16ff0d99f8cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '5186557b-1507-4eae-9d04-edbb29356441',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '5ea8dab5-77b5-4fcf-8174-8226028e00d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'd772e632-b2ad-45fc-a06f-4f2260372d54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '77f88bf3-c872-43fc-8349-1e46b02b198d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  'eccd472f-6978-4265-baab-a350d76eb222',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '7af38478-dc0f-4800-822f-d4ee5b8df3be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'e89866fd-9d9c-4dae-8878-f5bf1afc3f14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'e79fafc8-7ab1-45ab-8ac2-d2c8476a527c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '493e4b0d-0771-4074-9b8b-75bb2e93bfd3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'c6ba9633-5a9a-4b5d-b49a-301fb0b3f165',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:31 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '7e974386-ef2e-479c-9830-e1360be43c00',
  'x-ms-ests-server',
  '2.1.11459.15 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AnHJHRxqM71KmcExfVMzal9z_bg1AgAAAM97r9cOAAAA; expires=Sun, 07-Mar-2021 17:48:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 05 Feb 2021 17:48:30 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '1e60d27e-9653-4924-835f-5675b4698b63',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '5a52d5e4-db9c-438a-8727-7d4c09c44462',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '889799bf-bc27-4ec7-be7c-fa66437cfeda',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'f48ab878-01c3-467a-ba9a-efc2d19f9fc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '376f9f2b-0d86-4d65-b075-bfc58b1fb90e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'f44c06a1-1861-491a-ac8c-49faf1dea373',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'ccf832c9-5d0f-4143-8995-5b979ad94223',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '4fbaf6fa-8b7b-486b-a79d-0aa5b0e4c23a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '08733046-daa4-4e66-ae03-85524a558bfb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'd487af3b-4200-423c-94c9-4cfe7cc31b98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '82f8fb9d-7c81-42f4-a70a-53394952f489',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '678',
  'apim-request-id',
  '6695cfb6-c865-4259-94ff-e0c38aede434',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'c1c78026-8ace-4fa5-8f5e-21525a414867',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:48:58 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '3b0d0b20-ad92-4115-8d5e-a6ade3254600',
  'x-ms-ests-server',
  '2.1.11459.15 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnHJHRxqM71KmcExfVMzal9z_bg1AwAAAM97r9cOAAAA; expires=Sun, 07-Mar-2021 17:49:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 05 Feb 2021 17:49:01 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '574',
  'apim-request-id',
  '5044fb58-5a78-413e-a69c-b9ae693ebaa3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:49:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'd12b0a70-7570-4fb3-aec2-322c02a96ba9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:49:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  'a62edbcb-a284-47a0-a86c-cd0e60907569',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:49:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'b65e0993-4251-42f0-b2cd-86655a6655c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:49:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"partiallySucceeded","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":1,"failed":2,"inProgress":0,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  '336aba27-244d-4ff9-a5c4-1bba003371c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:49:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000')
  .query(true)
  .reply(200, {"jobId":"69431a24-225f-47f0-8276-9ebaaafe0362_637480800000000000","lastUpdateDateTime":"2021-02-05T17:48:04Z","createdDateTime":"2021-02-05T17:48:01Z","expirationDateTime":"2021-02-06T17:48:01Z","status":"partiallySucceeded","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-05T17:48:04Z"},"completed":1,"failed":2,"inProgress":0,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}},{"lastUpdateDateTime":"2021-02-05T17:48:04.3600788Z","results":{"documents":[],"errors":[],"modelVersion":""}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'cbd5904b-1b97-4a5f-a507-270310a7a45c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Feb 2021 17:49:10 GMT'
]);
