let nock = require('nock');

module.exports.hash = "3642f1aab7bfe4952a29b10055715941";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '2ccea56d-c426-4794-8c15-535212fe2900',
  'x-ms-ests-server',
  '2.1.11530.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjRvNGJ2bA5DsxzNp3s6nMZz_bg1AQAAANvW0dcOAAAA; expires=Fri, 02-Apr-2021 19:13:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Mar 2021 19:13:31 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityLinkingTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"0","text":"Microsoft moved its headquarters to Bellevue, Washington in January 1979.","language":"en"},{"id":"1","text":"Steve Ballmer stepped down as CEO of Microsoft and was succeeded by Satya Nadella.","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/6af29dab-e8e1-4dbc-a11e-91942d66d100',
  'x-envoy-upstream-service-time',
  '1712',
  'apim-request-id',
  'cd87df2b-1acf-4d7a-8212-ecab8a6e8c31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 03 Mar 2021 19:13:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6af29dab-e8e1-4dbc-a11e-91942d66d100')
  .query(true)
  .reply(200, {"jobId":"6af29dab-e8e1-4dbc-a11e-91942d66d100","lastUpdateDateTime":"2021-03-03T19:13:39Z","createdDateTime":"2021-03-03T19:13:39Z","expirationDateTime":"2021-03-04T19:13:39Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-03T19:13:39Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '486',
  'apim-request-id',
  'b932614b-a11d-4eb0-8793-6276cb1ab065',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 03 Mar 2021 19:13:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6af29dab-e8e1-4dbc-a11e-91942d66d100')
  .query(true)
  .reply(200, {"jobId":"6af29dab-e8e1-4dbc-a11e-91942d66d100","lastUpdateDateTime":"2021-03-03T19:13:39Z","createdDateTime":"2021-03-03T19:13:39Z","expirationDateTime":"2021-03-04T19:13:39Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-03T19:13:39Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1367',
  'apim-request-id',
  '0aa4e29e-f9bc-4326-9144-a2441088ec58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 03 Mar 2021 19:13:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6af29dab-e8e1-4dbc-a11e-91942d66d100')
  .query(true)
  .reply(200, {"jobId":"6af29dab-e8e1-4dbc-a11e-91942d66d100","lastUpdateDateTime":"2021-03-03T19:13:45Z","createdDateTime":"2021-03-03T19:13:39Z","expirationDateTime":"2021-03-04T19:13:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-03T19:13:45Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '3397',
  'apim-request-id',
  'dbc3577c-95d8-4fe5-a4f6-94437244d0ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 03 Mar 2021 19:13:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6af29dab-e8e1-4dbc-a11e-91942d66d100')
  .query(true)
  .reply(200, {"jobId":"6af29dab-e8e1-4dbc-a11e-91942d66d100","lastUpdateDateTime":"2021-03-03T19:13:45Z","createdDateTime":"2021-03-03T19:13:39Z","expirationDateTime":"2021-03-04T19:13:39Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-03T19:13:45Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-03-03T19:13:45.2103975Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"},{"name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2020-02-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2703',
  'apim-request-id',
  '0d1d0b7e-4e8d-4888-9894-d5f85838f741',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 03 Mar 2021 19:13:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6af29dab-e8e1-4dbc-a11e-91942d66d100')
  .query(true)
  .reply(200, {"jobId":"6af29dab-e8e1-4dbc-a11e-91942d66d100","lastUpdateDateTime":"2021-03-03T19:13:45Z","createdDateTime":"2021-03-03T19:13:39Z","expirationDateTime":"2021-03-04T19:13:39Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-03T19:13:45Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-03-03T19:13:45.2103975Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"},{"name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2020-02-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1084',
  'apim-request-id',
  'b8948ac4-6ba3-4165-962f-d59cfb33ca50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 03 Mar 2021 19:13:53 GMT'
]);
