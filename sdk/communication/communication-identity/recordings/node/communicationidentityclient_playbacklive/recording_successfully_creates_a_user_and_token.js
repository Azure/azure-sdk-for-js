let nock = require('nock');

module.exports.hash = "0a49229be3fa1e539e92ade127fe93b5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["voip"]})
  .query(true)
  .reply(201, {"identity":{"id":"sanitized"},"accessToken":{"token":"sanitized","expiresOn":"2021-04-21T02:14:00.6747412+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'UkDXRfa6TkOWhiVM8c+/UQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '621ms',
  'X-Azure-Ref',
  '06Th+YAAAAAD3G4zkTpe/SLGyI11b+XyLWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 20 Apr 2021 02:14:01 GMT'
]);
