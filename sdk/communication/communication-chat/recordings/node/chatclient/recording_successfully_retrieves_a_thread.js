let nock = require('nock');

module.exports.hash = "4c98a9f5ec62a0dd8db7cf60afdac286";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:a57caa80215748b484a26279925e5a92@thread.v2","topic":"test topic","createdOn":"2021-01-27T19:40:46Z","createdBy":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420","members":[{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7305-6032-3b3a0d0096dd","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'XZ5E2kt9CUSo6ebSCEgbWw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '79ms',
  'X-Azure-Ref',
  '0vsERYAAAAADOXipq12nxRZJctJPReLvNWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:46 GMT'
]);
