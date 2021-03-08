let nock = require('nock');

module.exports.hash = "99dab1eee1f2015b9c781625ce8891cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41%40thread.v2/messages/1614993263622')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'QHJQl60UEkqlLmgg69xObw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '187ms',
  'X-Azure-Ref',
  '0cNdCYAAAAABVjixNsn0DQLVBS1rDN6qYWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:24 GMT'
]);
