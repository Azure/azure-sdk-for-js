let nock = require('nock');

module.exports.hash = "53edc15aa669bdf8a052f15fbf8840b3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/8d9925aa-96e2-4abc-a06d-0681fc923b8b',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  'beb7214d-ebd3-49d3-a414-c8e18601d3b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8d9925aa-96e2-4abc-a06d-0681fc923b8b')
  .query(true)
  .reply(200, {"jobId":"8d9925aa-96e2-4abc-a06d-0681fc923b8b","lastUpdateDateTime":"2021-06-25T19:55:03Z","createdDateTime":"2021-06-25T19:55:03Z","expirationDateTime":"2021-06-26T19:55:03Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4549f977-3775-4bd3-8113-a3c4715c29e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8d9925aa-96e2-4abc-a06d-0681fc923b8b')
  .query(true)
  .reply(200, {"jobId":"8d9925aa-96e2-4abc-a06d-0681fc923b8b","lastUpdateDateTime":"2021-06-25T19:55:03Z","createdDateTime":"2021-06-25T19:55:03Z","expirationDateTime":"2021-06-26T19:55:03Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6cb68a02-ee16-4a45-8e0d-16450dc2835e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8d9925aa-96e2-4abc-a06d-0681fc923b8b')
  .query(true)
  .reply(200, {"jobId":"8d9925aa-96e2-4abc-a06d-0681fc923b8b","lastUpdateDateTime":"2021-06-25T19:55:04Z","createdDateTime":"2021-06-25T19:55:03Z","expirationDateTime":"2021-06-26T19:55:03Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '591e60f8-4db0-446a-bcf8-512303ffea40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8d9925aa-96e2-4abc-a06d-0681fc923b8b')
  .query(true)
  .reply(200, {"jobId":"8d9925aa-96e2-4abc-a06d-0681fc923b8b","lastUpdateDateTime":"2021-06-25T19:55:04Z","createdDateTime":"2021-06-25T19:55:03Z","expirationDateTime":"2021-06-26T19:55:03Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f3dabb31-126c-4283-81e3-7e42fa6f6645',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8d9925aa-96e2-4abc-a06d-0681fc923b8b')
  .query(true)
  .reply(200, {"jobId":"8d9925aa-96e2-4abc-a06d-0681fc923b8b","lastUpdateDateTime":"2021-06-25T19:55:04Z","createdDateTime":"2021-06-25T19:55:03Z","expirationDateTime":"2021-06-26T19:55:03Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '0559be89-25da-4aaa-8ce4-11ffd34d0137',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8d9925aa-96e2-4abc-a06d-0681fc923b8b')
  .query(true)
  .reply(200, {"jobId":"8d9925aa-96e2-4abc-a06d-0681fc923b8b","lastUpdateDateTime":"2021-06-25T19:55:11Z","createdDateTime":"2021-06-25T19:55:03Z","expirationDateTime":"2021-06-26T19:55:03Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:55:11.2048044Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '4f62fb98-ecf4-44f6-87e1-9a5134b58f59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/8d9925aa-96e2-4abc-a06d-0681fc923b8b')
  .query(true)
  .reply(200, {"jobId":"8d9925aa-96e2-4abc-a06d-0681fc923b8b","lastUpdateDateTime":"2021-06-25T19:55:11Z","createdDateTime":"2021-06-25T19:55:03Z","expirationDateTime":"2021-06-26T19:55:03Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:55:11.2048044Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '3e7ad06f-5e92-4c5c-8dcc-65ca11d5d290',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:11 GMT'
]);
