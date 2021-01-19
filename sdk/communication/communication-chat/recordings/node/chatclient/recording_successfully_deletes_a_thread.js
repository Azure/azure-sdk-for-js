let nock = require('nock');

module.exports.hash = "1111e8e6bad22cbea6c2a2da200160bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '3jeXQ/otpUKp9hB0TEaK/w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '94ms',
  'X-Azure-Ref',
  '0u1X+XwAAAACU4nHUMjgBT6rvSLJryRQOV1NURURHRTA4MTkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:51 GMT'
]);
