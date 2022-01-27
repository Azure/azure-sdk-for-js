let nock = require('nock');

module.exports.hash = "efe63fbb523fcf030074aa573e076058";

module.exports.testInfo = {"uniqueName":{"1":"modelName164330883139304044"},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/formrecognizer/documentModels:build', {"modelId":"modelName164330883139304044","buildMode":"neural","azureBlobSource":{"containerUrl":"https://storageaccount/trainingdata?sastoken"}})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'operation-location',
  'https://endpoint//formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af?api-version=2022-01-30-preview',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '3132d5de-fde2-4b41-a0c2-f59b34d7c4af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:40:30 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:31Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'dc102ee5-7df3-47ab-8fdf-5a6feff4ed56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:40:30 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"notStarted","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:31Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'aabc9589-bf9e-47f2-8225-c33c30eab75d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:40:31 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'b7c23ad4-2fad-4c6e-a854-b2412d6d6015',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:40:36 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'cd8eba5c-6277-4756-8a71-1fa702599d4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:40:41 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  'a24e19c1-bd31-479d-8c95-76a70aaaeaf0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:40:47 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '5c2b8924-3d92-4218-bc5e-e82ee184fa8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:40:52 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'f35cdb50-6a4c-4a54-afed-82d4abc20370',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:40:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '7d70c094-3951-4c6e-a944-0eadd0aa7073',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:02 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '98171ae1-06a2-4147-8ee1-8798400dc943',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:07 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'd8c08427-8ab0-4f24-b74a-d1734c0b9f32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:12 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '9bcccb1c-6fef-41f6-ac07-165a850e3829',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:17 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '05bed800-3786-4b62-bb53-8c44389285ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:22 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'fb902e06-6434-453b-9956-aa91446e6485',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:27 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:40:34Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'ceb4648b-ef37-4c98-9fed-04c84b0995e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'da89cef1-67e7-4b81-8c9e-632a9804fff5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:38 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '13f9db5d-c822-4e6e-b62e-3eb929259e1d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '64e1b3e4-a4fb-4b11-bf66-6b9df1a39bb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:47 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '7bc223da-2d4d-476f-bb93-99aabf4ae610',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  'ce4fdd23-d3d7-4fd1-9d1c-13019cf8edc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:41:58 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '3571e750-1473-478f-97ef-57987231bbd3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:42:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '5e60f7b8-6488-428c-9238-dd92225e4511',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:42:09 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '6d06ff5a-ca39-4904-acd9-1afa32a7e2a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:42:14 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '9b4109fa-2a60-45b6-a09a-a3268f81a09c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:42:19 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '11ce5966-8db3-4377-aedf-78becd3d6c9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:42:24 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'f9d0208d-658c-4a5d-88fb-6212fc2ec383',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:42:29 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:41:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '32c3a482-9cf3-4ccd-9157-e6cbc312b551',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:42:34 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '313',
  'apim-request-id',
  'cf6e9998-f255-4d5a-832f-33939db60bc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:42:39 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'afcb259d-ff4e-4ec4-99e8-c83b5eb31ae6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:42:44 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '580c0a10-7e6d-4302-959a-1226fdedd663',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:42:50 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'ca3f8d20-96bc-4679-9c59-d4a20822c534',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:42:54 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'c3801e55-5809-43df-8801-82d7b8c4b96b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:00 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '4c8f7426-0717-4dd5-8417-12a63603f822',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:05 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '668236ce-3cc2-4737-bb6c-167cb84fd69e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:10 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'd1476231-27e7-426d-9e17-4e8e6b0cec53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:16 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '05e2b6c5-06dd-485b-8fbe-2b00ac699d01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:21 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '7a398641-7718-40c9-8cec-a4e71180f5c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:26 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '6f189773-425e-45e7-8003-a2522b07f0f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:31 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:42:36Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '1088f45c-b013-4eea-8e93-750d66d3ab9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:36 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '51706937-aad4-4a1b-a508-3fe5ec0b3727',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:41 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '514b8c88-03f4-4b5f-bd56-2ae8d6f7017a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:46 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'e6af6e6c-f611-4e4c-b9fb-35b21917972a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:51 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'ec77a224-d56d-4a58-8e0f-2e2a966cd5db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:43:56 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '7f0b2b0a-540a-40d9-b4e0-fea4e92d52b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:01 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '4f64b31f-904f-4bd7-a83b-ce3b9f53e486',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:07 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'ddab856f-6215-417b-a4bb-ef44624f2711',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:12 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '476',
  'apim-request-id',
  'b11eac6d-65a3-44a1-95bf-59a6534ff26c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:17 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '815d8d94-7276-41c1-8318-da7c2d4fa041',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:22 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'f8344128-a5fd-4e85-a7b4-940d4c231a4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:28 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'af98e80b-d791-4c88-bc6c-636f12b449fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:32 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:43:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '20fe48a1-e539-4961-b39a-df3c4e774eaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:38 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'a0a33dc7-496f-42cd-87de-efffd8280cdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '259d426f-31a9-4382-bab8-7bba9347b8aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:47 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '891a3455-5fd8-4e5e-acdf-30a70614f760',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '60b3e7c5-912a-4df5-8d0b-b8b037d33aac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:44:58 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '8fa2b4cd-2846-4a88-ade9-e8c7c5494db2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:45:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '3b45e56c-3782-4321-a136-3974d6b396e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:45:08 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'f988089e-508f-43db-9a47-40630f8b1ac3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:45:14 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '9d9de005-70ef-414c-bb28-b80b7a13355c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:45:19 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '01e10594-b908-4c15-8779-ff4cdcfbeb2f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:45:23 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'd6247c3e-d740-435e-a7ed-805108c52328',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:45:29 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '07498e92-6dd4-4f6a-b51b-69990277e4bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:45:34 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:44:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '363efb01-ef93-4f1c-92c0-fe721f50e503',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:45:39 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'e5167b3b-284c-425a-9d7e-1f6a7a78a052',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:45:44 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'b2a52f6c-8ac1-4dcb-b0aa-ce007b663b69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:45:49 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '392b91e7-0147-409c-9196-9014c73fba30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:45:54 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '18929577-7151-48f3-a23d-5d11ef606210',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:00 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'b6ff9817-783a-43f7-85bc-b01949d60dc4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:04 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '23bfefba-3098-42a0-93dc-0c8125ab5e1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:10 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '9ca07d71-3cbd-449b-a003-bb2cdc51a6be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:14 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '19dd6ee6-ede5-402b-a792-0c712c1e1a18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:20 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '86148342-d9c4-4d2b-9bc8-912b378d0b80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:24 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '6a1a6b60-4455-45fa-b42b-7aae44d3b37a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:30 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'c07fc997-ddd3-429b-8e15-0e39d222ecef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:35 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '365f48b1-1a2d-4fc4-be9b-cd03b16d46d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:40 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:45:41Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'b62b20db-ddd5-400a-828b-65063fce76b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:46 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:46:46Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '8e6d8d7b-983e-487b-8986-8024b0a5af15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:50 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:46:46Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '611d7ed9-e7a7-4a97-b2fc-e4e7eeeae743',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:46:56 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:46:46Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '4735a400-1954-49e5-913e-763eac0ef066',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:00 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:46:46Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  '5888567e-a97c-4a3e-9833-b6f1de746b00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:06 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:46:46Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '1e665716-2067-4b90-8c84-966fcb60837b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:11 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:46:46Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '638b7a6b-878f-4858-bd7e-b9dfe8e0cc69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:16 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:46:46Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '9a3bedf5-1204-432f-8f1d-14a27e58e0e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:21 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:46:46Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '4bb9194e-8523-43eb-9be0-10a9ddd6aa42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:26 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:46:46Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'e1b696b6-f57e-48ce-8855-7275c3abf8b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:32 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:46:46Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '5baffa3e-9e5c-4a93-972e-c95e05f82794',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:37 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:46:46Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '9274cf19-a960-444e-be9a-acbfd571d061',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:42 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '19bffc28-006d-4268-a0db-6b7ca802c252',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:47 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '3535540d-e31a-433b-9851-f61324930e36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:52 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '3e59d4ff-1349-4a00-9796-5a4d5a8492d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:47:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'dec3e066-e766-439d-ae91-dd6fdd09502a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:02 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '233',
  'apim-request-id',
  'ae671b57-4f5e-461e-a2bc-159c130384b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:08 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '2d73c0e4-e4fc-403f-81f8-70ee8a3f05a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:13 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '51250f79-1fe9-4b13-a67c-1dbb5d1863d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:18 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '875f179a-9121-4aa9-a82a-f8ecf7a05e93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:23 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '68f1f049-3898-4363-ad58-759068e06bda',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:28 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '9b9373e6-821e-4d4f-8260-685db75be8eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '9548df99-f249-452c-8698-209a5e48924d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:38 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:47:47Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'b6de29dc-267e-49fc-a372-c44e1591f8be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '419e43c9-037b-4011-ba34-886876d4e599',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:49 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '1efca24a-f724-4915-98f4-239d29f376d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:54 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'b0d23295-c024-48c0-9314-230e2d213385',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:48:59 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'fa7ecebf-02ad-4247-ac03-73cbf7d319ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:49:04 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '794b42be-6c3e-480b-8edd-fa852cae0c32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:49:09 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'c333179a-d285-44dc-b9be-c01f72323a53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:49:14 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '9197f89b-bd50-4c93-ac25-f366f2a549f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:49:19 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '8cd63d4d-5937-42e8-8d90-ac2d515d49da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:49:24 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '3dd453cf-f237-422f-bb8d-5dff18f6b69c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:49:29 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'ce4345ef-5372-418b-a57c-e3d88b09a708',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:49:35 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '7ba1cd82-48b5-4962-a495-7c5a15b83b30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:49:40 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '9af41db3-70fa-4607-80f0-99a232b30aff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:49:45 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:48:48Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '92fc050d-9f4e-43be-a52b-b1688b7869a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:49:50 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'c284c08e-7d3d-4c28-aca3-4c6d33e3550a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:49:55 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '01717425-5f9a-4eaf-a712-2bc8e4db05db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:00 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  'ee087c73-9c74-4cb2-9dd2-02c3cd8f154f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:05 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'f311fc62-a6eb-43a4-a760-5b6fb0302951',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:10 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '09713a9d-e009-4f53-a32d-97fdd3db21de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:15 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'cbd7aa66-2ed0-4866-8c7e-4dafc227f465',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:20 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'be8d221e-2d16-459e-9d57-4cfa2dbd8672',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:25 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'c9cd60cc-72fd-4c1d-8086-6a16db21082f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:31 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  '9389d212-580d-4832-a586-ec83d757e7fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:36 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '70178a28-8801-47ad-8bcc-d904572b054e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:41 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '3e6068b9-b963-498c-9a5a-1140870a69a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:46 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'caa5be66-437f-4994-a156-2fc48e0c1b06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:51 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:49:51Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '8ff4ee2a-c705-43b4-878d-24a0567064ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:50:56 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '05dc5b8c-3216-4dd6-a0b8-3ea829f3b5d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:01 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '4467f150-344e-4384-af07-5e36d19b6df6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:06 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '8ad03134-882a-48a9-bd38-070a126cb1e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:11 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '882e0662-4872-4ce9-ab2d-d99bab59f05c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:17 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'ab37156c-6154-487f-bb6b-cc98e1cd9cb6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:22 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '48311bc0-e07a-4b17-a4af-b0f7ba1df77b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:27 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '2c102308-605e-4844-95fe-b3a8fa580acc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:32 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'bb921e54-a5bc-4140-a536-c862ed038451',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:37 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'f4200a6d-672f-4a7b-a2d8-7b7b64e1ea7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:42 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '4c0a1ce6-dcda-4f86-ba4e-f49ec5ba7882',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:47 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '8ccd11c0-9ac2-4d9b-8212-a7fbc6348ca1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:52 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"running","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:50:56Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  '4bd55681-d4e9-4bbf-a392-e0ff00f12160',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:51:58 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/formrecognizer/operations/31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af')
  .query(true)
  .reply(200, {"operationId":"31523059169_3132d5de-fde2-4b41-a0c2-f59b34d7c4af","kind":"documentModelBuild","status":"succeeded","createdDateTime":"2022-01-27T18:40:31Z","lastUpdatedDateTime":"2022-01-27T18:52:00Z","resourceLocation":"https://endpoint//formrecognizer/documentModels/modelName164330883139304044?api-version=2022-01-30-preview","percentCompleted":100,"result":{"docTypes":{"modelName164330883139304044":{"fieldSchema":{"Merchant":{"type":"string"},"PhoneNumber":{"type":"string"},"Website":{"type":"string"},"Email":{"type":"string"},"PurchaseOrderNumber":{"type":"string"},"DatedAs":{"type":"string"},"VendorName":{"type":"string"},"CompanyName":{"type":"string"},"CompanyAddress":{"type":"string"},"CompanyPhoneNumber":{"type":"string"},"Subtotal":{"type":"string"},"Tax":{"type":"string"},"Total":{"type":"string"},"Signature":{"type":"string"},"Quantity":{"type":"number"},"FullSignature":{"type":"signature"}},"buildMode":"neural"}},"modelId":"modelName164330883139304044","createdDateTime":"2022-01-27T18:52:00Z","apiVersion":"2022-01-30-preview"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'b299d3de-25bd-42c5-b1a1-f0de0dd9bf92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 18:52:03 GMT'
]);
