let nock = require('nock');

module.exports.hash = "b05ea37329b38af44e8626ef9a939098";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/groups/group/:send', "hello")
  .query(true)
  .reply(202, "", [
  'Date',
  'Wed, 20 Oct 2021 18:53:18 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/groups/group/:send', {"x":1,"y":2})
  .query(true)
  .reply(202, "", [
  'Date',
  'Wed, 20 Oct 2021 18:53:18 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/groups/group/:send', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
  .query(true)
  .reply(202, "", [
  'Date',
  'Wed, 20 Oct 2021 18:53:18 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
