let nock = require('nock');

module.exports.hash = "a7f6f1f562f12da837c491b0a0ff3124";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'YoNaeCoS7kCsmoqpHK1bQg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '87810f6a-5f77-4903-b20b-d7e5c277842e',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '64ms',
  'X-Azure-Ref',
  '0sRVgXwAAAAA5XDjE3WoAQ5NVQGRHrWdXV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e","token":"token","expiresOn":"2020-09-16T01:15:28.6299591+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'kdd5J31KeEenngGz2zNfCg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '55e21de9-c86d-4299-9c58-30d271d9c139',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '48ms',
  'X-Azure-Ref',
  '0sRVgXwAAAADvqfd5347bSb881wB6GUr7V1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-62cc-6a0b-343a0d00003b"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'uxfODJBOeUCE1Ub4BARqbA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '8b8d167d-5634-4469-9b40-7fe01525fd2a',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '78ms',
  'X-Azure-Ref',
  '0sRVgXwAAAADoooqJg2qZRp6CBbpI+JV3V1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-62cc-6a0b-343a0d00003b/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-62cc-6a0b-343a0d00003b","token":"token","expiresOn":"2020-09-16T01:15:29.0102475+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'IATIeGpE40u5O/OtTUjDcg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'e31e3159-6d48-45a0-932d-595c018eb4a2',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '81ms',
  'X-Azure-Ref',
  '0sRVgXwAAAADtcCQS8r3VQJ130ehKXCR2V1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","members":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-62cc-6a0b-343a0d00003b"}]})
  .query(true)
  .reply(207, {"multipleStatus":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e","statusCode":201,"type":"ThreadMember"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-62cc-6a0b-343a0d00003b","statusCode":201,"type":"ThreadMember"},{"id":"19:069d3bbafc4840df836c5fe8e232a17f@thread.v2","statusCode":201,"type":"Thread"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://23.100.36.56/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f@thread.v2',
  'MS-CV',
  'uR7btLOINk+DBjxj067hIg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '520ms',
  'X-Azure-Ref',
  '0shVgXwAAAABufu0hTVnZQpRpx+MX7x4JV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:29 GMT'
]);
