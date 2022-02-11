let nock = require('nock');

module.exports.hash = "68393c8e48c01060a84fe889ce440464";

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
  'r/iFEHq750GXq9HEr5+ChA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01, 2022-06-01',
  'X-Processing-Time',
  '31ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QEYGYgAAAAA7xGoRP1veSpl+fXXjLy22UFJHMDFFREdFMDkxNwBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 11 Feb 2022 11:19:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:issueAccessToken', {"scopes":["chat","voip"]})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2022-02-12T11:19:28.5335571+00:00"}, [
  'Content-Length',
  '811',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'CnzTQYQizk2W50peUNNc3A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01, 2022-06-01',
  'X-Processing-Time',
  '34ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QEYGYgAAAAC+g9T+/lleTYgoUNlvySlRUFJHMDFFREdFMDkxNwBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 11 Feb 2022 11:19:27 GMT'
]);
