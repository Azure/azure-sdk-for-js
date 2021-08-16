let nock = require('nock');

module.exports.hash = "bdca27f5194e1e922e90e3753a046f16";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/5192e467-8155-4968-ae7e-e764599c6e2c',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  'f80d9454-cb63-4835-9d14-b73644c4cbf6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/5192e467-8155-4968-ae7e-e764599c6e2c')
  .query(true)
  .reply(200, {"jobId":"5192e467-8155-4968-ae7e-e764599c6e2c","lastUpdateDateTime":"2021-08-03T22:43:32Z","createdDateTime":"2021-08-03T22:43:32Z","expirationDateTime":"2021-08-04T22:43:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'cfbb2e4b-e581-4b32-b699-61562772de28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/5192e467-8155-4968-ae7e-e764599c6e2c')
  .query(true)
  .reply(200, {"jobId":"5192e467-8155-4968-ae7e-e764599c6e2c","lastUpdateDateTime":"2021-08-03T22:43:32Z","createdDateTime":"2021-08-03T22:43:32Z","expirationDateTime":"2021-08-04T22:43:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'c068b373-a577-4062-96ac-0d8509d16966',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/5192e467-8155-4968-ae7e-e764599c6e2c')
  .query(true)
  .reply(200, {"jobId":"5192e467-8155-4968-ae7e-e764599c6e2c","lastUpdateDateTime":"2021-08-03T22:43:33Z","createdDateTime":"2021-08-03T22:43:32Z","expirationDateTime":"2021-08-04T22:43:32Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '89a3aeaa-a611-4034-a38e-eeacba009ea1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/5192e467-8155-4968-ae7e-e764599c6e2c')
  .query(true)
  .reply(200, {"jobId":"5192e467-8155-4968-ae7e-e764599c6e2c","lastUpdateDateTime":"2021-08-03T22:43:33Z","createdDateTime":"2021-08-03T22:43:32Z","expirationDateTime":"2021-08-04T22:43:32Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '8e09c2d3-61dc-4aa8-ab1a-9efa37937c02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:34 GMT'
]);
