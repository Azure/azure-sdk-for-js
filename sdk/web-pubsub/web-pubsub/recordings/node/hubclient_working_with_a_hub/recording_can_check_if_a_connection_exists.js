let nock = require('nock');

module.exports.hash = "9e02cbdf04d3a7a3a3b64a5c664ec9c1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/ws/api/v1/hubs/xxx/connections/simplechat')
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
