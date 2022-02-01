let nock = require('nock');

module.exports.hash = "1b4d74b8fdcbd80f10e063f085f851c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AR3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1%40thread.v2/readReceipts', {"chatMessageId":"1643757023943"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'jRFMyLa/1kyqO+jXo9hQaw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '362ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04L35YQAAAAA0MNRxXT4yRa/QBkEzkalhUERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:24 GMT',
  'Content-Length',
  '0'
]);
