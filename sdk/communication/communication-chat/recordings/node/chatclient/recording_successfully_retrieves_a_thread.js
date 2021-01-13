let nock = require('nock');

module.exports.hash = "53fcb8011d3ec2a23568f7adea0f9bcf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:883ce5bf892c47d6a7da73da6df31c7e@thread.v2","topic":"test topic","createdOn":"2021-01-13T02:06:47Z","createdBy":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Doum8VESeUO3ZiYQlcXvJw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '69ms',
  'X-Azure-Ref',
  '0t1X+XwAAAADC3uM+4lZ8T7GrGDmxZwiKV1NURURHRTA4MTkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:47 GMT'
]);
