let nock = require('nock');

module.exports.hash = "74c1c5c7afab5cc7bb37a723f482de16";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"Microsoft moved its headquarters to Bellevue, Washington in January 1979.","language":"en"},{"id":"1","text":"Steve Ballmer stepped down as CEO of Microsoft and was succeeded by Satya Nadella.","language":"en"}]},"tasks":{"entityLinkingTasks":[{"parameters":{"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/d145460f-054a-49c9-9d6f-a62490f980e0',
  'x-envoy-upstream-service-time',
  '330',
  'apim-request-id',
  '6a3c3498-1588-44b2-8c33-1c5914baebe8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/d145460f-054a-49c9-9d6f-a62490f980e0')
  .query(true)
  .reply(200, {"jobId":"d145460f-054a-49c9-9d6f-a62490f980e0","lastUpdateDateTime":"2021-08-03T22:37:53Z","createdDateTime":"2021-08-03T22:37:53Z","expirationDateTime":"2021-08-04T22:37:53Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b5821cf6-88c4-4e40-91e4-cd3a925c0587',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/d145460f-054a-49c9-9d6f-a62490f980e0')
  .query(true)
  .reply(200, {"jobId":"d145460f-054a-49c9-9d6f-a62490f980e0","lastUpdateDateTime":"2021-08-03T22:37:53Z","createdDateTime":"2021-08-03T22:37:53Z","expirationDateTime":"2021-08-04T22:37:53Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bb22f56a-9e93-4efc-abd5-b16a6b89cc3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/d145460f-054a-49c9-9d6f-a62490f980e0')
  .query(true)
  .reply(200, {"jobId":"d145460f-054a-49c9-9d6f-a62490f980e0","lastUpdateDateTime":"2021-08-03T22:37:54Z","createdDateTime":"2021-08-03T22:37:53Z","expirationDateTime":"2021-08-04T22:37:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '34417872-a45b-46f0-933e-2e23c615f8f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/d145460f-054a-49c9-9d6f-a62490f980e0')
  .query(true)
  .reply(200, {"jobId":"d145460f-054a-49c9-9d6f-a62490f980e0","lastUpdateDateTime":"2021-08-03T22:37:54Z","createdDateTime":"2021-08-03T22:37:53Z","expirationDateTime":"2021-08-04T22:37:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '066d127e-f7a0-4785-951d-cbb30999270d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/d145460f-054a-49c9-9d6f-a62490f980e0')
  .query(true)
  .reply(200, {"jobId":"d145460f-054a-49c9-9d6f-a62490f980e0","lastUpdateDateTime":"2021-08-03T22:37:54Z","createdDateTime":"2021-08-03T22:37:53Z","expirationDateTime":"2021-08-04T22:37:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'd1ded891-728b-4824-870b-bbedff26976f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/d145460f-054a-49c9-9d6f-a62490f980e0')
  .query(true)
  .reply(200, {"jobId":"d145460f-054a-49c9-9d6f-a62490f980e0","lastUpdateDateTime":"2021-08-03T22:37:54Z","createdDateTime":"2021-08-03T22:37:53Z","expirationDateTime":"2021-08-04T22:37:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ec6c3f98-41bb-4a1f-8aa0-5adc26fbc890',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/d145460f-054a-49c9-9d6f-a62490f980e0')
  .query(true)
  .reply(200, {"jobId":"d145460f-054a-49c9-9d6f-a62490f980e0","lastUpdateDateTime":"2021-08-03T22:37:54Z","createdDateTime":"2021-08-03T22:37:53Z","expirationDateTime":"2021-08-04T22:37:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '957dff45-dedd-429b-9374-9eed7ec04a08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/d145460f-054a-49c9-9d6f-a62490f980e0')
  .query(true)
  .reply(200, {"jobId":"d145460f-054a-49c9-9d6f-a62490f980e0","lastUpdateDateTime":"2021-08-03T22:37:54Z","createdDateTime":"2021-08-03T22:37:53Z","expirationDateTime":"2021-08-04T22:37:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '855aa79a-fb4a-46cc-b80b-9df219c6b87c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/d145460f-054a-49c9-9d6f-a62490f980e0')
  .query(true)
  .reply(200, {"jobId":"d145460f-054a-49c9-9d6f-a62490f980e0","lastUpdateDateTime":"2021-08-03T22:38:06Z","createdDateTime":"2021-08-03T22:37:53Z","expirationDateTime":"2021-08-04T22:37:53Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-08-03T22:38:06.9285246Z","taskName":"EntityLinking_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"a2e3a3eb-b83e-42f0-bf19-95b4c4c9d3c0","name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"bingId":"19fb6fb4-3c50-f314-30e4-7b5470e08274","name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"bingId":"56ff0719-4791-406b-99de-0e99c3e8cefc","name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"bingId":"cf5db860-9fd2-390d-0b6d-5ba856efed49","name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"},{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"e23e51ed-d16f-4800-9a31-ed056168b9a2","name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '81c5d381-d3a1-4346-ab45-d6bf04a640bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/d145460f-054a-49c9-9d6f-a62490f980e0')
  .query(true)
  .reply(200, {"jobId":"d145460f-054a-49c9-9d6f-a62490f980e0","lastUpdateDateTime":"2021-08-03T22:38:06Z","createdDateTime":"2021-08-03T22:37:53Z","expirationDateTime":"2021-08-04T22:37:53Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-08-03T22:38:06.9285246Z","taskName":"EntityLinking_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"a2e3a3eb-b83e-42f0-bf19-95b4c4c9d3c0","name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"bingId":"19fb6fb4-3c50-f314-30e4-7b5470e08274","name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"bingId":"56ff0719-4791-406b-99de-0e99c3e8cefc","name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"bingId":"cf5db860-9fd2-390d-0b6d-5ba856efed49","name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"},{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"e23e51ed-d16f-4800-9a31-ed056168b9a2","name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  '759d2e68-8525-48eb-9cf5-be5751e22af8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:08 GMT'
]);
