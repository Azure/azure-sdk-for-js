let nock = require('nock');

module.exports.hash = "dbe5b264c11dbef1d4f15779defd44e9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  '+gsZgiLhfUKis3Rqgrgkkg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '116ms',
  'X-Azure-Ref',
  '0sxVgXwAAAAAbE4iW4VC8SbRG3BlrXKoSV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:31 GMT',
  'Content-Length',
  '0'
]);
