let nock = require('nock');

module.exports.hash = "05fb528454353b85a4d5155338f95afc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:issueAccessToken', {"scopes":["chat","voip"]})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-02-27T02:15:50.0378547+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Tq7hU3zNA0O16pxGWavN/Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '25ms',
  'X-Azure-Ref',
  '01lk4YAAAAACLk6DpgZ1NTpTAKa5ydSHxWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 02:15:50 GMT'
]);
