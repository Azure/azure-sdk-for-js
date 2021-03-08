let nock = require('nock');

module.exports.hash = "cf8b468d221de05cd3880e4f48eec43c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A0ec6d22627d54b5782f1d45b601c494a%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'NWB2VEsjFE6icjpCL2h8ig.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '256ms',
  'X-Azure-Ref',
  '0I4dGYAAAAAC+oXlWtoY6TodfUy2GZNbEV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:51 GMT'
]);
