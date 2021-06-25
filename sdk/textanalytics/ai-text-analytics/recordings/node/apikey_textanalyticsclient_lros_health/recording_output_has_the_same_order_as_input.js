let nock = require('nock');

module.exports.hash = "0e70f96b1e4ef4786849ff26599336e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/21ae1202-1b76-48bf-9aa4-19077c4386e6',
  'x-envoy-upstream-service-time',
  '248',
  'apim-request-id',
  '9fe85cb4-26c6-4973-a2fc-cd010b1952ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/21ae1202-1b76-48bf-9aa4-19077c4386e6')
  .query(true)
  .reply(200, {"jobId":"21ae1202-1b76-48bf-9aa4-19077c4386e6","lastUpdateDateTime":"2021-06-25T05:10:36Z","createdDateTime":"2021-06-25T05:10:36Z","expirationDateTime":"2021-06-26T05:10:36Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '41aa8117-a6f0-4925-b5df-6984111e12f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/21ae1202-1b76-48bf-9aa4-19077c4386e6')
  .query(true)
  .reply(200, {"jobId":"21ae1202-1b76-48bf-9aa4-19077c4386e6","lastUpdateDateTime":"2021-06-25T05:10:36Z","createdDateTime":"2021-06-25T05:10:36Z","expirationDateTime":"2021-06-26T05:10:36Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '63442aaf-c162-4c40-bc2f-2370774650d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/21ae1202-1b76-48bf-9aa4-19077c4386e6')
  .query(true)
  .reply(200, {"jobId":"21ae1202-1b76-48bf-9aa4-19077c4386e6","lastUpdateDateTime":"2021-06-25T05:10:36Z","createdDateTime":"2021-06-25T05:10:36Z","expirationDateTime":"2021-06-26T05:10:36Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '43432c44-6820-4645-a9e1-87f37e9e5794',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/21ae1202-1b76-48bf-9aa4-19077c4386e6')
  .query(true)
  .reply(200, {"jobId":"21ae1202-1b76-48bf-9aa4-19077c4386e6","lastUpdateDateTime":"2021-06-25T05:10:39Z","createdDateTime":"2021-06-25T05:10:36Z","expirationDateTime":"2021-06-26T05:10:36Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  'b666d359-9348-45f1-bcd2-d0f96c753394',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/21ae1202-1b76-48bf-9aa4-19077c4386e6')
  .query(true)
  .reply(200, {"jobId":"21ae1202-1b76-48bf-9aa4-19077c4386e6","lastUpdateDateTime":"2021-06-25T05:10:39Z","createdDateTime":"2021-06-25T05:10:36Z","expirationDateTime":"2021-06-26T05:10:36Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[{"offset":0,"length":4,"text":"five","category":"Dosage","confidenceScore":0.58}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '64d1f638-b64e-41c8-bb34-f090287887ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:39 GMT'
]);
