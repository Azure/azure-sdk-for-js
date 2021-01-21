let nock = require('nock');

module.exports.hash = "f30fde667c7b7a14ab32826e4d83a221";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/identities/sanitized/token', {"scopes":["chat","pstn"]})
  .query(false)
  .reply(200, {"id":"sanitized","token":"sanitized","expiresOn":"2021-01-19T19:45:28.6827919+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Bsgix1tj/0mOdTRhDCdtvA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '274ms',
  'X-Azure-Ref',
  '0WeUFYAAAAAB1X99Q6T2UT6sZb4Ndxi7SRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:45:29 GMT'
]);
