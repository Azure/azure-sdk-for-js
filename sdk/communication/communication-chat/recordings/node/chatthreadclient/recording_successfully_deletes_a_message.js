let nock = require('nock');

module.exports.hash = "99dab1eee1f2015b9c781625ce8891cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2/messages/1614374194140')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'mSTQOBVWr0yyZv+fDIvchg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '275ms',
  'X-Azure-Ref',
  '0M2U5YAAAAADHn96zizwqSbPB8aq0HTFgWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:34 GMT'
]);
