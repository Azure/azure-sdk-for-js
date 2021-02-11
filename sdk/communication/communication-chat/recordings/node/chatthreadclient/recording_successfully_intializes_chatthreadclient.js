let nock = require('nock');

module.exports.hash = "dd036b6eec754710de54033ddef4fddb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ace2-b0b7-3a3a0d0000a8"},"accessToken":{"token":"token","expiresOn":"2021-02-05T20:21:33.3609228+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'xOc1BxB7aUiNnB+dWUyxow.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'c2111186-9950-4c11-a55f-b97fc4d219de',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '324ms',
  'X-Azure-Ref',
  '0TlccYAAAAADAXO0VXsdGQ5oZfF05hHsWWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ae51-b0b7-3a3a0d0000a9"},"accessToken":{"token":"token","expiresOn":"2021-02-05T20:21:33.497302+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'hLteUoBs50qTsreLtPflOQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '85c16ab5-f8ce-4eaf-8d20-b6063fef9cae',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '93ms',
  'X-Azure-Ref',
  '0TlccYAAAAADiUDjkPp98Q5d7M+IqFFUNWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ace2-b0b7-3a3a0d0000a8"},{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ae51-b0b7-3a3a0d0000a9"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:d1799fdf7b8b4f5e96675f30c01296e1@thread.v2","topic":"test topic","createdOn":"2021-02-04T20:21:34Z","createdBy":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ace2-b0b7-3a3a0d0000a8"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-sdktester-e2e.int.communication.azure.net/chat/threads/19%3Ad1799fdf7b8b4f5e96675f30c01296e1@thread.v2',
  'MS-CV',
  'nfBD7Lr1G0SCAMT8UsyEQw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '968ms',
  'X-Azure-Ref',
  '0TlccYAAAAACDbcJQ+StkQ7BL6tBUoMf+WVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:35 GMT'
]);
