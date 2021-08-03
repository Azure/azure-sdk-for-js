let nock = require('nock');

module.exports.hash = "bdca27f5194e1e922e90e3753a046f16";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/eabff3c5-ecde-4f53-be14-6203ed65c74f',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  '34b2418c-79f4-4d40-b8f7-e3f9bab2667e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/eabff3c5-ecde-4f53-be14-6203ed65c74f')
  .query(true)
  .reply(200, {"jobId":"eabff3c5-ecde-4f53-be14-6203ed65c74f","lastUpdateDateTime":"2021-08-03T03:16:33Z","createdDateTime":"2021-08-03T03:16:33Z","expirationDateTime":"2021-08-04T03:16:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '66c74108-55ec-45e9-87a0-af390fdd1134',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/eabff3c5-ecde-4f53-be14-6203ed65c74f')
  .query(true)
  .reply(200, {"jobId":"eabff3c5-ecde-4f53-be14-6203ed65c74f","lastUpdateDateTime":"2021-08-03T03:16:33Z","createdDateTime":"2021-08-03T03:16:33Z","expirationDateTime":"2021-08-04T03:16:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '58075a0e-9e4d-44c0-895c-eebeab3b11a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/eabff3c5-ecde-4f53-be14-6203ed65c74f')
  .query(true)
  .reply(200, {"jobId":"eabff3c5-ecde-4f53-be14-6203ed65c74f","lastUpdateDateTime":"2021-08-03T03:16:33Z","createdDateTime":"2021-08-03T03:16:33Z","expirationDateTime":"2021-08-04T03:16:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'cfa3e2f1-0fe7-44e0-b90b-b6672d28dd9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:35 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/eabff3c5-ecde-4f53-be14-6203ed65c74f')
  .query(true)
  .reply(200, {"jobId":"eabff3c5-ecde-4f53-be14-6203ed65c74f","lastUpdateDateTime":"2021-08-03T03:16:37Z","createdDateTime":"2021-08-03T03:16:33Z","expirationDateTime":"2021-08-04T03:16:33Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'd79d0774-e3ae-484e-8b8a-395e479c7ed2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:37 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/eabff3c5-ecde-4f53-be14-6203ed65c74f')
  .query(true)
  .reply(200, {"jobId":"eabff3c5-ecde-4f53-be14-6203ed65c74f","lastUpdateDateTime":"2021-08-03T03:16:37Z","createdDateTime":"2021-08-03T03:16:33Z","expirationDateTime":"2021-08-04T03:16:33Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '6675a625-f9d1-4645-bfc0-85dff7c2e3ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:37 GMT'
]);
