let nock = require('nock');

module.exports.hash = "1dfc7f0c3f149f1eed3b561562bf24bc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/ws/api/v1/hubs/simplechat/users/foo')
  .reply(404, "", [
  'Date',
  'Mon, 11 May 2020 21:55:35 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/ws/api/v1/hubs/simplechat/users/brian/groups')
  .reply(200, "", [
  'Date',
  'Mon, 11 May 2020 21:55:35 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
