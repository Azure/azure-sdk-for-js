let nock = require('nock');

module.exports.hash = "5398dcf909b28c2ed3c37295df16e906";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/users/brian/:send', "hello")
  .query(true)
  .reply(202, "", [
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
  .post('/api/hubs/simplechat/users/brian/:send', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
  .query(true)
  .reply(202, "", [
  'Date',
  'Tue, 23 Mar 2021 01:43:46 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
