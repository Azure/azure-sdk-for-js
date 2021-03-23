let nock = require('nock');

module.exports.hash = "278580f267608a5e619c05170a02ae2c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/simplechat/users/foo')
  .query(true)
  .reply(404, "", [
  'Date',
  'Tue, 23 Mar 2021 01:43:46 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .delete('/api/hubs/simplechat/users/brian/groups')
  .query(true)
  .reply(200, "", [
  'Date',
  'Tue, 23 Mar 2021 01:43:46 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
