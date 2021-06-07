let nock = require('nock');

module.exports.hash = "b3ad7c6bd1c67bae64359f501d8d1c4d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/46571e12-d5e7-4172-95fb-39efb3dcca25',
  'x-envoy-upstream-service-time',
  '5213',
  'apim-request-id',
  '62e01dbe-fd72-4a0c-afd9-959e68d5d2c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/46571e12-d5e7-4172-95fb-39efb3dcca25')
  .query(true)
  .reply(200, {"jobId":"46571e12-d5e7-4172-95fb-39efb3dcca25","lastUpdateDateTime":"2021-05-12T19:05:23Z","createdDateTime":"2021-05-12T19:05:18Z","expirationDateTime":"2021-05-13T19:05:18Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'fc92f5a0-303e-41db-9590-9a9083ce3baa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/46571e12-d5e7-4172-95fb-39efb3dcca25')
  .query(true)
  .reply(200, {"jobId":"46571e12-d5e7-4172-95fb-39efb3dcca25","lastUpdateDateTime":"2021-05-12T19:05:23Z","createdDateTime":"2021-05-12T19:05:18Z","expirationDateTime":"2021-05-13T19:05:18Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '74336493-2efe-418e-a6b0-3a2bde4f2c49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/46571e12-d5e7-4172-95fb-39efb3dcca25')
  .query(true)
  .reply(200, {"jobId":"46571e12-d5e7-4172-95fb-39efb3dcca25","lastUpdateDateTime":"2021-05-12T19:05:23Z","createdDateTime":"2021-05-12T19:05:18Z","expirationDateTime":"2021-05-13T19:05:18Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '24f532a5-87e1-4c67-a5e7-1c1d4cabed88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/46571e12-d5e7-4172-95fb-39efb3dcca25')
  .query(true)
  .reply(200, {"jobId":"46571e12-d5e7-4172-95fb-39efb3dcca25","lastUpdateDateTime":"2021-05-12T19:05:27Z","createdDateTime":"2021-05-12T19:05:18Z","expirationDateTime":"2021-05-13T19:05:18Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'af9159d3-00cd-4e90-a24a-75855ef2c189',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/46571e12-d5e7-4172-95fb-39efb3dcca25')
  .query(true)
  .reply(200, {"jobId":"46571e12-d5e7-4172-95fb-39efb3dcca25","lastUpdateDateTime":"2021-05-12T19:05:27Z","createdDateTime":"2021-05-12T19:05:18Z","expirationDateTime":"2021-05-13T19:05:18Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'c6644a15-72ac-4834-ba5c-1ebec1a312e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:28 GMT'
]);
