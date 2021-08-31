let nock = require('nock');

module.exports.hash = "8c61a31eacda12d37e48efead969305b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('endpoint:443', {"encodedQueryParams":true})
  .put('/api/hubs/simplechat/permissions/joinLeaveGroup/connections/xxx')
  .query(true)
  .reply(404, ["1f8b080000000000000372cecfcb4b4d2ec9cccf53c84c51c8cb2f5148cb2fcd4b01000000ffff","03002a887b5e17000000"], [
  'Date',
  'Tue, 31 Aug 2021 18:15:56 GMT',
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
