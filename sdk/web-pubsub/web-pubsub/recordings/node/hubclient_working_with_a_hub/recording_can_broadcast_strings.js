let nock = require('nock');

module.exports.hash = "7a3fa817b002d3ad7725638633f5d602";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/ws/api/v1/hubs/simplechat', "hello")
  .reply(202, "", [
  'Date',
  'Mon, 11 May 2020 21:05:22 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
