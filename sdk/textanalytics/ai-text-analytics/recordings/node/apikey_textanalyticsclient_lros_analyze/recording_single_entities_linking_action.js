let nock = require('nock');

module.exports.hash = "74c1c5c7afab5cc7bb37a723f482de16";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"Microsoft moved its headquarters to Bellevue, Washington in January 1979.","language":"en"},{"id":"1","text":"Steve Ballmer stepped down as CEO of Microsoft and was succeeded by Satya Nadella.","language":"en"}]},"tasks":{"entityLinkingTasks":[{"parameters":{"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/bf5c5efd-682a-4dd7-9d61-46be71dc8210',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  '43dfeeff-37f3-4470-bda1-63f11b21129f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:42 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bf5c5efd-682a-4dd7-9d61-46be71dc8210')
  .query(true)
  .reply(200, {"jobId":"bf5c5efd-682a-4dd7-9d61-46be71dc8210","lastUpdateDateTime":"2021-08-03T03:10:43Z","createdDateTime":"2021-08-03T03:10:43Z","expirationDateTime":"2021-08-04T03:10:43Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '06c1ae7c-bdeb-4745-9e14-138a45c6d1b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bf5c5efd-682a-4dd7-9d61-46be71dc8210')
  .query(true)
  .reply(200, {"jobId":"bf5c5efd-682a-4dd7-9d61-46be71dc8210","lastUpdateDateTime":"2021-08-03T03:10:43Z","createdDateTime":"2021-08-03T03:10:43Z","expirationDateTime":"2021-08-04T03:10:43Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '72fca019-38bf-43b2-9e79-7639c8f13e22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bf5c5efd-682a-4dd7-9d61-46be71dc8210')
  .query(true)
  .reply(200, {"jobId":"bf5c5efd-682a-4dd7-9d61-46be71dc8210","lastUpdateDateTime":"2021-08-03T03:10:43Z","createdDateTime":"2021-08-03T03:10:43Z","expirationDateTime":"2021-08-04T03:10:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '95f843bc-3dd1-4977-8131-cba2b0ebbd0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:45 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bf5c5efd-682a-4dd7-9d61-46be71dc8210')
  .query(true)
  .reply(200, {"jobId":"bf5c5efd-682a-4dd7-9d61-46be71dc8210","lastUpdateDateTime":"2021-08-03T03:10:43Z","createdDateTime":"2021-08-03T03:10:43Z","expirationDateTime":"2021-08-04T03:10:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9405e777-1e41-4dc5-9751-6970840643a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:47 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bf5c5efd-682a-4dd7-9d61-46be71dc8210')
  .query(true)
  .reply(200, {"jobId":"bf5c5efd-682a-4dd7-9d61-46be71dc8210","lastUpdateDateTime":"2021-08-03T03:10:43Z","createdDateTime":"2021-08-03T03:10:43Z","expirationDateTime":"2021-08-04T03:10:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '275db358-4265-4679-a241-c68a51ce77d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:49 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bf5c5efd-682a-4dd7-9d61-46be71dc8210')
  .query(true)
  .reply(200, {"jobId":"bf5c5efd-682a-4dd7-9d61-46be71dc8210","lastUpdateDateTime":"2021-08-03T03:10:43Z","createdDateTime":"2021-08-03T03:10:43Z","expirationDateTime":"2021-08-04T03:10:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ea7a9937-0eac-4a18-8f18-40405b57e15b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:51 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bf5c5efd-682a-4dd7-9d61-46be71dc8210')
  .query(true)
  .reply(200, {"jobId":"bf5c5efd-682a-4dd7-9d61-46be71dc8210","lastUpdateDateTime":"2021-08-03T03:10:43Z","createdDateTime":"2021-08-03T03:10:43Z","expirationDateTime":"2021-08-04T03:10:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '668088f5-147d-4d9f-84e0-31d2e3104874',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bf5c5efd-682a-4dd7-9d61-46be71dc8210')
  .query(true)
  .reply(200, {"jobId":"bf5c5efd-682a-4dd7-9d61-46be71dc8210","lastUpdateDateTime":"2021-08-03T03:10:43Z","createdDateTime":"2021-08-03T03:10:43Z","expirationDateTime":"2021-08-04T03:10:43Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2c89206d-6d4f-466c-9005-ed2b88dab76e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:55 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bf5c5efd-682a-4dd7-9d61-46be71dc8210')
  .query(true)
  .reply(200, {"jobId":"bf5c5efd-682a-4dd7-9d61-46be71dc8210","lastUpdateDateTime":"2021-08-03T03:10:56Z","createdDateTime":"2021-08-03T03:10:43Z","expirationDateTime":"2021-08-04T03:10:43Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-08-03T03:10:56.8824407Z","taskName":"EntityLinking_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"a2e3a3eb-b83e-42f0-bf19-95b4c4c9d3c0","name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"bingId":"19fb6fb4-3c50-f314-30e4-7b5470e08274","name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"bingId":"56ff0719-4791-406b-99de-0e99c3e8cefc","name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"bingId":"cf5db860-9fd2-390d-0b6d-5ba856efed49","name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"},{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"e23e51ed-d16f-4800-9a31-ed056168b9a2","name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'a7b982cc-3bb3-46ea-b169-c086e71adb06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bf5c5efd-682a-4dd7-9d61-46be71dc8210')
  .query(true)
  .reply(200, {"jobId":"bf5c5efd-682a-4dd7-9d61-46be71dc8210","lastUpdateDateTime":"2021-08-03T03:10:56Z","createdDateTime":"2021-08-03T03:10:43Z","expirationDateTime":"2021-08-04T03:10:43Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-08-03T03:10:56.8824407Z","taskName":"EntityLinking_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"a2e3a3eb-b83e-42f0-bf19-95b4c4c9d3c0","name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"bingId":"19fb6fb4-3c50-f314-30e4-7b5470e08274","name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"bingId":"56ff0719-4791-406b-99de-0e99c3e8cefc","name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"bingId":"cf5db860-9fd2-390d-0b6d-5ba856efed49","name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"},{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"e23e51ed-d16f-4800-9a31-ed056168b9a2","name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'f034c5ec-8648-47aa-ba31-2eaf43019655',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:57 GMT'
]);
