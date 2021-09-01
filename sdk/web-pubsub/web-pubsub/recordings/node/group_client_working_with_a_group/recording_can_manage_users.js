let nock = require('nock');

module.exports.hash = "46569ffa13813a00ed92859b614d5496";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/api/hubs/simplechat/users/brian/groups/group')
  .query(true)
  .reply(404, ["1f8b08000000000000030a2d4e2d5248482aca4ccc4b50c82c56c8cb2f5148cb2fcd4bd103000000ffff","0300cf51bf3f1a000000"], [
  'Date',
  'Wed, 01 Sep 2021 22:47:03 GMT',
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

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/api/hubs/simplechat/users/brian/groups/group')
  .query(true)
  .reply(200, ["1f8b08000000000000030a2d4e2d5248482aca4ccc4b50c82c56c8cb2f5148cb2fcd4bd103000000ffff","0300cf51bf3f1a000000"], [
  'Date',
  'Wed, 01 Sep 2021 22:47:03 GMT',
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
