let nock = require('nock');

module.exports.hash = "56a1b38a305074a9f8ec05e19eeb2b02";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/identities/sanitized')
  .query(true)
  .reply(204, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'SmeVJrTXkUmr1dKvb56npg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '348ms',
  'X-Azure-Ref',
  '0PTg4YAAAAAC8VUl7D82LS7X93aAMuPBjWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 25 Feb 2021 23:52:29 GMT'
]);
