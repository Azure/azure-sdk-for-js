let nock = require('nock');

module.exports.hash = "0c018911d7b8c915100686d9373b4af8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/a00736a2-cd59-46f2-8c1e-3aaaa249b403',
  'x-envoy-upstream-service-time',
  '236',
  'apim-request-id',
  '42180388-4211-4055-9cd4-d207ada99f88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/a00736a2-cd59-46f2-8c1e-3aaaa249b403')
  .query(true)
  .reply(200, {"jobId":"a00736a2-cd59-46f2-8c1e-3aaaa249b403","lastUpdateDateTime":"2021-06-25T05:10:26Z","createdDateTime":"2021-06-25T05:10:26Z","expirationDateTime":"2021-06-26T05:10:26Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'd0a6f662-5afd-42fa-a81c-7e1024282c0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/a00736a2-cd59-46f2-8c1e-3aaaa249b403')
  .query(true)
  .reply(200, {"jobId":"a00736a2-cd59-46f2-8c1e-3aaaa249b403","lastUpdateDateTime":"2021-06-25T05:10:26Z","createdDateTime":"2021-06-25T05:10:26Z","expirationDateTime":"2021-06-26T05:10:26Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '7fb0d39d-b2ce-4f02-8d61-c39871ce7ac3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/a00736a2-cd59-46f2-8c1e-3aaaa249b403')
  .query(true)
  .reply(200, {"jobId":"a00736a2-cd59-46f2-8c1e-3aaaa249b403","lastUpdateDateTime":"2021-06-25T05:10:26Z","createdDateTime":"2021-06-25T05:10:26Z","expirationDateTime":"2021-06-26T05:10:26Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '17656649-e5f7-48a0-a61c-7f9d573c4048',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/a00736a2-cd59-46f2-8c1e-3aaaa249b403')
  .query(true)
  .reply(200, {"jobId":"a00736a2-cd59-46f2-8c1e-3aaaa249b403","lastUpdateDateTime":"2021-06-25T05:10:29Z","createdDateTime":"2021-06-25T05:10:26Z","expirationDateTime":"2021-06-26T05:10:26Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '4de54aa0-473f-49d8-b677-55b872ff1bec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/a00736a2-cd59-46f2-8c1e-3aaaa249b403')
  .query(true)
  .reply(200, {"jobId":"a00736a2-cd59-46f2-8c1e-3aaaa249b403","lastUpdateDateTime":"2021-06-25T05:10:29Z","createdDateTime":"2021-06-25T05:10:26Z","expirationDateTime":"2021-06-26T05:10:26Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  '5fc94513-d40d-476a-a915-d07e8c66ea9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:10:30 GMT'
]);
