let nock = require('nock');

module.exports.hash = "ce1022e89d106988559f82afe6baea1e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"Microsoft moved its headquarters to Bellevue, Washington in January 1979.","language":"en"},{"id":"1","text":"Steve Ballmer stepped down as CEO of Microsoft and was succeeded by Satya Nadella.","language":"en"}]},"tasks":{"entityLinkingTasks":[{"parameters":{"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/c9ccf7b8-b322-4983-8644-b7a738a51dbd',
  'x-envoy-upstream-service-time',
  '2706',
  'apim-request-id',
  'fd23129f-ad3e-407f-8fd8-cd3db3cbd90e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/c9ccf7b8-b322-4983-8644-b7a738a51dbd')
  .query(true)
  .reply(200, {"jobId":"c9ccf7b8-b322-4983-8644-b7a738a51dbd","lastUpdateDateTime":"2021-06-25T19:48:55Z","createdDateTime":"2021-06-25T19:48:52Z","expirationDateTime":"2021-06-26T19:48:52Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '84133019-8c65-4504-bb8f-691c70e0ed15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/c9ccf7b8-b322-4983-8644-b7a738a51dbd')
  .query(true)
  .reply(200, {"jobId":"c9ccf7b8-b322-4983-8644-b7a738a51dbd","lastUpdateDateTime":"2021-06-25T19:48:55Z","createdDateTime":"2021-06-25T19:48:52Z","expirationDateTime":"2021-06-26T19:48:52Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a2f812b4-a220-44bc-9743-9157e6b2be75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/c9ccf7b8-b322-4983-8644-b7a738a51dbd')
  .query(true)
  .reply(200, {"jobId":"c9ccf7b8-b322-4983-8644-b7a738a51dbd","lastUpdateDateTime":"2021-06-25T19:48:56Z","createdDateTime":"2021-06-25T19:48:52Z","expirationDateTime":"2021-06-26T19:48:52Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5107a1fd-75bf-4168-9498-f70d5c1d9897',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/c9ccf7b8-b322-4983-8644-b7a738a51dbd')
  .query(true)
  .reply(200, {"jobId":"c9ccf7b8-b322-4983-8644-b7a738a51dbd","lastUpdateDateTime":"2021-06-25T19:48:57Z","createdDateTime":"2021-06-25T19:48:52Z","expirationDateTime":"2021-06-26T19:48:52Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-06-25T19:48:57.8841197Z","taskName":"EntityLinking_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"},{"name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2020-02-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  '647bf501-5821-460c-aa7d-7a6e7704173a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/c9ccf7b8-b322-4983-8644-b7a738a51dbd')
  .query(true)
  .reply(200, {"jobId":"c9ccf7b8-b322-4983-8644-b7a738a51dbd","lastUpdateDateTime":"2021-06-25T19:48:57Z","createdDateTime":"2021-06-25T19:48:52Z","expirationDateTime":"2021-06-26T19:48:52Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-06-25T19:48:57.8841197Z","taskName":"EntityLinking_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"},{"name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2020-02-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '38f8a34f-ae98-4511-9f2f-982b57b9a99c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:58 GMT'
]);
