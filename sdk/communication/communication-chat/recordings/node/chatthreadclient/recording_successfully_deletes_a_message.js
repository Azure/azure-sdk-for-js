let nock = require('nock');

module.exports.hash = "99dab1eee1f2015b9c781625ce8891cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A9cXNBEh5NlRdVyRs5tIn9ZnKCVgwfFsmRRbW6Mn-JNM1%40thread.v2/messages/1616527059857')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'Xv8U+O+Md0eIi4RXiafXIQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07',
  'X-Processing-Time',
  '294ms',
  'X-Azure-Ref',
  '01D5aYAAAAAAT6Na6b0c1QpPwYktVseLmV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:40 GMT'
]);
