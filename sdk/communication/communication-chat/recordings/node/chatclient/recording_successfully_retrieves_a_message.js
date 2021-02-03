let nock = require('nock');

module.exports.hash = "351e07a6e84a7c1868189a472027db0c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2/messages/1611776447102')
  .query(true)
  .reply(200, {"id":"1611776447102","type":"Text","priority":"Normal","version":"1611776447102","content":"content","senderDisplayName":"","createdOn":"2021-01-27T19:40:47Z","senderId":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Z/FE7bGqck+yT5y3uYR8Jg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '70ms',
  'X-Azure-Ref',
  '0v8ERYAAAAAARxNP62ZuxSZdXrYT4UCqMWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:47 GMT'
]);
