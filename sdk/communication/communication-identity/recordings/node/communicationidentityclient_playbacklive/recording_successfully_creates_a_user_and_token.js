let nock = require('nock');

module.exports.hash = "e98ff1dfce71aa4f9a7d2261e2fa2cac";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["voip"]})
  .query(true)
  .reply(201, {"identity":{"id":"sanitized"},"accessToken":{"token":"sanitized","expiresOn":"2021-02-27T02:15:49.8605259+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'w6D8Tr50b0Om8tdtvOl04A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '30ms',
  'X-Azure-Ref',
  '01lk4YAAAAAD2v27sZyFyRqXC7hiejpwgWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 02:15:50 GMT'
]);
