let nock = require('nock');

module.exports.hash = "361c9509cd3971c97ef38170fb523f80";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/users/brian/:send', "hello")
  .query(true)
  .reply(202, "", [
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
  .post('/api/hubs/simplechat/users/brian/:send', {"x":1,"y":2})
  .query(true)
  .reply(202, "", [
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
  .post('/api/hubs/simplechat/users/brian/:send', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
  .query(true)
  .reply(202, "", [
  'Date',
  'Tue, 20 Apr 2021 23:02:54 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
