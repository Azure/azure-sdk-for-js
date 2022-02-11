let nock = require('nock');

module.exports.hash = "b6315c3102987354fe49806f064f6b1b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat","voip"]})
  .query(true)
  .reply(201, {"identity":{"id":"sanitized"},"accessToken":{"token":"sanitized","expiresOn":"2022-02-12T11:19:29.072907+00:00"}}, [
  'Content-Length',
  '926',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'edb4qFdkfE6asA9ID1z+pg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01, 2022-06-01',
  'X-Processing-Time',
  '53ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QEYGYgAAAACX1077LAlWQI8PqACg1+N4UFJHMDFFREdFMDcxMwBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 11 Feb 2022 11:19:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:revokeAccessTokens')
  .query(true)
  .reply(204, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'u79Ak6dBjEeDZJSRv48etg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01, 2022-06-01',
  'X-Processing-Time',
  '109ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QUYGYgAAAADkJbyzYuLOQZccrv39RBDvUFJHMDFFREdFMDcxMwBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 11 Feb 2022 11:19:28 GMT'
]);
