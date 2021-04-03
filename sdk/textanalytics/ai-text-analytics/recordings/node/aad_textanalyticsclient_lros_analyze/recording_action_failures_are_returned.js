let nock = require('nock');

module.exports.hash = "0c1d176f079a7f3a55008c6d6c081cb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'bd8d1f52-6f88-4596-8d5b-f8e4c3cd1500',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DQAAAMdUx9cOAAAA; expires=Thu, 25-Mar-2021 19:58:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:58:42 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"bad","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"bad","stringIndexType":"TextElements_v8"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4',
  'x-envoy-upstream-service-time',
  '328',
  'apim-request-id',
  '17178db0-8717-4922-966c-03cde602b28d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:43Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:43Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '4bf64c3c-3d45-41c8-b473-32b3b871a07d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:43Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:43Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '34a2bbb1-447a-4f99-ab10-25caec18471a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '4289cccc-cd14-436e-b910-4e5285c509cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'eea67f3b-272a-4089-b7a2-477050eb7a07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  'aea08ca0-a321-4807-9727-37ad63c31e07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '5e0c8d53-8812-4c3e-bc52-317e6653df53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'bb0de3e5-08e9-4cdb-80c9-6d93f865ab96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '4bd23268-fae6-4635-965e-a20421d4bf88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'ebbf4408-8562-4f5d-b198-841e16fde440',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '720a47d3-c6b7-4ee6-871c-4e15abfa4dac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '768cd39a-1183-4ac3-aa16-7d143b1d427b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  'ea70547b-4a1e-4bba-ad05-b7c2d1999be8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '540',
  'apim-request-id',
  'edb7edf0-6a7f-4f8a-bf5e-871e55f588fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '372',
  'apim-request-id',
  'e864efe7-95cb-44b6-806a-e1cac45738a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '4bec84f4-0a44-4662-b977-74974e6a0f95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:11 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'ea36187f-2417-477a-be87-bcc7db301500',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DgAAAMdUx9cOAAAA; expires=Thu, 25-Mar-2021 19:59:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:59:14 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '9c56ab34-eaeb-4bec-8814-d662080501f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '5b5eb56a-55eb-496d-aff3-a3663f090e96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'c2f664ae-554f-4171-b38c-d2702f97097f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '8c554b42-d342-47e8-b1ed-91abd7bda550',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '139c62d0-50c3-4586-a966-58857ab6b187',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '51bb878d-c989-4164-bf28-9b397259dac6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'ef693d83-16f3-4413-8db6-888ea7e863c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  'dbfc751a-73d0-4024-bc6b-859e53b0d17d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'd77cbeed-4457-4c50-bf3d-d5b989f4bd04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '9272a0cc-8982-4efb-9ecf-faa15d8211f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '3ca44a6d-b596-4395-ab90-5cb4b099723f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'eb2d4b7f-ecc5-41c9-9c61-bcca460fe2af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '144931b0-991e-4c07-816e-ab89fcdcef6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '4576da30-2b1a-491e-8e5c-ddbe48daacaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '340',
  'apim-request-id',
  '843b3534-54a6-44ed-b848-ca21bc5a0b92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:44 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '9e35da31-8af8-49be-9bc1-eeff1cb50000',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DwAAAMdUx9cOAAAA; expires=Thu, 25-Mar-2021 19:59:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:59:46 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '81507ffd-1a02-4b51-9d6b-de36e814fa8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'f68bf71f-8148-4437-9e6a-568b975562f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'fd686d9b-b290-4f30-ad80-707ac4946863',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"partiallySucceeded","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":1,"failed":2,"inProgress":0,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '743',
  'apim-request-id',
  '149d7296-437d-4880-b46a-4a77dc143e0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/f49fc5fe-00b9-4cb4-a792-85b9abdea6d4')
  .query(true)
  .reply(200, {"jobId":"f49fc5fe-00b9-4cb4-a792-85b9abdea6d4","lastUpdateDateTime":"2021-02-23T19:58:45Z","createdDateTime":"2021-02-23T19:58:43Z","expirationDateTime":"2021-02-24T19:58:43Z","status":"partiallySucceeded","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:58:45Z"},"completed":1,"failed":2,"inProgress":0,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-02-23T19:58:45.1144507Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'e47c17a8-ea55-45b2-88e1-19d572ecb57c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:59:53 GMT'
]);
