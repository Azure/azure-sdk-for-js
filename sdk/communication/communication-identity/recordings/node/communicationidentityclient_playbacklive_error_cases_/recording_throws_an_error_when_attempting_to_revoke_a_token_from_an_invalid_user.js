let nock = require('nock');

module.exports.hash = "1deb352058fce6a67642ca47cdba883f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:revokeAccessTokens')
  .query(true)
  .reply(401, {"error":{"code":"IdentityNotOwned","message":"Provided identity doesn't belong to the resource."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'o9/i8cJTAE+/U52j7tpcIA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01, 2022-06-01',
  'X-Processing-Time',
  '20ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Q0YGYgAAAAC3kesVSBQ2QKkH//KeLUQfUFJHMDFFREdFMDcxOQBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 11 Feb 2022 11:19:31 GMT'
]);
