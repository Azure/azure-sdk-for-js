let nock = require('nock');

module.exports.hash = "633fb369e5e1dfb1aa2335c3687e008f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f',
  'x-envoy-upstream-service-time',
  '274',
  'apim-request-id',
  'f2b8f71c-14c0-48ec-a31f-83fa6f96be7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:15Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'e1c3a6ef-346f-4ea3-a5b1-6fb4396c665b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:15Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '4d073897-d538-4d21-b350-cb820eed3bd6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:15Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ae7f96de-3ea7-42bf-a37d-be739ed84289',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:15Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'c267ca42-68fc-4680-aee2-816333780f22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:15Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '14c993ef-85c5-4800-853b-28a2339bd006',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:21Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  'bb4aa3b2-4561-47dd-ac5f-2e83fdf49414',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:21Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '250d205a-b698-442e-8df7-a25993fd6efd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:21Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '306',
  'apim-request-id',
  '2786396f-ac8a-41d2-8ec4-125c9640f457',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:28Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '143',
  'apim-request-id',
  'd06dd8e9-c705-4cb7-b0d7-470ec8484c7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:28Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '1e7831f5-43ed-452e-a11e-618c1303a3c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:28Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '5ab22296-9f18-4c07-990a-58bd7a7bc83a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:28Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  '3e24346a-82a7-42de-80e5-3c10cc11ebc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:28Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  'b5026ba1-9fd2-4d21-94c2-1071e08d38e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:28Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '4c5be3b8-2eae-42c9-b2e4-529799205e33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:28Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  '36575301-4170-4fd1-987f-05f19139d04a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:28Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  'b2319756-379d-4037-b074-f36f66e8b7f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:28Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  'f4573b71-23d2-41cc-9122-3d7affb1c40c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:28Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '132',
  'apim-request-id',
  '756cafcd-e4cf-4a7d-b173-1b3535cdd1ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:28Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  'ad501c72-6704-4089-aa86-1fe430464f72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:54Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:54.069663Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  '9da5bd5c-0e1a-46bd-b0dc-a902cf265886',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/99814070-33c6-4867-9330-b9eb0385889f')
  .query(true)
  .reply(200, {"jobId":"99814070-33c6-4867-9330-b9eb0385889f","lastUpdateDateTime":"2021-06-25T19:53:54Z","createdDateTime":"2021-06-25T19:53:14Z","expirationDateTime":"2021-06-26T19:53:14Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:21.7860829Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:28.9130117Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:53:54.069663Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  'd7d3e0aa-350b-41ee-8965-e00c2a142976',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:53:54 GMT'
]);
