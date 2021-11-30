let nock = require('nock');

module.exports.hash = "8c61a31eacda12d37e48efead969305b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/api/hubs/simplechat/permissions/joinLeaveGroup/connections/xxx')
  .query(true)
  .reply(404, "Connection id not found", [
  'Date',
  'Wed, 20 Oct 2021 18:53:20 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '25',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
