let nock = require('nock');

module.exports.hash = "68e739025094d7d7ee600e41d62938a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/53ec2023-dc23-41a2-90b6-2471b381cbfb',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '84deceec-5de8-4fc0-828b-4437bf6ac232',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/53ec2023-dc23-41a2-90b6-2471b381cbfb')
  .query(true)
  .reply(200, {"jobId":"53ec2023-dc23-41a2-90b6-2471b381cbfb","lastUpdateDateTime":"2021-05-12T19:05:04Z","createdDateTime":"2021-05-12T19:05:04Z","expirationDateTime":"2021-05-13T19:05:04Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'dd563d22-37bb-4fba-b7c1-47b0dfc89e78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/53ec2023-dc23-41a2-90b6-2471b381cbfb')
  .query(true)
  .reply(200, {"jobId":"53ec2023-dc23-41a2-90b6-2471b381cbfb","lastUpdateDateTime":"2021-05-12T19:05:04Z","createdDateTime":"2021-05-12T19:05:04Z","expirationDateTime":"2021-05-13T19:05:04Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'df7a69dc-a6fe-49e8-b557-25188083ec5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/53ec2023-dc23-41a2-90b6-2471b381cbfb')
  .query(true)
  .reply(200, {"jobId":"53ec2023-dc23-41a2-90b6-2471b381cbfb","lastUpdateDateTime":"2021-05-12T19:05:04Z","createdDateTime":"2021-05-12T19:05:04Z","expirationDateTime":"2021-05-13T19:05:04Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f570995f-edfe-4fee-ac9a-91a6bc52fb1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/53ec2023-dc23-41a2-90b6-2471b381cbfb')
  .query(true)
  .reply(200, {"jobId":"53ec2023-dc23-41a2-90b6-2471b381cbfb","lastUpdateDateTime":"2021-05-12T19:05:07Z","createdDateTime":"2021-05-12T19:05:04Z","expirationDateTime":"2021-05-13T19:05:04Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '46bb543b-495d-4fe0-a4b1-4fbbc461b902',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:08 GMT'
]);
