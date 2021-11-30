let nock = require('nock');

module.exports.hash = "cbf03ddee2860872f977286316a65b6f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/dd285b4d-ff5c-4677-9fe7-2d4a454d8f94',
  'x-envoy-upstream-service-time',
  '299',
  'apim-request-id',
  'bfa11517-fc42-44e9-b9ad-8fed217135b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/dd285b4d-ff5c-4677-9fe7-2d4a454d8f94')
  .query(true)
  .reply(200, {"jobId":"dd285b4d-ff5c-4677-9fe7-2d4a454d8f94","lastUpdateDateTime":"2021-10-23T00:37:12Z","createdDateTime":"2021-10-23T00:37:12Z","expirationDateTime":"2021-10-24T00:37:12Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e2bda075-fd36-4e95-8356-6ff5386ba425',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/dd285b4d-ff5c-4677-9fe7-2d4a454d8f94')
  .query(true)
  .reply(200, {"jobId":"dd285b4d-ff5c-4677-9fe7-2d4a454d8f94","lastUpdateDateTime":"2021-10-23T00:37:12Z","createdDateTime":"2021-10-23T00:37:12Z","expirationDateTime":"2021-10-24T00:37:12Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'c509ccc1-8b87-469c-a458-f832d95098f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/dd285b4d-ff5c-4677-9fe7-2d4a454d8f94')
  .query(true)
  .reply(200, {"jobId":"dd285b4d-ff5c-4677-9fe7-2d4a454d8f94","lastUpdateDateTime":"2021-10-23T00:37:13Z","createdDateTime":"2021-10-23T00:37:12Z","expirationDateTime":"2021-10-24T00:37:12Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7f1701cb-33fa-4611-baae-0d53b44d3844',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/dd285b4d-ff5c-4677-9fe7-2d4a454d8f94')
  .query(true)
  .reply(200, {"jobId":"dd285b4d-ff5c-4677-9fe7-2d4a454d8f94","lastUpdateDateTime":"2021-10-23T00:37:15Z","createdDateTime":"2021-10-23T00:37:12Z","expirationDateTime":"2021-10-24T00:37:12Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:37:15.8148332Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '34afc424-a322-4eea-91b7-054a32d11476',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/dd285b4d-ff5c-4677-9fe7-2d4a454d8f94')
  .query(true)
  .reply(200, {"jobId":"dd285b4d-ff5c-4677-9fe7-2d4a454d8f94","lastUpdateDateTime":"2021-10-23T00:37:15Z","createdDateTime":"2021-10-23T00:37:12Z","expirationDateTime":"2021-10-24T00:37:12Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:37:15.8148332Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '8580b424-4888-4bb7-afac-ad175ac9e9d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:17 GMT'
]);
