let nock = require('nock');

module.exports.hash = "b038000d27b9ceaf09b071e6f66e5f65";

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
  '9e35da31-8af8-49be-9bc1-eeffe2400000',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DQAAAG9Sx9cOAAAA; expires=Thu, 25-Mar-2021 19:48:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:48:41 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3',
  'x-envoy-upstream-service-time',
  '186',
  'apim-request-id',
  '614b808a-fea8-44f9-a43c-d686c267d319',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:48:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:42Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:42Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '424abea8-0ae3-4208-8958-a30cbca4e8dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:48:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:42Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:42Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'fb03f115-919f-4bfb-9c0f-ce2287360ae4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:48:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:42Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:42Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'f00b4fa5-e50a-4d08-83b6-f45d81529338',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:48:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '583',
  'apim-request-id',
  '6c016e06-9617-4d5e-aa24-77c60d5f3acc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:48:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  '57cab726-2266-4950-ad0e-685b51207674',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:48:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'a90a6c89-009e-4859-8f52-c77a2e498db1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:48:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  '8731fd5b-d20b-4794-8a69-7dac7acdc734',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:48:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '02d0d877-2192-4974-b108-9b874e2d5e7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:48:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '0ee1eb44-5e6b-4c54-bc77-4eb1eef68449',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:48:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  'e3ffb90f-a790-4dc8-bfab-870affc35b41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  '7da9e2e3-5b6f-4c26-a329-01ce053f45c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '5d0779e1-29c2-4e86-8391-990207b9e236',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  '22d6e9ec-d010-4a0d-9424-bcf8840bb624',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '463f49a9-ca2f-4cdc-b1e6-f0b9e67a2646',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '7a0105d6-6b26-4c0c-8a77-8edfd1c3c1dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:11 GMT'
]);

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
  '7439fb7e-2e9c-47dc-a95a-aecf6c861800',
  'x-ms-ests-server',
  '2.1.11513.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DQAAAG9Sx9cOAAAA; expires=Thu, 25-Mar-2021 19:49:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:49:13 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '735',
  'apim-request-id',
  'ebc0b0c2-3e00-4c91-9b6e-167f47906cf5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '744b007d-d4cf-4ab3-a516-6699c3ac8d1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '279f65d1-d6b7-4552-a122-d6ab525587b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '5a96e31d-d83c-4faf-ac63-7dbfb46c5ad9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  '1779a189-a9cf-4d5c-b04e-8b44b81ed7d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '5b9026b6-6da9-4ba8-862a-dfbf565fdd82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  'd3ec75e6-085b-4179-a875-3da5bc41a563',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '143',
  'apim-request-id',
  'd8116a62-1c8c-45e3-9978-73420be476bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  '1def4729-3bf5-4b73-9115-ad21514ab4be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '80ab97d1-9e9c-4a66-89a4-6d32eba5ac6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  'fa2bc322-863c-42d4-b9e5-a73ee3f72483',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'c72b74ab-9e9f-4c42-9f69-3e0c945a2aba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '295ce907-dc97-4ec9-a2c0-b576628066ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  'eb243a68-1861-4df6-b63d-da3e271cbd42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:42 GMT'
]);

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
  '5d553547-1547-4b42-9e1f-e76206f31200',
  'x-ms-ests-server',
  '2.1.11513.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DgAAAG9Sx9cOAAAA; expires=Thu, 25-Mar-2021 19:49:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:49:45 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  'ccb3316d-50c9-4ea1-a03e-4da32252b484',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '7a0d8f6c-5c14-4448-b0c0-e58af3663de1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '132',
  'apim-request-id',
  '90ec2504-e6a2-4204-976c-6e1893ad1376',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  '8c8a5143-8a37-475f-b806-1775c7efebca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  'cf1ead83-6e3d-42ec-b42c-40e5905555a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  '03a14f72-2387-4f38-a3f1-a4787169f9f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  '5abfa0cb-e50a-40fe-8393-fe822cfdc26c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:49:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  'f668bc3d-c812-4177-997d-938544b8ebb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '3b17dc3d-06e9-499a-9df1-a88a9a2dd159',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  '84a8a660-5ffd-4b2f-a5ab-41e1b594a083',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  'e725043e-1fd5-4442-a65f-614ea2ddad31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  'f54f1b76-4a4e-487f-b1d4-85ab05aa60bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '35d52fe5-3b6d-4fec-b717-051447d93f9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  'cd2da926-d34b-4b68-ae73-68a41c02b8d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:14 GMT'
]);

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
  '9e35da31-8af8-49be-9bc1-eeff904f0000',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DgAAAG9Sx9cOAAAA; expires=Thu, 25-Mar-2021 19:50:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:50:15 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  'bc54576a-72c2-4e04-8099-43402210ae3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '99abf1f2-0f55-4457-9f8a-d80f0913947a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  'efbc3853-e2e7-44f8-a6d6-1c7b77999a12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '63c36b4c-3f93-4191-83fa-da837838599b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  'ba1030b2-1863-4f46-b025-d1fdade69049',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  'e895d167-fbb0-4381-99d8-f320e9562217',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '8c2852c7-1c4f-4bae-998f-0b250e91a98c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '263',
  'apim-request-id',
  '4b7bba41-d20c-4838-aff5-82a00b69f011',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  '3ae2221b-a41a-4765-8e37-1628fa2bb04a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  '40812f5a-785c-45b3-b08e-7f6d88179f1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '192',
  'apim-request-id',
  '675eb76e-972f-4d05-8ec5-2f0a3757c989',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '35406e1a-de33-4854-bb17-9d08ba286b17',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  'd6b2f82d-4c6d-4da2-978d-1e6edb14e5f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '750ba909-91b3-44d8-bae5-b9cec9ef0479',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:45 GMT'
]);

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
  '2620474d-e76b-40be-8b7c-6955511d1200',
  'x-ms-ests-server',
  '2.1.11513.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DwAAAG9Sx9cOAAAA; expires=Thu, 25-Mar-2021 19:50:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:50:48 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  '6146cff5-91f3-4af5-b5ab-b90b4f1f8a41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  '4fbf94b3-aa47-4acc-bfc4-afbf47a00674',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6e475ec2-27bd-408b-8dd9-aaae380975f3')
  .query(true)
  .reply(200, {"jobId":"6e475ec2-27bd-408b-8dd9-aaae380975f3","lastUpdateDateTime":"2021-02-23T19:48:45Z","createdDateTime":"2021-02-23T19:48:42Z","expirationDateTime":"2021-02-24T19:48:42Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:48:45Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:48:45.4785495Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '237',
  'apim-request-id',
  '69b2fe3a-76af-457d-8be9-6d8ffdcfd246',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:50 GMT'
]);
