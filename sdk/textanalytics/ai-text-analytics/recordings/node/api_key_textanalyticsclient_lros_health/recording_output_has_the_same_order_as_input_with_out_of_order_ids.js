let nock = require('nock');

module.exports.hash = "29d09cad09699f8d65a8066b64223a17";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/3d7a4b47-a1ce-41b3-9fdb-5c2939486847',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '8fa138f1-4e7e-47eb-8696-29bb637f7ce1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/3d7a4b47-a1ce-41b3-9fdb-5c2939486847')
  .query(true)
  .reply(200, {"jobId":"3d7a4b47-a1ce-41b3-9fdb-5c2939486847","lastUpdateDateTime":"2021-05-12T19:04:57Z","createdDateTime":"2021-05-12T19:04:57Z","expirationDateTime":"2021-05-13T19:04:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6d6c0ce8-136c-4bf7-9241-61458702d79e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/3d7a4b47-a1ce-41b3-9fdb-5c2939486847')
  .query(true)
  .reply(200, {"jobId":"3d7a4b47-a1ce-41b3-9fdb-5c2939486847","lastUpdateDateTime":"2021-05-12T19:04:57Z","createdDateTime":"2021-05-12T19:04:57Z","expirationDateTime":"2021-05-13T19:04:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e93a2acb-707c-48aa-b6b9-6f90c143f48c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/3d7a4b47-a1ce-41b3-9fdb-5c2939486847')
  .query(true)
  .reply(200, {"jobId":"3d7a4b47-a1ce-41b3-9fdb-5c2939486847","lastUpdateDateTime":"2021-05-12T19:04:57Z","createdDateTime":"2021-05-12T19:04:57Z","expirationDateTime":"2021-05-13T19:04:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '92d69fa5-7d1a-4101-9adc-8744898ba2ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/3d7a4b47-a1ce-41b3-9fdb-5c2939486847')
  .query(true)
  .reply(200, {"jobId":"3d7a4b47-a1ce-41b3-9fdb-5c2939486847","lastUpdateDateTime":"2021-05-12T19:05:01Z","createdDateTime":"2021-05-12T19:04:57Z","expirationDateTime":"2021-05-13T19:04:57Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'efd9f4d0-6162-4888-a9a8-6eba7b62828d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/3d7a4b47-a1ce-41b3-9fdb-5c2939486847')
  .query(true)
  .reply(200, {"jobId":"3d7a4b47-a1ce-41b3-9fdb-5c2939486847","lastUpdateDateTime":"2021-05-12T19:05:02Z","createdDateTime":"2021-05-12T19:04:57Z","expirationDateTime":"2021-05-13T19:04:57Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  '7e99d789-eb70-4751-8f1c-8e8d3875c5f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/3d7a4b47-a1ce-41b3-9fdb-5c2939486847')
  .query(true)
  .reply(200, {"jobId":"3d7a4b47-a1ce-41b3-9fdb-5c2939486847","lastUpdateDateTime":"2021-05-12T19:05:02Z","createdDateTime":"2021-05-12T19:04:57Z","expirationDateTime":"2021-05-13T19:04:57Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'b305a595-ef47-4a9b-bfc4-4a1657a53d7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:04 GMT'
]);
