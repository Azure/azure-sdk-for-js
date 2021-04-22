let nock = require('nock');

module.exports.hash = "d4dcead1489e399ce1c98f883e57400a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/api/hubs/simplechat/permissions/joinLeaveGroup/connections/xxx')
  .query(true)
  .reply(404, ["1f8b080000000000000372cecfcb4b4d2ec9cccf53c84c51c8cb2f5148cb2fcd4b01000000ffff","03002a887b5e17000000"], [
  'Date',
  'Thu, 22 Apr 2021 16:33:16 GMT',
  'Content-Type',
  'text/plain; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
