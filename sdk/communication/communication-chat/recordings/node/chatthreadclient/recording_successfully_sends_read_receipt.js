let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .post('/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899%40thread.v2/readReceipts', { "chatMessageId": "1614300005782" })
  .query(true)
  .reply(200, "", [
    'MS-CV',
    'nzk92k7NakSElw5PEY07yA.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '150ms',
    'X-Azure-Ref',
    '0ZkM4YAAAAAC/z/KrvOo0SoJnyKNBsC3bV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:05 GMT',
    'Content-Length',
    '0'
  ]);
