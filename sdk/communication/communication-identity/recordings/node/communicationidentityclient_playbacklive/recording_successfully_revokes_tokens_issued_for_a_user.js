let nock = require('nock');

module.exports.hash = "284c5e2e658ae008ca855e610331d7fe";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat","voip"]})
  .query(true)
  .reply(201, {"identity":{"id":"sanitized"},"accessToken":{"token":"sanitized","expiresOn":"2021-04-21T02:14:01.9241824+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'GM17mZEnaUu2uXHfN/7+yA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '27ms',
  'X-Azure-Ref',
  '06jh+YAAAAAB3h/GgxoznQZD39ftnZvraWVZSMzBFREdFMDMxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 20 Apr 2021 02:14:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:revokeAccessTokens')
  .query(true)
  .reply(204, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'iMV0frTY60SoI+gTPJymPA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '157ms',
  'X-Azure-Ref',
  '06jh+YAAAAAB0hfc5N0ngRI0NHHJF9I57WVZSMzBFREdFMDMxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 20 Apr 2021 02:14:02 GMT'
]);
