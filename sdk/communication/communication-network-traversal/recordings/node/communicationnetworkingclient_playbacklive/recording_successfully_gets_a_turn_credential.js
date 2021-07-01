let nock = require('nock');

module.exports.hash = "33a3ba3209a0f8f3e2046d36339ad94b";

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
  'YeQ9pEJhn0CbcztpchGytg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '22ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+MLCYAAAAABHc57zG4+RRL2Hp8S/QbC+V1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 11 Jun 2021 01:57:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/turn/sanitized/:issueCredentials')
  .query(true)
  .reply(200, {"expiresOn":"2022-05-18T12:00:00.00+00:00","turnServers":[{"urls":["turn.skype.com"],"username":"sanitized_username","credential":"sanitized_credential"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'IGqUYU97lEGk5OCamoo9lA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-02-22-preview1',
  'X-Processing-Time',
  '193ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+MLCYAAAAAB5LdufEO3HR7XuGkkJisDUV1NURURHRTA4MTMAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 11 Jun 2021 01:57:11 GMT'
]);
