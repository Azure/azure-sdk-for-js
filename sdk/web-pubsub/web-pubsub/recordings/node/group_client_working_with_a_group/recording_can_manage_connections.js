let nock = require('nock');

module.exports.hash = "5ea89f12c6bdf180de66a868decb4746";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/ws/api/v1/hubs/simplechat/groups/group/connections/xxxx')
  .reply(404, ["1f8b080000000000000372cecfcb4b4d2ec9cccf53c84c51c8cb2f5148cb2fcd4b01000000ffff03002a887b5e17000000"], [
  'Date',
  'Mon, 11 May 2020 21:55:32 GMT',
  'Content-Type',
  'text/plain; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'Content-Encoding',
  'gzip',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/ws/api/v1/hubs/simplechat/groups/group/connections/xxxx')
  .reply(200, "", [
  'Date',
  'Mon, 11 May 2020 21:55:32 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
