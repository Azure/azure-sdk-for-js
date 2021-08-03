let nock = require('nock');

module.exports.hash = "0c018911d7b8c915100686d9373b4af8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/8ee2055a-c9ad-49a3-b34b-1940f80f93e8',
  'x-envoy-upstream-service-time',
  '336',
  'apim-request-id',
  'dabd9c9b-4c2b-4f14-a003-4a43ae951da8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/8ee2055a-c9ad-49a3-b34b-1940f80f93e8')
  .query(true)
  .reply(200, {"jobId":"8ee2055a-c9ad-49a3-b34b-1940f80f93e8","lastUpdateDateTime":"2021-08-03T03:15:44Z","createdDateTime":"2021-08-03T03:15:44Z","expirationDateTime":"2021-08-04T03:15:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b8e7d0f2-8b0d-4820-a7e8-a5df3a432224',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:44 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/8ee2055a-c9ad-49a3-b34b-1940f80f93e8')
  .query(true)
  .reply(200, {"jobId":"8ee2055a-c9ad-49a3-b34b-1940f80f93e8","lastUpdateDateTime":"2021-08-03T03:15:44Z","createdDateTime":"2021-08-03T03:15:44Z","expirationDateTime":"2021-08-04T03:15:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'b6769127-c33b-4473-a2ab-a7f6489368ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:44 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/8ee2055a-c9ad-49a3-b34b-1940f80f93e8')
  .query(true)
  .reply(200, {"jobId":"8ee2055a-c9ad-49a3-b34b-1940f80f93e8","lastUpdateDateTime":"2021-08-03T03:15:44Z","createdDateTime":"2021-08-03T03:15:44Z","expirationDateTime":"2021-08-04T03:15:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '43851ae1-bd03-47c9-be8d-a59a0572dc44',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:46 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/8ee2055a-c9ad-49a3-b34b-1940f80f93e8')
  .query(true)
  .reply(200, {"jobId":"8ee2055a-c9ad-49a3-b34b-1940f80f93e8","lastUpdateDateTime":"2021-08-03T03:15:47Z","createdDateTime":"2021-08-03T03:15:44Z","expirationDateTime":"2021-08-04T03:15:44Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'bdd926f9-63cd-4488-bf3b-e2d72888e502',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:48 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/8ee2055a-c9ad-49a3-b34b-1940f80f93e8')
  .query(true)
  .reply(200, {"jobId":"8ee2055a-c9ad-49a3-b34b-1940f80f93e8","lastUpdateDateTime":"2021-08-03T03:15:47Z","createdDateTime":"2021-08-03T03:15:44Z","expirationDateTime":"2021-08-04T03:15:44Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'be77e8e2-63c8-4952-94f8-a44402a66a1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:48 GMT'
]);
