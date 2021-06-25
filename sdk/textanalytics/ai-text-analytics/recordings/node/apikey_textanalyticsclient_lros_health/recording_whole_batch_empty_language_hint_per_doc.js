let nock = require('nock');

module.exports.hash = "2ef2a9e0010a041394b0a0562051ba4e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/bd30535e-aea4-4045-a55d-d881df165a4b',
  'x-envoy-upstream-service-time',
  '329',
  'apim-request-id',
  'd16e020e-092c-44d4-988f-d9482076351a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/bd30535e-aea4-4045-a55d-d881df165a4b')
  .query(true)
  .reply(200, {"jobId":"bd30535e-aea4-4045-a55d-d881df165a4b","lastUpdateDateTime":"2021-06-25T19:56:43Z","createdDateTime":"2021-06-25T19:56:42Z","expirationDateTime":"2021-06-26T19:56:42Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '30b43ca4-6ce9-46af-a663-1b5f702c12ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/bd30535e-aea4-4045-a55d-d881df165a4b')
  .query(true)
  .reply(200, {"jobId":"bd30535e-aea4-4045-a55d-d881df165a4b","lastUpdateDateTime":"2021-06-25T19:56:43Z","createdDateTime":"2021-06-25T19:56:42Z","expirationDateTime":"2021-06-26T19:56:42Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c82578f5-3355-4c48-a157-bf3f76b5e9b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/bd30535e-aea4-4045-a55d-d881df165a4b')
  .query(true)
  .reply(200, {"jobId":"bd30535e-aea4-4045-a55d-d881df165a4b","lastUpdateDateTime":"2021-06-25T19:56:44Z","createdDateTime":"2021-06-25T19:56:42Z","expirationDateTime":"2021-06-26T19:56:42Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '3b75a8d6-ca60-4c06-bdec-76d09ef930e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/bd30535e-aea4-4045-a55d-d881df165a4b')
  .query(true)
  .reply(200, {"jobId":"bd30535e-aea4-4045-a55d-d881df165a4b","lastUpdateDateTime":"2021-06-25T19:56:44Z","createdDateTime":"2021-06-25T19:56:42Z","expirationDateTime":"2021-06-26T19:56:42Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '360449ca-8f24-46ec-98a2-d27f06b8f8d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:45 GMT'
]);
