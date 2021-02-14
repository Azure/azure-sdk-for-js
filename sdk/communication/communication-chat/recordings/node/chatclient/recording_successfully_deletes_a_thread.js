let nock = require('nock');

module.exports.hash = "1111e8e6bad22cbea6c2a2da200160bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'ICj/BkLgJESsFZjFqQsmmg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '169ms',
  'X-Azure-Ref',
  '0tRVgXwAAAADbpSPnq2O9Qpl3/OJjgCznV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:33 GMT'
]);
