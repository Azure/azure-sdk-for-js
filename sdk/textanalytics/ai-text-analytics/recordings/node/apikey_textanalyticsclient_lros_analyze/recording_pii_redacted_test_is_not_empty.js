let nock = require('nock');

module.exports.hash = "53edc15aa669bdf8a052f15fbf8840b3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47',
  'x-envoy-upstream-service-time',
  '10296',
  'apim-request-id',
  'b06ee2a2-5f33-4e13-a4de-ed2d13320b27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:08:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:48Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '8247ac38-df2e-4f74-ba08-06a626a28128',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:08:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:48Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'd08b2802-4686-45f7-8e59-2f35679fe366',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:08:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:49Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'bb76bb5b-a9ed-46ba-a2b6-38911feb828b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:08:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:49Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '48d77a07-fc40-4254-859e-1acedacee9a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:08:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:49Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '371e290a-c031-4920-b19f-213fbae74805',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:08:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:49Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '62b192de-082b-4d95-9e3a-100c65550937',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:08:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:49Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '6ff4d4c8-3fcb-4719-9f7e-1c9da4e4d150',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:08:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:49Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  '784ee4c9-f7f6-4d82-b698-7e311156c575',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:49Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '07342b5a-99a7-4bc5-9ab8-15ef947ae0d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:49Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '69adbc40-2407-4292-b486-d80705860786',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:49Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'bf4bdec7-ad6b-4c54-a4de-66a14db081d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:49Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '01a29382-0bb0-4343-9ca9-280122835a36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:08:49Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '3fcca5bb-1b77-4592-9b31-b65d1ddd80fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:09:12Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T05:09:12.8270461Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '15ca56de-7181-4736-9a21-1d3dca72ab34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/998821d0-e563-48a5-bca6-15000312fb47')
  .query(true)
  .reply(200, {"jobId":"998821d0-e563-48a5-bca6-15000312fb47","lastUpdateDateTime":"2021-06-25T05:09:12Z","createdDateTime":"2021-06-25T05:08:38Z","expirationDateTime":"2021-06-26T05:08:38Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T05:09:12.8270461Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '219b5625-70d4-4947-aac0-b51f2213d0b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:09:13 GMT'
]);
