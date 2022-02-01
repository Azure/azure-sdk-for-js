let nock = require('nock');

module.exports.hash = "10dd04e171c2258c64ce665e70a9383f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AR3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1%40thread.v2/typing', {})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'nK4/S85ws0aj/HSQaC1zlA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '162ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04L35YQAAAABlkoeNeyn8TpQntgCmX/v7UERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:23 GMT',
  'Content-Length',
  '0'
]);
