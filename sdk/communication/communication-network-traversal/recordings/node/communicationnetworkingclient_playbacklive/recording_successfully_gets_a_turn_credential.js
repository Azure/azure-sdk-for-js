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
  'ttmkxqEKEEuxX/lJoh19og.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '89ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0aT5VYQAAAACUsegyM6EPTpCSWK3GYZbzV1NURURHRTA4MjEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 30 Sep 2021 04:34:49 GMT'
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
  'xvXGTZhZKUeMoUqzQyCjtQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-02-22-preview1, 2021-06-21-preview',
  'X-Processing-Time',
  '91ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0aT5VYQAAAAC4mql97pGySIev9LiLopp4V1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 30 Sep 2021 04:34:49 GMT'
]);
