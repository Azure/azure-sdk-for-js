let nock = require('nock');

module.exports.hash = "ed18ffc85a130ce448c3ca7906b2e304";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"sanitized"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Lmoqw4N2L0C5y/fRKV27dA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '97ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0HsppYQAAAAAcD84rNtexSr751iMGaGy0UFJHMDFFREdFMDcxMgBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 15 Oct 2021 18:36:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:issueAccessToken', {"scopes":[]})
  .query(true)
  .reply(400, {"error":{"code":"ValidationError","message":"Invalid scopes - Scopes field is required.","target":"scopes"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'B1N9O1fQLEy2MtAT0qgS0Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '17ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0HsppYQAAAAAgxhqw27tzSbzXH4EgQb0VUFJHMDFFREdFMDcxMgBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 15 Oct 2021 18:36:14 GMT'
]);
