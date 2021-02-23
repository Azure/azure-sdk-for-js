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
  'Content-Length',
  '1331',
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
  '30cddf92-bbfc-4042-a50d-a6068e570d00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAHVnxtcOAAAA; expires=Thu, 25-Mar-2021 03:05:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:05:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"bad","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}},{"parameters":{"model-version":"bad","stringIndexType":"TextElements_v8"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a',
  'x-envoy-upstream-service-time',
  '382',
  'apim-request-id',
  'fd3559bd-b9e7-47de-a1e6-796ddbeee7c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:05:59Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:05:59Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '2c3dd60d-c281-4d65-93f1-ac40b6f78aad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:05:59Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:05:59Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '531af48e-703a-4dcd-842c-63e20ea9cd6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:05:59Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:05:59Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '91a7cf88-cd00-4819-87ea-71ef614f1592',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '792b80a7-45e1-4846-b99b-02d731df5872',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'ac0b37d6-4e98-49cc-a3d2-ff74fc27283b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'e4e5b681-78eb-45dd-ac7e-e6f3adbc13af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'b674af93-bd36-4b49-bfdd-7aa75a4ac740',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'd9e3e95b-74c0-4fc1-b25e-d2f35e3f8811',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  'e4fc0d96-9e72-41ac-844a-015002b79993',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  'f88c46a8-37a7-41d8-ab2f-7835b266fabf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '01fb4022-2b92-47b8-b41a-1ffa4becfd6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '272',
  'apim-request-id',
  '28df2276-75b6-4801-877f-1e71e7cfd4a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  'b7bc22dc-b851-45fa-9099-7de90028b6e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '3bb74c98-0167-454a-9368-c38759243d6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '246807c4-ae8c-452c-9392-72e83c8a54b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:27 GMT'
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
  '9bd38455-b072-419f-967e-55cf06a00d00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAHVnxtcOAAAA; expires=Thu, 25-Mar-2021 03:06:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:06:28 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  'd6546f2c-ae59-4223-a974-b8a284b87f56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '8008b69c-9650-451f-b110-d72af1a10da8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '28901fa6-7572-4b6a-b3b1-6c006de8d28a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '854bbc05-d9bd-450b-9648-8b4f7bc1e291',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '2d7235d1-fb5a-4e69-b9ed-5ac2fc3f7db0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'aca1852f-8fde-4cbf-b349-1ffdd479628f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '8c26ddd9-0efa-42a2-a7b3-eb06839c85b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'd8226c51-2395-46fa-9adb-419a7cd2a80f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'df3a92c3-0a0e-42e2-a353-84db26b05afa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '9aaa63ae-d11a-4d95-958f-6f262e340b27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '30b0ba93-21fb-4ed7-a371-35bb43a842e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '11e8f92c-675c-4f4f-8816-e771d881827a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '9efd7e48-0567-4c8b-80d2-877765682fe5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '14c10d48-edb3-40f6-a558-ca2093994ddf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '9214b757-8358-414a-8861-7f7630f36b9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:06:58 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  'c74946cb-8f27-44e6-9452-63e686620f00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAHVnxtcOAAAA; expires=Thu, 25-Mar-2021 03:07:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:07:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'f784306f-102d-4a35-a37a-763bcb88271f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  'f7b58848-381b-4d10-b025-efa1930db251',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '0ad826fe-94bb-4d17-ac45-af1b72b05797',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'd079405b-45a1-43c6-8761-09be278ff90d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  '1f9ca3c2-9e5d-4581-bc43-2437ba8b9cbe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '6abd36e3-34ca-4bab-9289-20bf62e2ccdd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'cc87599f-281b-4d77-85d0-a5a467edc431',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'cfcb8223-eff1-4f5d-a750-91f2e8c38f9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  '7ab5b4b1-2a05-49c1-a898-51e18f99e532',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '45a247f8-3e3e-4665-b140-fdae38dad69f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '783204f3-1aa1-4636-bcf5-b42d1faeeff9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'bb086bd8-794d-4447-a41a-a7125ef74f93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '2fd3e1eb-ee3d-4129-a87e-05f7ba8b6daf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'f7e12512-94b8-4873-ac67-c2b93ea14102',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '8a3b3a87-09ba-4980-a56b-3b6016a2c81e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:30 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '3fd7a29f-e62a-4ed5-9d36-54df62960b00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAHVnxtcOAAAA; expires=Thu, 25-Mar-2021 03:07:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:07:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'c72ab2c8-f4da-4ec7-9b05-640fc8452023',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  '5341c555-8f12-4936-8834-99dea78a79a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'ed9bd8d5-d86b-469c-94f7-139df7fa820f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '332',
  'apim-request-id',
  '24fea8cf-d7e8-4526-a306-438782a8c105',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'b809990c-e348-4065-98a7-579bda9dcfd8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '235',
  'apim-request-id',
  '51c996f9-607b-4800-b99e-360be35dcac2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '1aa91340-510c-40cb-b615-44bc9467ca47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '096c1103-c63c-497e-9235-957dac1acb03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '5580f939-30b7-4385-82a1-6a3fa163c0e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '47addfe7-afb3-4b92-ab6f-b8ac91b7fb54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'e6991996-e0e6-4cf1-9bed-867e96852f41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '04419747-2529-429f-b446-adb3a6f8f8d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'e8b0d4ca-1ade-4087-b49a-188d0137bcc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:07:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '8f9a2395-17fd-4be5-b9b0-529e5a4eefdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:08:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '039c38a5-1b78-4889-ae74-7d90655c0163',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:08:02 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  'bd3757ec-89e9-4647-b7ae-377cdb380d00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAHVnxtcOAAAA; expires=Thu, 25-Mar-2021 03:08:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:08:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '989',
  'apim-request-id',
  '122b0921-7faf-4df5-89f8-833c9f750b6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:08:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"running","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":0,"failed":2,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  'f7aabb82-be15-46fe-844a-fa9166eac3c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:08:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"partiallySucceeded","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":1,"failed":2,"inProgress":0,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  '2ddda39e-7711-4191-9b6d-f96a06405b02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:08:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a63b3c95-d2d6-4a81-9d9d-abd3a8df592a')
  .query(true)
  .reply(200, {"jobId":"a63b3c95-d2d6-4a81-9d9d-abd3a8df592a","lastUpdateDateTime":"2021-02-23T03:06:03Z","createdDateTime":"2021-02-23T03:05:59Z","expirationDateTime":"2021-02-24T03:05:59Z","status":"partiallySucceeded","errors":[{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/0"},{"code":"InvalidRequest","message":"Job task parameter value bad is not supported for model-version parameter for job task type PersonallyIdentifiableInformation. Supported values latest,2020-07-01,2021-01-15.","target":"#/tasks/entityRecognitionPiiTasks/2"}],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:06:03Z"},"completed":1,"failed":2,"inProgress":0,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}},{"lastUpdateDateTime":"2021-02-23T03:06:03.0183175Z","state":"failed"}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '10539ec5-047c-4341-9eb7-e65553aa4a43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:08:09 GMT'
]);
