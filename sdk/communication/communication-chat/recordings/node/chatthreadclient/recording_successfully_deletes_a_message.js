let nock = require('nock');

module.exports.hash = "99dab1eee1f2015b9c781625ce8891cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0%40thread.v2/messages/1615253258990')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'm5Guq9b/yEC/KX7RKJA9cQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '211ms',
  'X-Azure-Ref',
  '0DM9GYAAAAADRtdbrgQivQ4nBIBPDHcq4V1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:40 GMT'
]);
