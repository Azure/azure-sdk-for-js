let nock = require('nock');

module.exports.hash = "8843298d006e41b95983175608ac5b1b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('endpoint:443', {"encodedQueryParams":true})
  .put('/api/hubs/simplechat/groups/group/connections/xxxx')
  .query(true)
  .reply(404, ["1f8b080000000000000372cecfcb4b4d2ec9cccf5348a800820485cc6285bcfc1285b4fcd2bc143d00000000ffff","0300a3fa1ff91f000000"], [
  'Date',
  'Wed, 01 Sep 2021 19:52:32 GMT',
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

nock('endpoint:443', {"encodedQueryParams":true})
  .delete('/api/hubs/simplechat/groups/group/connections/xxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000003f2cf06000000ffff","0300e5f958ec02000000"], [
  'Date',
  'Wed, 01 Sep 2021 19:52:32 GMT',
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
