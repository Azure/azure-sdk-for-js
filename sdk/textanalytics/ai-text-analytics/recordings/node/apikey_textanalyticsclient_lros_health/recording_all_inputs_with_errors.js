let nock = require('nock');

module.exports.hash = "0c018911d7b8c915100686d9373b4af8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/3847b2e6-ce02-44c2-ab26-af3bd0c047f1',
  'x-envoy-upstream-service-time',
  '192',
  'apim-request-id',
  'a6a83ee2-dafd-4690-a8d7-d8335b2b87b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3847b2e6-ce02-44c2-ab26-af3bd0c047f1')
  .query(true)
  .reply(200, {"jobId":"3847b2e6-ce02-44c2-ab26-af3bd0c047f1","lastUpdateDateTime":"2021-08-03T22:43:08Z","createdDateTime":"2021-08-03T22:43:07Z","expirationDateTime":"2021-08-04T22:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '32a3b043-5501-424a-94e1-a183c5dcbbd5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3847b2e6-ce02-44c2-ab26-af3bd0c047f1')
  .query(true)
  .reply(200, {"jobId":"3847b2e6-ce02-44c2-ab26-af3bd0c047f1","lastUpdateDateTime":"2021-08-03T22:43:08Z","createdDateTime":"2021-08-03T22:43:07Z","expirationDateTime":"2021-08-04T22:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '60c5abfc-ba70-4751-a534-6e6c0cc809f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3847b2e6-ce02-44c2-ab26-af3bd0c047f1')
  .query(true)
  .reply(200, {"jobId":"3847b2e6-ce02-44c2-ab26-af3bd0c047f1","lastUpdateDateTime":"2021-08-03T22:43:10Z","createdDateTime":"2021-08-03T22:43:07Z","expirationDateTime":"2021-08-04T22:43:07Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '62be91ef-8364-468c-8816-60b7daef3803',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3847b2e6-ce02-44c2-ab26-af3bd0c047f1')
  .query(true)
  .reply(200, {"jobId":"3847b2e6-ce02-44c2-ab26-af3bd0c047f1","lastUpdateDateTime":"2021-08-03T22:43:10Z","createdDateTime":"2021-08-03T22:43:07Z","expirationDateTime":"2021-08-04T22:43:07Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '2b461dc3-aa49-465f-896f-b272f066ae11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:10 GMT'
]);
