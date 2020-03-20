let nock = require('nock');

module.exports.hash = "0bbe448bd8f2c9507b181a1fa637a421";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .head('/api/v1/health')
  .reply(200, "", [
  'Date',
  'Mon, 11 May 2020 21:55:36 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
