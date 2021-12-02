let nock = require('nock');

module.exports.hash = "2d6dc378f178664fbb5e419f53f37dd5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/2cc9827f-2f2f-4618-851b-32ded368c22d',
  'x-envoy-upstream-service-time',
  '626',
  'apim-request-id',
  '4877db36-1120-47eb-8f96-d04fc28baf6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2cc9827f-2f2f-4618-851b-32ded368c22d')
  .query(true)
  .reply(200, {"jobId":"2cc9827f-2f2f-4618-851b-32ded368c22d","lastUpdateDateTime":"2021-10-23T00:42:35Z","createdDateTime":"2021-10-23T00:42:35Z","expirationDateTime":"2021-10-24T00:42:35Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'd826ebaf-6324-4d4d-85a6-61e97fade55a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2cc9827f-2f2f-4618-851b-32ded368c22d')
  .query(true)
  .reply(200, {"jobId":"2cc9827f-2f2f-4618-851b-32ded368c22d","lastUpdateDateTime":"2021-10-23T00:42:35Z","createdDateTime":"2021-10-23T00:42:35Z","expirationDateTime":"2021-10-24T00:42:35Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e2a5a15d-6433-4576-b20e-1de447a9b297',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2cc9827f-2f2f-4618-851b-32ded368c22d')
  .query(true)
  .reply(200, {"jobId":"2cc9827f-2f2f-4618-851b-32ded368c22d","lastUpdateDateTime":"2021-10-23T00:42:36Z","createdDateTime":"2021-10-23T00:42:35Z","expirationDateTime":"2021-10-24T00:42:35Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '27f5a868-408a-4f0b-ab39-8143219607a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2cc9827f-2f2f-4618-851b-32ded368c22d')
  .query(true)
  .reply(200, {"jobId":"2cc9827f-2f2f-4618-851b-32ded368c22d","lastUpdateDateTime":"2021-10-23T00:42:36Z","createdDateTime":"2021-10-23T00:42:35Z","expirationDateTime":"2021-10-24T00:42:35Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  'e1f5d73a-8734-43cd-85e7-ff6bd3e28ba0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:37 GMT'
]);
