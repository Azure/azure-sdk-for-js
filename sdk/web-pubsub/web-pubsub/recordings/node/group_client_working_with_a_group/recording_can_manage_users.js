let nock = require('nock');

module.exports.hash = "4e60ac6ee2ad28a116e3843b0788971c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .put('/api/hubs/group/users/brian/groups/simplechat')
  .query(true)
  .reply(200, "", [
  'Date',
  'Tue, 23 Mar 2021 01:43:44 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/group/users/brian/groups/simplechat')
  .query(true)
  .reply(200, "", [
  'Date',
  'Tue, 23 Mar 2021 01:43:44 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/group/users/jeff/groups/simplechat')
  .query(true)
  .reply(404, "", [
  'Date',
  'Tue, 23 Mar 2021 01:43:45 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .delete('/api/hubs/group/users/brian/groups/simplechat')
  .query(true)
  .reply(200, "", [
  'Date',
  'Tue, 23 Mar 2021 01:43:45 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/group/users/brian/groups/simplechat')
  .query(true)
  .reply(404, "", [
  'Date',
  'Tue, 23 Mar 2021 01:43:45 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
