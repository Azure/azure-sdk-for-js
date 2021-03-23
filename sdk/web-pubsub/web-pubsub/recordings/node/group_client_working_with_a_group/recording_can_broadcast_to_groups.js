let nock = require('nock');

module.exports.hash = "d44ec7f0f86ff976f42b0193d1264554";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/group/groups/simplechat/:send', "hello")
  .query(true)
  .reply(202, "", [
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
  .post('/api/hubs/group/groups/simplechat/:send', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
  .query(true)
  .reply(202, "", [
  'Date',
  'Tue, 23 Mar 2021 01:43:44 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
