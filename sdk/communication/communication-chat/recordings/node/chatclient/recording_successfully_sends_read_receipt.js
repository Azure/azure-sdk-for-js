let nock = require('nock');

module.exports.hash = "7bfeb93c91b865922918888b4e2a5ba3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2/readreceipts', {"chatMessageId":"1600132531629"})
  .query(true)
  .reply(201, "", [
  'MS-CV',
  'lvrG4RtFV0ugSXnDA9cAIA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '153ms',
  'X-Azure-Ref',
  '0sxVgXwAAAACKAzlLpSbQQb0oZ8zdLbZVV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:32 GMT',
  'Content-Length',
  '0'
]);
