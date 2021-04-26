let nock = require('nock');

module.exports.hash = "4e60ac6ee2ad28a116e3843b0788971c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/api/hubs/simplechat/users/brian/groups/group')
  .query(true)
  .reply(200, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:13 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/simplechat/users/brian/groups/group')
  .query(true)
  .reply(200, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:13 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/simplechat/users/jeff/groups/group')
  .query(true)
  .reply(404, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:14 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/api/hubs/simplechat/users/brian/groups/group')
  .query(true)
  .reply(200, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:14 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/simplechat/users/brian/groups/group')
  .query(true)
  .reply(404, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:14 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
