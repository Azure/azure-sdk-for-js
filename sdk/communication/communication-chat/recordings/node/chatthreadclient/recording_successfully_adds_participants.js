let nock = require('nock');

module.exports.hash = "b6c112c2ef55854746cf861b378c4e03";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-5eb4-e3c7-593a0d0002dd"},"accessToken":{"token":"token","expiresOn":"2021-02-18T01:22:20.5152198+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'xUi8Pk78cE+maaLQI/iGTg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '3b32132d-9a0b-4ac4-b026-7d8c6e1ba32d',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '33ms',
  'X-Azure-Ref',
  '0zW8sYAAAAACxsPELJ7qTQpfd0uhNPCx4U0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2/participants/:add', {"participants":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-5eb4-e3c7-593a0d0002dd"}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'doyB5faX1keHocVg5jotmw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '296ms',
  'X-Azure-Ref',
  '0zW8sYAAAAADgR0BZV8bwSJAVC9GqFhBvU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:21 GMT'
]);
