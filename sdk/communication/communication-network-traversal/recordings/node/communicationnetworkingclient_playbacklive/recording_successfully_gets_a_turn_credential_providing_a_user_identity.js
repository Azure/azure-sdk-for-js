let nock = require('nock');

module.exports.hash = "1f61817d660cabf38eb319e982cea9f2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"sanitized"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ZA9Jz/mLjku7QC81bSTGTw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '61ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oVhWYQAAAAAh3y9eH/dET5X7unrOSKN7V1NURURHRTA4MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 01 Oct 2021 00:38:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/networktraversal/:issueRelayConfiguration', {"id":"sanitized"})
  .query(true)
  .reply(200, {"expiresOn":"2022-05-18T12:00:00.00+00:00","iceServers":[{"urls":["turn.skype.com"],"username":"sanitized_username","credential":"sanitized_credential"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '0PWvHh7hPEakwkbV1v9dtA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-02-22-preview1, 2021-06-21-preview',
  'X-Processing-Time',
  '109ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oVhWYQAAAADxJ1Hg2vtST6453gmFYiIqV1NURURHRTA4MTgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 01 Oct 2021 00:38:57 GMT'
]);
