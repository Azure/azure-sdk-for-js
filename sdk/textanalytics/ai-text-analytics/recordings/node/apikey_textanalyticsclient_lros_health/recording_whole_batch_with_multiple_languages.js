let nock = require('nock');

module.exports.hash = "4ef5201e02a9fc85b112c0ed27c5ed5b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"I should take my cat to the veterinarian."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/c1720127-7f24-4672-9c92-3b38d0076f88',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  '0c91834b-42b3-472e-9c8b-a5e154805d6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:37 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/c1720127-7f24-4672-9c92-3b38d0076f88')
  .query(true)
  .reply(200, {"jobId":"c1720127-7f24-4672-9c92-3b38d0076f88","lastUpdateDateTime":"2021-08-03T03:16:38Z","createdDateTime":"2021-08-03T03:16:38Z","expirationDateTime":"2021-08-04T03:16:38Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '5e1bcbee-bae4-49dc-bd7c-de261d0ec8ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:37 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/c1720127-7f24-4672-9c92-3b38d0076f88')
  .query(true)
  .reply(200, {"jobId":"c1720127-7f24-4672-9c92-3b38d0076f88","lastUpdateDateTime":"2021-08-03T03:16:38Z","createdDateTime":"2021-08-03T03:16:38Z","expirationDateTime":"2021-08-04T03:16:38Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '5100ac1b-3725-448b-a61a-27545af254f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:38 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/c1720127-7f24-4672-9c92-3b38d0076f88')
  .query(true)
  .reply(200, {"jobId":"c1720127-7f24-4672-9c92-3b38d0076f88","lastUpdateDateTime":"2021-08-03T03:16:38Z","createdDateTime":"2021-08-03T03:16:38Z","expirationDateTime":"2021-08-04T03:16:38Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.98}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '4fbb9eb2-1181-4f86-9322-de88a4e26699',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:40 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/c1720127-7f24-4672-9c92-3b38d0076f88')
  .query(true)
  .reply(200, {"jobId":"c1720127-7f24-4672-9c92-3b38d0076f88","lastUpdateDateTime":"2021-08-03T03:16:38Z","createdDateTime":"2021-08-03T03:16:38Z","expirationDateTime":"2021-08-04T03:16:38Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":28,"length":12,"text":"veterinarian","category":"HealthcareProfession","confidenceScore":0.98}],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'd86ee905-1745-4d2a-afc5-931ff95a8001',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:40 GMT'
]);
