let nock = require('nock');

module.exports.hash = "ab5063462995c36e470af2aa97a30467";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/networktraversal/:issueRelayConfiguration', {})
  .query(true)
  .reply(200, {"expiresOn":"2022-05-18T12:00:00.00+00:00","iceServers":[{"urls":["turn.skype.com"],"username":"sanitized_username","credential":"sanitized_credential"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'gBpbxBx7skqX/eSQ9Q4Hvw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-02-22-preview1, 2021-06-21-preview',
  'X-Processing-Time',
  '40ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oVhWYQAAAAB3nMwaR3ceR7FK2XyRBwNsV1NURURHRTA4MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 01 Oct 2021 00:38:57 GMT'
]);
