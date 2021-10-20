let nock = require('nock');

module.exports.hash = "bb9126b73128b909c9eacabd46a0af28";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/api/hubs/simplechat/users/brian/groups/group')
  .query(true)
  .reply(404, "User `brian` is not found.", [
  'Date',
  'Wed, 20 Oct 2021 16:55:27 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '28',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
