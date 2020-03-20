let nock = require('nock');

module.exports.hash = "fdd3c05c77deea22cdb572e09112ead4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/ws/api/v1/hubs/xxxx/connections/simplechat')
  .reply(404, "", [
  'Date',
  'Mon, 11 May 2020 21:05:22 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/ws/api/v1/hubs/xxxx/connections/simplechat')
  .reply(202, "", [
  'Date',
  'Mon, 11 May 2020 21:05:23 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
