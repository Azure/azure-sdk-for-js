let nock = require('nock');

module.exports.hash = "4fb6d0b95a8010d710485597b5aa5ff6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/networkTraversal/:issueRelayConfiguration', {})
  .query(true)
  .reply(200, {"iceServers":[{"routeType":"any","urls":["turn.skype.com"],"username":"sanitized_username","credential":"sanitized_credential"},{"routeType":"nearest","urls":["turn.skype.com"],"username":"sanitized_username","credential":"sanitized_credential"}],"expiresOn":"2022-05-18T12:00:00.00+00:00"}, [
  'Content-Length',
  '545',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'jhzXJpAoo0W0MeftU39m2w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-02-22-preview1, 2021-06-21-preview, 2021-10-08-preview, 2022-03-01-preview',
  'X-Processing-Time',
  '110ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0cX4qYgAAAACGDqHBq/cSSqEMZpMug4epV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 10 Mar 2022 22:40:48 GMT'
]);
