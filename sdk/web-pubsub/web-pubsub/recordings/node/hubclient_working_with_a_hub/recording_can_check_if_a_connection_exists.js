let nock = require('nock');

module.exports.hash = "2ab947064d8d64d2878c071972f75afb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .head('/api/hubs/simplechat/connections/xxx')
  .query(true)
  .reply(404, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:15 GMT',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
