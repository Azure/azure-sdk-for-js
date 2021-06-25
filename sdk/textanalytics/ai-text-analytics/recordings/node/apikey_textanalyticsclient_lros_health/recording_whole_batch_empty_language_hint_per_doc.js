let nock = require('nock');

module.exports.hash = "2ef2a9e0010a041394b0a0562051ba4e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/757b54cf-6814-4169-9d92-0713f0e1e03f',
  'x-envoy-upstream-service-time',
  '192',
  'apim-request-id',
  'f2b34217-b053-4f00-bcce-e81956c9bbc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/757b54cf-6814-4169-9d92-0713f0e1e03f')
  .query(true)
  .reply(200, {"jobId":"757b54cf-6814-4169-9d92-0713f0e1e03f","lastUpdateDateTime":"2021-06-25T05:11:10Z","createdDateTime":"2021-06-25T05:11:09Z","expirationDateTime":"2021-06-26T05:11:09Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '46639d0a-2127-4a77-9b7e-49551919a14f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/757b54cf-6814-4169-9d92-0713f0e1e03f')
  .query(true)
  .reply(200, {"jobId":"757b54cf-6814-4169-9d92-0713f0e1e03f","lastUpdateDateTime":"2021-06-25T05:11:10Z","createdDateTime":"2021-06-25T05:11:09Z","expirationDateTime":"2021-06-26T05:11:09Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2910084a-d873-45a2-93f2-88ecb90e292c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/757b54cf-6814-4169-9d92-0713f0e1e03f')
  .query(true)
  .reply(200, {"jobId":"757b54cf-6814-4169-9d92-0713f0e1e03f","lastUpdateDateTime":"2021-06-25T05:11:10Z","createdDateTime":"2021-06-25T05:11:09Z","expirationDateTime":"2021-06-26T05:11:09Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'eee2cf74-fec2-4697-a01a-f6a94d9b6fc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/757b54cf-6814-4169-9d92-0713f0e1e03f')
  .query(true)
  .reply(200, {"jobId":"757b54cf-6814-4169-9d92-0713f0e1e03f","lastUpdateDateTime":"2021-06-25T05:11:10Z","createdDateTime":"2021-06-25T05:11:09Z","expirationDateTime":"2021-06-26T05:11:09Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '541b420b-7a99-42bd-924e-23cf98d19df9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:11 GMT'
]);
