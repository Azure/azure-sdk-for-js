let nock = require('nock');

module.exports.hash = "fcf7c06497229418e8940596f0f9de59";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/4b6b2676-c330-4a12-bf23-de75fa6c32fa',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  '034a28c6-e596-43cd-8cd2-9d2118232243',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/4b6b2676-c330-4a12-bf23-de75fa6c32fa')
  .query(true)
  .reply(200, {"jobId":"4b6b2676-c330-4a12-bf23-de75fa6c32fa","lastUpdateDateTime":"2021-06-25T05:10:33Z","createdDateTime":"2021-06-25T05:10:33Z","expirationDateTime":"2021-06-26T05:10:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '0cb319a3-2089-44a9-8848-a047f1547a18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/4b6b2676-c330-4a12-bf23-de75fa6c32fa')
  .query(true)
  .reply(200, {"jobId":"4b6b2676-c330-4a12-bf23-de75fa6c32fa","lastUpdateDateTime":"2021-06-25T05:10:33Z","createdDateTime":"2021-06-25T05:10:33Z","expirationDateTime":"2021-06-26T05:10:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'efc75332-bdd5-4e20-9b7c-666b1932761d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/4b6b2676-c330-4a12-bf23-de75fa6c32fa')
  .query(true)
  .reply(200, {"jobId":"4b6b2676-c330-4a12-bf23-de75fa6c32fa","lastUpdateDateTime":"2021-06-25T05:10:34Z","createdDateTime":"2021-06-25T05:10:33Z","expirationDateTime":"2021-06-26T05:10:33Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '12d8294d-9f20-4b25-b86f-eb2e880ad085',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/4b6b2676-c330-4a12-bf23-de75fa6c32fa')
  .query(true)
  .reply(200, {"jobId":"4b6b2676-c330-4a12-bf23-de75fa6c32fa","lastUpdateDateTime":"2021-06-25T05:10:34Z","createdDateTime":"2021-06-25T05:10:33Z","expirationDateTime":"2021-06-26T05:10:33Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '9d3a3b42-3e39-40b6-b66f-2635b3ab013e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:35 GMT'
]);
