let nock = require('nock');

module.exports.hash = "709c999753141aec3aca59c5aae20c4d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .put('/api/hubs/simplechat/groups/group/connections/xxxx')
  .query(true)
  .reply(404, ["1f8b080000000000000372cecfcb4b4d2ec9cccf53c84c51c8cb2f5148cb2fcd4b01000000ffff","03002a887b5e17000000"], [
  'Date',
  'Tue, 20 Apr 2021 23:02:52 GMT',
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

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .delete('/api/hubs/simplechat/groups/group/connections/xxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000003f2cf06000000ffff","0300e5f958ec02000000"], [
  'Date',
  'Tue, 20 Apr 2021 23:02:52 GMT',
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
