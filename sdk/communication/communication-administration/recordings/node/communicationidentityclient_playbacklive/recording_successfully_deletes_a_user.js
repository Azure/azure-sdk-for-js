let nock = require('nock');

module.exports.hash = "c32f7ebc5af64d902e3e080cc228e00f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/identities/sanitized')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '62IvL0rpM0WTit4IOMyxyA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '180ms',
  'X-Azure-Ref',
  '0JP0GYAAAAAAWVrFMxKQDT5rgGt1tHUQSWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 19 Jan 2021 15:39:16 GMT'
]);
