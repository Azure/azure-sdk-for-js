let nock = require('nock');

module.exports.hash = "7160d852eda324e694f8e4d3ded156f2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/api/hubs/simplechat/groups/group/connections/xxxx')
  .query(true)
  .reply(404, "Connection `xxxx` is not found.", [
  'Date',
  'Wed, 20 Oct 2021 18:53:18 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '33',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/api/hubs/simplechat/groups/group/connections/xxxx')
  .query(true)
  .reply(200, "Ok", [
  'Date',
  'Wed, 20 Oct 2021 18:53:18 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '4',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
