let nock = require('nock');

module.exports.hash = "c0d831b2d604a2a670f31a94b0681619";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/networkTraversal/:issueRelayConfiguration', {"routeType":"nearest"})
  .query(true)
  .reply(200, {"iceServers":[{"routeType":"nearest","urls":["turn.skype.com"],"username":"sanitized_username","credential":"sanitized_credential"}],"expiresOn":"2022-05-18T12:00:00.00+00:00"}, [
  'Content-Length',
  '305',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '73qywI/ZFkuHXtP9hvqxdQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-02-22-preview1, 2021-06-21-preview, 2021-10-08-preview, 2022-03-01-preview',
  'X-Processing-Time',
  '22ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0cX4qYgAAAAAV0OKdUG4JRK27Csa8HwIHV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 10 Mar 2022 22:40:49 GMT'
]);
