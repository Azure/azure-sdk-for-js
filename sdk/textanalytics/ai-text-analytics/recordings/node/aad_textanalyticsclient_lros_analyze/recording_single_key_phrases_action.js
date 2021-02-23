let nock = require('nock');

module.exports.hash = "0ca80d72c5fc380d9c4ed2b8344fe09e";

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
  'c48c8bc3-e622-4873-8449-b934f3d60e00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EQAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:44:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:44:46 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/2fec386a-b9d8-4273-8563-2cb45c3f8ed2',
  'x-envoy-upstream-service-time',
  '1373',
  'apim-request-id',
  '174628ea-b7b3-4f1c-affa-1ef9e4c3406b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fec386a-b9d8-4273-8563-2cb45c3f8ed2')
  .query(true)
  .reply(200, {"jobId":"2fec386a-b9d8-4273-8563-2cb45c3f8ed2","lastUpdateDateTime":"2021-02-23T02:44:48Z","createdDateTime":"2021-02-23T02:44:47Z","expirationDateTime":"2021-02-24T02:44:47Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:48Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1054',
  'apim-request-id',
  '5b727c8f-3eb5-4b74-abe2-2a156da47326',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fec386a-b9d8-4273-8563-2cb45c3f8ed2')
  .query(true)
  .reply(200, {"jobId":"2fec386a-b9d8-4273-8563-2cb45c3f8ed2","lastUpdateDateTime":"2021-02-23T02:44:48Z","createdDateTime":"2021-02-23T02:44:47Z","expirationDateTime":"2021-02-24T02:44:47Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:48Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '0fe06712-91e1-48e9-ba3c-ba89f3326857',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fec386a-b9d8-4273-8563-2cb45c3f8ed2')
  .query(true)
  .reply(200, {"jobId":"2fec386a-b9d8-4273-8563-2cb45c3f8ed2","lastUpdateDateTime":"2021-02-23T02:44:48Z","createdDateTime":"2021-02-23T02:44:47Z","expirationDateTime":"2021-02-24T02:44:47Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:48Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:44:48.8625306Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '515e7378-2a01-4d92-892b-4a2b28ac9277',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fec386a-b9d8-4273-8563-2cb45c3f8ed2')
  .query(true)
  .reply(200, {"jobId":"2fec386a-b9d8-4273-8563-2cb45c3f8ed2","lastUpdateDateTime":"2021-02-23T02:44:48Z","createdDateTime":"2021-02-23T02:44:47Z","expirationDateTime":"2021-02-24T02:44:47Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:48Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:44:48.8625306Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '562',
  'apim-request-id',
  'c68e3707-683f-4e49-acbc-f2cb2b0729e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:51 GMT'
]);
