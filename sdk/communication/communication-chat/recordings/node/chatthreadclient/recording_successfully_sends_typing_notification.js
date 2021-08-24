let nock = require('nock');

module.exports.hash = "10dd04e171c2258c64ce665e70a9383f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A6GWcNAPQG7ZctIOLMIvOZnlvHJo5gahbUshyKQfgCa41%40thread.v2/typing', {})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'YwJ4dBRQNUuC4zVtbmiYUg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-04-05-preview6',
  'X-Processing-Time',
  '220ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GUkkYQAAAAB+tF/99pTpRbunI4e6jECHUERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 24 Aug 2021 01:19:21 GMT',
  'Content-Length',
  '0'
]);
