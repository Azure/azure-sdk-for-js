let nock = require('nock');

module.exports.hash = "2e1ffc8ba426d43087d961bc22a8b47f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/identities/sanitized')
  .query(true)
  .reply(401, {"error":{"code":"IdentityNotOwned","message":"Provided identity doesn't belong to the resource."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Gz0f2TNTAESSNgQ0aZUp1A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '15ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0HYXKYAAAAABg6PDEYq62RZOBlGDkzzk6WVZSMzBFREdFMDMyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:11:25 GMT'
]);
