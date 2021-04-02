let nock = require('nock');

module.exports.hash = "b9f0d6f973208817da8246953e6fdf55";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/cffbf10f-9057-412d-aed2-37959d4c3ae3',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  'ba9b6b7a-3cf9-4c44-8e76-20ccc28dc086',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/cffbf10f-9057-412d-aed2-37959d4c3ae3')
  .query(true)
  .reply(200, {"jobId":"cffbf10f-9057-412d-aed2-37959d4c3ae3","lastUpdateDateTime":"2020-12-22T20:07:37Z","createdDateTime":"2020-12-22T20:07:37Z","expirationDateTime":"2020-12-23T20:07:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '77adff8d-b081-49e3-ada7-fab97f702e0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/cffbf10f-9057-412d-aed2-37959d4c3ae3')
  .query(true)
  .reply(200, {"jobId":"cffbf10f-9057-412d-aed2-37959d4c3ae3","lastUpdateDateTime":"2020-12-22T20:07:37Z","createdDateTime":"2020-12-22T20:07:37Z","expirationDateTime":"2020-12-23T20:07:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '90c53b65-166c-408a-b809-ac38819fe289',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/cffbf10f-9057-412d-aed2-37959d4c3ae3')
  .query(true)
  .reply(200, {"jobId":"cffbf10f-9057-412d-aed2-37959d4c3ae3","lastUpdateDateTime":"2020-12-22T20:07:38Z","createdDateTime":"2020-12-22T20:07:37Z","expirationDateTime":"2020-12-23T20:07:37Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '69133630-6c4c-4386-962e-f320d65ad977',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/cffbf10f-9057-412d-aed2-37959d4c3ae3')
  .query(true)
  .reply(200, {"jobId":"cffbf10f-9057-412d-aed2-37959d4c3ae3","lastUpdateDateTime":"2020-12-22T20:07:38Z","createdDateTime":"2020-12-22T20:07:37Z","expirationDateTime":"2020-12-23T20:07:37Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  '4920eda5-adbf-4cb2-9896-70b14a6f319b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:39 GMT'
]);
