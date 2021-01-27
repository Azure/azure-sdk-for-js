let nock = require('nock');

module.exports.hash = "22d750de7546d2dcc5887deec259aedb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2/members')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7305-6032-3b3a0d0096dd","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7acf-6032-3b3a0d0096de","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'r+aCtwGgPU6GCPMGrwax5Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2',
  'X-Processing-Time',
  '66ms',
  'X-Azure-Ref',
  '0wMERYAAAAADhpQM9ZIUxS62rBslbUtyIWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:48 GMT'
]);
