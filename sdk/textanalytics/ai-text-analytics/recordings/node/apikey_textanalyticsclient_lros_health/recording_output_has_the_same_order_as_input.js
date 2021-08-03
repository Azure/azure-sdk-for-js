let nock = require('nock');

module.exports.hash = "07f4354e7214c08dffb0a4ba6f383ede";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/cf7adea5-ad41-41dc-8e6c-891fd6a46b84',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  'dc10dbf2-e1a7-4bdb-a7bf-dfaf30e1b6f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:15 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/cf7adea5-ad41-41dc-8e6c-891fd6a46b84')
  .query(true)
  .reply(200, {"jobId":"cf7adea5-ad41-41dc-8e6c-891fd6a46b84","lastUpdateDateTime":"2021-08-03T03:16:15Z","createdDateTime":"2021-08-03T03:16:15Z","expirationDateTime":"2021-08-04T03:16:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '9dce42e6-8609-418a-92b7-290cb5b972cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:15 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/cf7adea5-ad41-41dc-8e6c-891fd6a46b84')
  .query(true)
  .reply(200, {"jobId":"cf7adea5-ad41-41dc-8e6c-891fd6a46b84","lastUpdateDateTime":"2021-08-03T03:16:15Z","createdDateTime":"2021-08-03T03:16:15Z","expirationDateTime":"2021-08-04T03:16:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e6eb9e06-fca0-4660-8a32-b173cb7965f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:15 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/cf7adea5-ad41-41dc-8e6c-891fd6a46b84')
  .query(true)
  .reply(200, {"jobId":"cf7adea5-ad41-41dc-8e6c-891fd6a46b84","lastUpdateDateTime":"2021-08-03T03:16:17Z","createdDateTime":"2021-08-03T03:16:15Z","expirationDateTime":"2021-08-04T03:16:15Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  '7af4c785-9ac2-43a7-999d-752ffb1785d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:18 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/cf7adea5-ad41-41dc-8e6c-891fd6a46b84')
  .query(true)
  .reply(200, {"jobId":"cf7adea5-ad41-41dc-8e6c-891fd6a46b84","lastUpdateDateTime":"2021-08-03T03:16:17Z","createdDateTime":"2021-08-03T03:16:15Z","expirationDateTime":"2021-08-04T03:16:15Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '9d70fbda-179e-4ec9-9eed-c031543c619c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:18 GMT'
]);
