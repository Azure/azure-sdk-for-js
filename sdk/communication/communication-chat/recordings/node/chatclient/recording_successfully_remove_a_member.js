let nock = require('nock');

module.exports.hash = "3c2d74fce1b4b9ed192351f1b149fe3d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2/members/8%3Aacs%3Aec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-99e7-6032-3b3a0d0048e1')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '5EEV/yyQiUOzvnaBAZYUEw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2',
  'X-Processing-Time',
  '197ms',
  'X-Azure-Ref',
  '0fykPYAAAAACfHA97HrnsTpvZ1aUYq0O/WVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:39 GMT'
]);
