let nock = require('nock');

module.exports.hash = "3c2d74fce1b4b9ed192351f1b149fe3d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2/members/8%3Aacs%3Aa6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7305-6032-3b3a0d0096dd')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'vPQ16geeNEa8UYaiak9izQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2',
  'X-Processing-Time',
  '241ms',
  'X-Azure-Ref',
  '0wMERYAAAAACQMj7HapQ5Qbsj5MNiFMtQWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:48 GMT'
]);
