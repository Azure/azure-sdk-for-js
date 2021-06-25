let nock = require('nock');

module.exports.hash = "38c89bab41a80575c79a37ce18c38ae0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/d837e4e8-875d-4dfd-b261-daaf65f48775',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  'f7fd222f-2c83-4897-8953-b03227d126bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d837e4e8-875d-4dfd-b261-daaf65f48775')
  .query(true)
  .reply(200, {"jobId":"d837e4e8-875d-4dfd-b261-daaf65f48775","lastUpdateDateTime":"2021-06-25T05:10:55Z","createdDateTime":"2021-06-25T05:10:55Z","expirationDateTime":"2021-06-26T05:10:55Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '1cac00b8-473a-45bc-a9e2-8f987b8840d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d837e4e8-875d-4dfd-b261-daaf65f48775')
  .query(true)
  .reply(200, {"jobId":"d837e4e8-875d-4dfd-b261-daaf65f48775","lastUpdateDateTime":"2021-06-25T05:10:55Z","createdDateTime":"2021-06-25T05:10:55Z","expirationDateTime":"2021-06-26T05:10:55Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'fc6f91b8-5ab0-4686-8425-24bfdc10aa95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d837e4e8-875d-4dfd-b261-daaf65f48775')
  .query(true)
  .reply(200, {"jobId":"d837e4e8-875d-4dfd-b261-daaf65f48775","lastUpdateDateTime":"2021-06-25T05:10:55Z","createdDateTime":"2021-06-25T05:10:55Z","expirationDateTime":"2021-06-26T05:10:55Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '521cc129-7bb9-4412-acd9-5e48d95a1116',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d837e4e8-875d-4dfd-b261-daaf65f48775')
  .query(true)
  .reply(200, {"jobId":"d837e4e8-875d-4dfd-b261-daaf65f48775","lastUpdateDateTime":"2021-06-25T05:10:55Z","createdDateTime":"2021-06-25T05:10:55Z","expirationDateTime":"2021-06-26T05:10:55Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b0c275e0-1c69-48b3-8dac-afb180ef66bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d837e4e8-875d-4dfd-b261-daaf65f48775')
  .query(true)
  .reply(200, {"jobId":"d837e4e8-875d-4dfd-b261-daaf65f48775","lastUpdateDateTime":"2021-06-25T05:11:00Z","createdDateTime":"2021-06-25T05:10:55Z","expirationDateTime":"2021-06-26T05:10:55Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'd4c96551-6384-4105-899d-f205557763c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d837e4e8-875d-4dfd-b261-daaf65f48775')
  .query(true)
  .reply(200, {"jobId":"d837e4e8-875d-4dfd-b261-daaf65f48775","lastUpdateDateTime":"2021-06-25T05:11:00Z","createdDateTime":"2021-06-25T05:10:55Z","expirationDateTime":"2021-06-26T05:10:55Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e20fd1b0-71d1-43ce-ba33-f7f36619fa95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d837e4e8-875d-4dfd-b261-daaf65f48775')
  .query(true)
  .reply(200, {"jobId":"d837e4e8-875d-4dfd-b261-daaf65f48775","lastUpdateDateTime":"2021-06-25T05:11:00Z","createdDateTime":"2021-06-25T05:10:55Z","expirationDateTime":"2021-06-26T05:10:55Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2120a1f3-71c8-4187-be3c-ee7beca9402a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d837e4e8-875d-4dfd-b261-daaf65f48775')
  .query(true)
  .reply(200, {"jobId":"d837e4e8-875d-4dfd-b261-daaf65f48775","lastUpdateDateTime":"2021-06-25T05:11:00Z","createdDateTime":"2021-06-25T05:10:55Z","expirationDateTime":"2021-06-26T05:10:55Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'b600aaa1-9065-4ec5-9eef-4cfc269d0d03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d837e4e8-875d-4dfd-b261-daaf65f48775')
  .query(true)
  .reply(200, {"jobId":"d837e4e8-875d-4dfd-b261-daaf65f48775","lastUpdateDateTime":"2021-06-25T05:11:08Z","createdDateTime":"2021-06-25T05:10:55Z","expirationDateTime":"2021-06-26T05:10:55Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '7549e2f0-9fed-4c19-8461-12bc10d54f26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/d837e4e8-875d-4dfd-b261-daaf65f48775')
  .query(true)
  .reply(200, {"jobId":"d837e4e8-875d-4dfd-b261-daaf65f48775","lastUpdateDateTime":"2021-06-25T05:11:08Z","createdDateTime":"2021-06-25T05:10:55Z","expirationDateTime":"2021-06-26T05:10:55Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'd6d2ec5c-96fe-474f-b891-163580f0719f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:09 GMT'
]);
