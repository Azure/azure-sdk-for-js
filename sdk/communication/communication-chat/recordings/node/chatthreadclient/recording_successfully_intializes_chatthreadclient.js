let nock = require('nock');

module.exports.hash = "dd036b6eec754710de54033ddef4fddb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8"},"accessToken":{"token":"token","expiresOn":"2021-02-18T01:22:17.485015+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'dL538V+X4UibCnTXcBmeUg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '8d2db222-ce8c-430a-a992-3715a0313ed0',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '31ms',
  'X-Azure-Ref',
  '0ym8sYAAAAAD2HuA+kE4ZQpJ+EHp/yqoGU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-5349-e3c7-593a0d0002da"},"accessToken":{"token":"token","expiresOn":"2021-02-18T01:22:17.5931622+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'GE+Z7eJaUkO24qmQjJz2pA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '87cec778-77b2-4ed8-9e32-65930783764b',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '33ms',
  'X-Azure-Ref',
  '0ym8sYAAAAADeXuVXHVeSSpPwO9N8V4J5U0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-5349-e3c7-593a0d0002da"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:d0faaa3907264686b859c3b0cca68dcb@thread.v2","topic":"test topic","createdOn":"2021-02-17T01:22:18Z","createdBy":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://mattstestresource.communication.azure.com/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb@thread.v2',
  'MS-CV',
  'EaAG0oltxkeqpG2Tbm5mVQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '542ms',
  'X-Azure-Ref',
  '0ym8sYAAAAABJAOLwFOQeT62+FkQaJyWUU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:18 GMT'
]);
