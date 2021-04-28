let nock = require('nock');

module.exports.hash = "1b0bf75b63d52b98da724abe34796531";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A1ZY8nA8vitSqO7AF7Y0lUtN1vEmJjCQSZsC8e7k_dpE1%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '4JGOy8Pl90enEMHvZMAq7g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '303ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00bmAYAAAAAC7KzgivQPuQIx6Gc8ot7qRV1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:33 GMT'
]);
