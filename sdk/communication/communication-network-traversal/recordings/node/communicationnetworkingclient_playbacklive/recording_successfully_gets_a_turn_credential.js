let nock = require('nock');

module.exports.hash = "79bce32afb53073cd137b3551cf7e47a";

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
  '1qjCDBP1nkeSKHMI5uCSgw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '66ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0sFykYAAAAADiRjjXVrxKSZdLB8WK7+PCV1NURURHRTA4MTMAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 19 May 2021 00:32:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/turn/sanitized/:issueCredentials')
  .query(true)
  .reply(200, {"expiresOn":"2022-05-18T12:00:00.00+00:00","turnServers":[{"urls":["turn.skype.com"]},"username":"sanitized_username","credential":"sanitized_credential"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'oTRyFixerkOOtDB63KxOKQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-02-22-preview1',
  'X-Processing-Time',
  '179ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0sVykYAAAAAAJrU13VIkFQrkE2Rjl07e1V1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 19 May 2021 00:32:49 GMT'
]);
