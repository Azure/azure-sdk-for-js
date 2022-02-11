let nock = require('nock');

module.exports.hash = "7b68286f78f9d89818bad78659b704c4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat","voip"]})
  .query(true)
  .reply(201, {"identity":{"id":"sanitized"},"accessToken":{"token":"sanitized","expiresOn":"2022-02-12T11:19:28.7904697+00:00"}}, [
  'Content-Length',
  '927',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'P+/17jYot0yoa0s07fzZZw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01, 2022-06-01',
  'X-Processing-Time',
  '42ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QEYGYgAAAAAiwrO+1uuWSrT/q/2DfPO+UFJHMDFFREdFMDYxNwBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 11 Feb 2022 11:19:28 GMT'
]);
