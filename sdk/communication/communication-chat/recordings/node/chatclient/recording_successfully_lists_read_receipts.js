let nock = require('nock');

module.exports.hash = "e351de90db1a935439638e481a932450";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2/readreceipts')
  .query(true)
  .reply(200, {"value":[{"senderId":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420","chatMessageId":"1611776447102","readOn":"2021-01-27T19:40:47Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '4WqU/vXH0USFvqVpHVtm1A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '58ms',
  'X-Azure-Ref',
  '0wcERYAAAAADaR/wtHL1oRqSTXv8n7633WVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:48 GMT'
]);
