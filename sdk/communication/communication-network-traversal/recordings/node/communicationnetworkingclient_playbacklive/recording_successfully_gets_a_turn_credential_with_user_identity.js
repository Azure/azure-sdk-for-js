let nock = require('nock');

module.exports.hash = "b0198f9b672c48232760dd14fc927fc4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"sanitized"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'a25HvZNgI0WCiSTJZ+IZJQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '21ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zLGMYQAAAAB0g7bc7XfMTof55b2GDu0HV1NURURHRTA4MTUAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 11 Nov 2021 06:01:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/networktraversal/:issueRelayConfiguration', {"id":"sanitized"})
  .query(true)
  .reply(200, {"iceServers":[{"routeType":"any","urls":["turn.skype.com"],"username":"sanitized_username","credential":"sanitized_credential"},{"routeType":"nearest","urls":["turn.skype.com"],"username":"sanitized_username","credential":"sanitized_credential"}],"expiresOn":"2022-05-18T12:00:00.00+00:00"}, [
  'Content-Length',
  '560',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'eekJxw0ZrUuH54Cb0WYNcQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-02-22-preview1, 2021-06-21-preview, 2021-10-08-preview',
  'X-Processing-Time',
  '28ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zLGMYQAAAACwG3RtHgu9TrxLU7Vn7yrbV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 11 Nov 2021 06:01:48 GMT'
]);
