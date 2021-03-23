let nock = require('nock');

module.exports.hash = "2ab947064d8d64d2878c071972f75afb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://https%3A%2F%2Fendpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/simplechat/connections/xxx')
  .query(true)
  .reply(404, "", [
  'Date',
  'Tue, 23 Mar 2021 01:43:46 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
