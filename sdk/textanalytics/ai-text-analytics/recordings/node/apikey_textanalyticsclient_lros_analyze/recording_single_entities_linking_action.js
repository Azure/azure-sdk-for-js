let nock = require('nock');

module.exports.hash = "08a944137d225f375d8a40947850adab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"0","text":"Microsoft moved its headquarters to Bellevue, Washington in January 1979.","language":"en"},{"id":"1","text":"Steve Ballmer stepped down as CEO of Microsoft and was succeeded by Satya Nadella.","language":"en"}]},"tasks":{"entityLinkingTasks":[{"parameters":{"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/f418c181-9639-4d99-90fc-60ccdc2f81b0',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  '8f41a99a-38fe-4b2a-9cfb-202f37d7cdad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f418c181-9639-4d99-90fc-60ccdc2f81b0')
  .query(true)
  .reply(200, {"jobId":"f418c181-9639-4d99-90fc-60ccdc2f81b0","lastUpdateDateTime":"2021-10-23T00:37:33Z","createdDateTime":"2021-10-23T00:37:33Z","expirationDateTime":"2021-10-24T00:37:33Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '6a5ed8e2-a6ac-498a-a724-857922a597dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f418c181-9639-4d99-90fc-60ccdc2f81b0')
  .query(true)
  .reply(200, {"jobId":"f418c181-9639-4d99-90fc-60ccdc2f81b0","lastUpdateDateTime":"2021-10-23T00:37:33Z","createdDateTime":"2021-10-23T00:37:33Z","expirationDateTime":"2021-10-24T00:37:33Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'cec21bc4-2e3a-4ac4-a9f2-d7edb16bde7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f418c181-9639-4d99-90fc-60ccdc2f81b0')
  .query(true)
  .reply(200, {"jobId":"f418c181-9639-4d99-90fc-60ccdc2f81b0","lastUpdateDateTime":"2021-10-23T00:37:33Z","createdDateTime":"2021-10-23T00:37:33Z","expirationDateTime":"2021-10-24T00:37:33Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '41810818-e9b2-42c6-9203-5f22dfcfaf1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f418c181-9639-4d99-90fc-60ccdc2f81b0')
  .query(true)
  .reply(200, {"jobId":"f418c181-9639-4d99-90fc-60ccdc2f81b0","lastUpdateDateTime":"2021-10-23T00:37:33Z","createdDateTime":"2021-10-23T00:37:33Z","expirationDateTime":"2021-10-24T00:37:33Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b8def483-851f-4b43-90fe-68baf8676023',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f418c181-9639-4d99-90fc-60ccdc2f81b0')
  .query(true)
  .reply(200, {"jobId":"f418c181-9639-4d99-90fc-60ccdc2f81b0","lastUpdateDateTime":"2021-10-23T00:37:33Z","createdDateTime":"2021-10-23T00:37:33Z","expirationDateTime":"2021-10-24T00:37:33Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '6e913442-aa99-4e14-8b83-c0b3bb87d71c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f418c181-9639-4d99-90fc-60ccdc2f81b0')
  .query(true)
  .reply(200, {"jobId":"f418c181-9639-4d99-90fc-60ccdc2f81b0","lastUpdateDateTime":"2021-10-23T00:37:33Z","createdDateTime":"2021-10-23T00:37:33Z","expirationDateTime":"2021-10-24T00:37:33Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '407b0f76-e2f1-4939-8553-043d76cbaf4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f418c181-9639-4d99-90fc-60ccdc2f81b0')
  .query(true)
  .reply(200, {"jobId":"f418c181-9639-4d99-90fc-60ccdc2f81b0","lastUpdateDateTime":"2021-10-23T00:37:33Z","createdDateTime":"2021-10-23T00:37:33Z","expirationDateTime":"2021-10-24T00:37:33Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'df0e2cfa-5562-42eb-b4e1-942037f164c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f418c181-9639-4d99-90fc-60ccdc2f81b0')
  .query(true)
  .reply(200, {"jobId":"f418c181-9639-4d99-90fc-60ccdc2f81b0","lastUpdateDateTime":"2021-10-23T00:37:33Z","createdDateTime":"2021-10-23T00:37:33Z","expirationDateTime":"2021-10-24T00:37:33Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '8ab900a6-cdce-4644-91bc-2158ba2e20cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f418c181-9639-4d99-90fc-60ccdc2f81b0')
  .query(true)
  .reply(200, {"jobId":"f418c181-9639-4d99-90fc-60ccdc2f81b0","lastUpdateDateTime":"2021-10-23T00:37:47Z","createdDateTime":"2021-10-23T00:37:33Z","expirationDateTime":"2021-10-24T00:37:33Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-10-23T00:37:47.6136006Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"a2e3a3eb-b83e-42f0-bf19-95b4c4c9d3c0","name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"bingId":"19fb6fb4-3c50-f314-30e4-7b5470e08274","name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"bingId":"56ff0719-4791-406b-99de-0e99c3e8cefc","name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"bingId":"cf5db860-9fd2-390d-0b6d-5ba856efed49","name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"},{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"e23e51ed-d16f-4800-9a31-ed056168b9a2","name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '280',
  'apim-request-id',
  'd52e484d-8b7f-417b-a404-9264e01bc819',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f418c181-9639-4d99-90fc-60ccdc2f81b0')
  .query(true)
  .reply(200, {"jobId":"f418c181-9639-4d99-90fc-60ccdc2f81b0","lastUpdateDateTime":"2021-10-23T00:37:47Z","createdDateTime":"2021-10-23T00:37:33Z","expirationDateTime":"2021-10-24T00:37:33Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-10-23T00:37:47.6136006Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"a2e3a3eb-b83e-42f0-bf19-95b4c4c9d3c0","name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"bingId":"19fb6fb4-3c50-f314-30e4-7b5470e08274","name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"bingId":"56ff0719-4791-406b-99de-0e99c3e8cefc","name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"bingId":"cf5db860-9fd2-390d-0b6d-5ba856efed49","name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"},{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"e23e51ed-d16f-4800-9a31-ed056168b9a2","name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '04a12b9a-07d5-4dee-98bf-1b0de726e6b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:47 GMT'
]);
