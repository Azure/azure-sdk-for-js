let nock = require('nock');

module.exports.hash = "ac622cd01e61ec2f5387862484f9db9c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/53db00df-36c9-4e11-9d31-2960fc2388b2',
  'x-envoy-upstream-service-time',
  '290',
  'apim-request-id',
  '95aa8a6a-53fe-432e-aefd-241b14dac928',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/53db00df-36c9-4e11-9d31-2960fc2388b2')
  .query(true)
  .reply(200, {"jobId":"53db00df-36c9-4e11-9d31-2960fc2388b2","lastUpdateDateTime":"2020-12-22T20:07:44Z","createdDateTime":"2020-12-22T20:07:44Z","expirationDateTime":"2020-12-23T20:07:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '261f389a-71ba-4bf7-89e9-68a89f1cd072',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/53db00df-36c9-4e11-9d31-2960fc2388b2')
  .query(true)
  .reply(200, {"jobId":"53db00df-36c9-4e11-9d31-2960fc2388b2","lastUpdateDateTime":"2020-12-22T20:07:44Z","createdDateTime":"2020-12-22T20:07:44Z","expirationDateTime":"2020-12-23T20:07:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c9e3b319-35c8-42ab-81e8-eaafb1a7c29e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/53db00df-36c9-4e11-9d31-2960fc2388b2')
  .query(true)
  .reply(200, {"jobId":"53db00df-36c9-4e11-9d31-2960fc2388b2","lastUpdateDateTime":"2020-12-22T20:07:44Z","createdDateTime":"2020-12-22T20:07:44Z","expirationDateTime":"2020-12-23T20:07:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'bb2e9be4-2b58-4cf4-bfef-2dfee4fc8f33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/53db00df-36c9-4e11-9d31-2960fc2388b2')
  .query(true)
  .reply(200, {"jobId":"53db00df-36c9-4e11-9d31-2960fc2388b2","lastUpdateDateTime":"2020-12-22T20:07:48Z","createdDateTime":"2020-12-22T20:07:44Z","expirationDateTime":"2020-12-23T20:07:44Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  'ecc8173f-257c-408a-ad13-0480dda803cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/53db00df-36c9-4e11-9d31-2960fc2388b2')
  .query(true)
  .reply(200, {"jobId":"53db00df-36c9-4e11-9d31-2960fc2388b2","lastUpdateDateTime":"2020-12-22T20:07:48Z","createdDateTime":"2020-12-22T20:07:44Z","expirationDateTime":"2020-12-23T20:07:44Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'fa563974-a075-4bac-894c-28bb1785b99e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:49 GMT'
]);
