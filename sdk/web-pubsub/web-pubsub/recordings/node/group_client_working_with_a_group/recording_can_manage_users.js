let nock = require('nock');

module.exports.hash = "4e60ac6ee2ad28a116e3843b0788971c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .put('/api/hubs/simplechat/users/brian/groups/group')
  .query(true)
  .reply(200, "", [
  'Date',
  'Tue, 20 Apr 2021 23:02:52 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/simplechat/users/brian/groups/group')
  .query(true)
  .reply(200, "", [
  'Date',
  'Tue, 20 Apr 2021 23:02:52 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/simplechat/users/jeff/groups/group')
  .query(true)
  .reply(404, "", [
  'Date',
  'Tue, 20 Apr 2021 23:02:53 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .delete('/api/hubs/simplechat/users/brian/groups/group')
  .query(true)
  .reply(200, "", [
  'Date',
  'Tue, 20 Apr 2021 23:02:53 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/simplechat/users/brian/groups/group')
  .query(true)
  .reply(404, "", [
  'Date',
  'Tue, 20 Apr 2021 23:02:53 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
