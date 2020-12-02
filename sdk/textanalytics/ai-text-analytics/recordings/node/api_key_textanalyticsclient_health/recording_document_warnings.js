let nock = require('nock');

module.exports.hash = "83380aaa211e96989bf5ca1a75b8bdc8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/e73d49fa-368b-4e36-aad8-331889bb7e72',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  'b66a753a-ce39-4c17-a3f7-8e37b17c2bba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e73d49fa-368b-4e36-aad8-331889bb7e72')
  .query(true)
  .reply(200, {"jobId":"e73d49fa-368b-4e36-aad8-331889bb7e72","lastUpdateDateTime":"2020-11-20T00:13:06Z","createdDateTime":"2020-11-20T00:13:06Z","expirationDateTime":"2020-11-21T00:13:06Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '8b145bec-daf9-4972-9492-27d3fc70307e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e73d49fa-368b-4e36-aad8-331889bb7e72')
  .query(true)
  .reply(200, {"jobId":"e73d49fa-368b-4e36-aad8-331889bb7e72","lastUpdateDateTime":"2020-11-20T00:13:06Z","createdDateTime":"2020-11-20T00:13:06Z","expirationDateTime":"2020-11-21T00:13:06Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '8b1948d8-f2bf-43c9-9119-ce73b1397492',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e73d49fa-368b-4e36-aad8-331889bb7e72')
  .query(true)
  .reply(200, {"jobId":"e73d49fa-368b-4e36-aad8-331889bb7e72","lastUpdateDateTime":"2020-11-20T00:13:07Z","createdDateTime":"2020-11-20T00:13:06Z","expirationDateTime":"2020-11-21T00:13:06Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  'ad224982-cc74-491a-bc46-bad84adb9a48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e73d49fa-368b-4e36-aad8-331889bb7e72')
  .query(true)
  .reply(200, {"jobId":"e73d49fa-368b-4e36-aad8-331889bb7e72","lastUpdateDateTime":"2020-11-20T00:13:07Z","createdDateTime":"2020-11-20T00:13:06Z","expirationDateTime":"2020-11-21T00:13:06Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  'a87fff8a-6d5e-4d66-94a9-9a3f600f4f70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:08 GMT'
]);
