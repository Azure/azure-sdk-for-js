let nock = require('nock');

module.exports.hash = "07f4354e7214c08dffb0a4ba6f383ede";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/705c3b1b-d1bd-41de-8032-0b980dd3206d',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  'a0304492-95fb-4280-a83b-d0bc755dc744',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/705c3b1b-d1bd-41de-8032-0b980dd3206d')
  .query(true)
  .reply(200, {"jobId":"705c3b1b-d1bd-41de-8032-0b980dd3206d","lastUpdateDateTime":"2021-08-03T22:43:16Z","createdDateTime":"2021-08-03T22:43:16Z","expirationDateTime":"2021-08-04T22:43:16Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '044e18cb-8c16-4e70-8791-dcbb0dcac380',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/705c3b1b-d1bd-41de-8032-0b980dd3206d')
  .query(true)
  .reply(200, {"jobId":"705c3b1b-d1bd-41de-8032-0b980dd3206d","lastUpdateDateTime":"2021-08-03T22:43:16Z","createdDateTime":"2021-08-03T22:43:16Z","expirationDateTime":"2021-08-04T22:43:16Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '17f7fd99-3102-4bc1-8fc2-ffdc4984f643',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/705c3b1b-d1bd-41de-8032-0b980dd3206d')
  .query(true)
  .reply(200, {"jobId":"705c3b1b-d1bd-41de-8032-0b980dd3206d","lastUpdateDateTime":"2021-08-03T22:43:17Z","createdDateTime":"2021-08-03T22:43:16Z","expirationDateTime":"2021-08-04T22:43:16Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'ba447a93-6ebc-4281-b4a0-0116491d5bf1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/705c3b1b-d1bd-41de-8032-0b980dd3206d')
  .query(true)
  .reply(200, {"jobId":"705c3b1b-d1bd-41de-8032-0b980dd3206d","lastUpdateDateTime":"2021-08-03T22:43:17Z","createdDateTime":"2021-08-03T22:43:16Z","expirationDateTime":"2021-08-04T22:43:16Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '71b7f145-3e73-4b10-8773-e32ab2ad975e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:18 GMT'
]);
