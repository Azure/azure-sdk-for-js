let nock = require('nock');

module.exports.hash = "204756a0ef7bb31d61c833d32a9152fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"displayName":"testJob","analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/f8fc91ac-fdfd-421c-9230-f156728095b7',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  'f611a9a8-8e7f-44b8-965b-c56a0e7ddabc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f8fc91ac-fdfd-421c-9230-f156728095b7')
  .query(true)
  .reply(200, {"jobId":"f8fc91ac-fdfd-421c-9230-f156728095b7","lastUpdateDateTime":"2021-10-23T00:41:03Z","createdDateTime":"2021-10-23T00:41:03Z","expirationDateTime":"2021-10-24T00:41:03Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '955056b0-4237-4104-a5bb-eb2a4b4eb18a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f8fc91ac-fdfd-421c-9230-f156728095b7')
  .query(true)
  .reply(200, {"jobId":"f8fc91ac-fdfd-421c-9230-f156728095b7","lastUpdateDateTime":"2021-10-23T00:41:03Z","createdDateTime":"2021-10-23T00:41:03Z","expirationDateTime":"2021-10-24T00:41:03Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '3a342317-4595-49f8-b7d3-db5a63edd1bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f8fc91ac-fdfd-421c-9230-f156728095b7')
  .query(true)
  .reply(200, {"jobId":"f8fc91ac-fdfd-421c-9230-f156728095b7","lastUpdateDateTime":"2021-10-23T00:41:04Z","createdDateTime":"2021-10-23T00:41:03Z","expirationDateTime":"2021-10-24T00:41:03Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'cc0f9fe7-bd41-4865-b0a7-12b33edccc43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/f8fc91ac-fdfd-421c-9230-f156728095b7')
  .query(true)
  .reply(200, {"jobId":"f8fc91ac-fdfd-421c-9230-f156728095b7","lastUpdateDateTime":"2021-10-23T00:41:06Z","createdDateTime":"2021-10-23T00:41:03Z","expirationDateTime":"2021-10-24T00:41:03Z","status":"succeeded","errors":[],"displayName":"testJob","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:41:06.9084334Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '947fd080-0237-4492-a023-4dd45836ebfb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:07 GMT'
]);
