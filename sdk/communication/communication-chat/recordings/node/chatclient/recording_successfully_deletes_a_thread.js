let nock = require('nock');

module.exports.hash = "39345a98092c2d516c252dd29423ff64";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'UqN9uY8MdU6EcWB4BRmFSQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '299ms',
  'X-Azure-Ref',
  '0tu3sXwAAAAB+0NTxSAxDR54rdDoMiSoAWVZSMzBFREdFMDQxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:30 GMT'
]);
