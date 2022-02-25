let nock = require('nock');

module.exports.hash = "aa53048fc55c364530c2e24f80464c3c";

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
  '5Gos9UsVd0iYUSM+Qh30kg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01, 2022-06-01',
  'X-Processing-Time',
  '65ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0dtX6YQAAAADNsh3CO1rFSZhOxk5rQaSqV1NURURHRTA4MTkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 02 Feb 2022 19:03:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/networkTraversal/:issueRelayConfiguration', {"id":"sanitized","routeType":"nearest"})
  .query(true)
  .reply(200, {"iceServers":[{"routeType":"nearest","urls":["turn.skype.com"],"username":"sanitized_username","credential":"sanitized_credential"}],"expiresOn":"2022-05-18T12:00:00.00+00:00"}, [
  'Content-Length',
  '305',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'dpLXlXzrOEatLr166zpJFQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-02-22-preview1, 2021-06-21-preview, 2021-10-08-preview, 2022-02-01',
  'X-Processing-Time',
  '148ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0dtX6YQAAAABhl9Xs0gB2R6Bym1dWtJgEV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 02 Feb 2022 19:03:18 GMT'
]);
