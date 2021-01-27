let nock = require('nock');

module.exports.hash = "cf8b468d221de05cd3880e4f48eec43c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'RnFSJDpQ+0eQZqGR0oNGNg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '153ms',
  'X-Azure-Ref',
  '0wcERYAAAAAAsNBThEOzcRbjYJOW/cnX6WVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:49 GMT'
]);
