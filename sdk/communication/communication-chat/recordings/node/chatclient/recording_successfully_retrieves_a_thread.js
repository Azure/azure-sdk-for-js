let nock = require('nock');

module.exports.hash = "53fcb8011d3ec2a23568f7adea0f9bcf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:069d3bbafc4840df836c5fe8e232a17f@thread.v2","topic":"test topic","createdOn":"2020-09-15T01:15:30Z","createdBy":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e","members":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-62cc-6a0b-343a0d00003b","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'v5/ksnGKT0KMGLIVRfXWqg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '74ms',
  'X-Azure-Ref',
  '0shVgXwAAAACR3pxSiyK0RpqSNdkp9QmrV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:30 GMT'
]);
