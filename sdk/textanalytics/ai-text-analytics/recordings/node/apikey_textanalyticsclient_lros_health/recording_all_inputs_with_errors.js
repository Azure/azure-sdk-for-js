let nock = require('nock');

module.exports.hash = "0c018911d7b8c915100686d9373b4af8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  'f2cab5b5-1d7a-4d39-a312-a1b7b30257b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:03Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '5090e588-02ed-4683-aa55-2116ef3663b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:03Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'a44a74c1-c973-46d2-943c-77460fe6b8f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:03Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  'd1986363-1466-422e-bd7e-109712ae5029',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:03Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '7abcc114-1f52-4217-b47a-c304b7607aec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:03Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '2f30d96a-c260-43ab-ab47-a30582251e9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:03Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '657f85d7-ef76-4dd5-a62d-0adb212bbe3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:03Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'ff6e16fb-540f-412a-9e8e-af1547b04e06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:03Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '75013ddf-2a7d-4879-99f0-7fba60147554',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:16Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '65f4e138-9a46-4f8c-baeb-27fbe6b33a73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:16Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'bc9314b8-61fe-4a16-909c-5bafe7456853',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:16Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'c033ecbb-3e58-4687-97f4-506957f46dfc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:16Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'ab85adbf-790b-430e-b332-894f3123680a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:16Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  'a1b3dd57-3525-4016-94ab-beba8835e110',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:27Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  'a7ae5b96-6521-4f7c-97ed-2f3a8c3065d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/60cef572-37cb-4927-8926-fd057d90ab0e')
  .query(true)
  .reply(200, {"jobId":"60cef572-37cb-4927-8926-fd057d90ab0e","lastUpdateDateTime":"2021-10-23T00:42:27Z","createdDateTime":"2021-10-23T00:42:03Z","expirationDateTime":"2021-10-24T00:42:03Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  'd6cd431e-a6d5-402f-8319-c2457198acad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:28 GMT'
]);
