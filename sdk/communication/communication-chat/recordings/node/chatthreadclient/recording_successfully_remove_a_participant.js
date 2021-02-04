let nock = require('nock');

module.exports.hash = "17a09e59e6cb1c9e41aa571d96b978d0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Ad1799fdf7b8b4f5e96675f30c01296e1%40thread.v2/participants/8%3Aacs%3A46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ae51-b0b7-3a3a0d0000a9')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'vxfBqcOThkWv5HQ4xvW0kA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '484ms',
  'X-Azure-Ref',
  '0VFccYAAAAAB3VGUMcYK8TZtGdbt2qx3IWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:40 GMT'
]);
