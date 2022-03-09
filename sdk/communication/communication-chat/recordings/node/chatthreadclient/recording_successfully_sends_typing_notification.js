let nock = require('nock');

module.exports.hash = "10dd04e171c2258c64ce665e70a9383f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AGJhzTT5V5GxxOF-a6Z84_zITnb7xu-IRf-8431aqf8w1%40thread.v2/typing', {})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'NxwGLZsuKEOL1Ypyg4TsgA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-04-05-preview6, 2021-09-07',
  'X-Processing-Time',
  '169ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FncyYQAAAADj0RaIZBUQRqLu3JULiZNLUERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 03 Sep 2021 19:27:18 GMT',
  'Content-Length',
  '0'
]);
