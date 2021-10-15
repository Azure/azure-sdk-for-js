let nock = require('nock');

module.exports.hash = "c43ca28e535afc7fa59c4926d1c1d188";

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
  'zbsRahYeTkeQoApFjaLo7A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '106ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0HcppYQAAAABA+/NOvhZTTL7s+DDK3PnQUFJHMDFFREdFMDcxNQBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 15 Oct 2021 18:36:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/identities/sanitized')
  .query(true)
  .reply(204, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'IJHJbmDe5EWa7WBiNWdbuQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '173ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0HcppYQAAAAAhDax3DlP1Rosh/6zBtyNtUFJHMDFFREdFMDcxNQBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 15 Oct 2021 18:36:13 GMT'
]);
