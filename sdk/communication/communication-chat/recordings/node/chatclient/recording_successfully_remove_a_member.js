let nock = require('nock');

module.exports.hash = "4d337cb69527a689c6671b70c86910a7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2/members/8%3Aacs%3A8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-62cc-6a0b-343a0d00003b')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'TTtZ8Kdwm0e+VrtUDntjMw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '210ms',
  'X-Azure-Ref',
  '0tRVgXwAAAAAjjswrztmIQ7XDmToPbDUZV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:33 GMT'
]);
