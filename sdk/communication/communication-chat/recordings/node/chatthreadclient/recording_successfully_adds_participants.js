let nock = require('nock');

module.exports.hash = "b6c112c2ef55854746cf861b378c4e03";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-be05-b0b7-3a3a0d0000aa"},"accessToken":{"token":"token","expiresOn":"2021-02-05T20:21:37.7694188+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Q4S+jtCRkUigReMYAWQ5uA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'c98d6339-4261-40c0-b0b3-1e4f5cc5e881',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '384ms',
  'X-Azure-Ref',
  '0UlccYAAAAADidsQ+yD0uQZ7kUnqijsEHWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Ad1799fdf7b8b4f5e96675f30c01296e1%40thread.v2/participants/:add', {"participants":[{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-be05-b0b7-3a3a0d0000aa"}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '39YsDBVNikejX1NhVCQ2EQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '876ms',
  'X-Azure-Ref',
  '0UlccYAAAAADi3hyyaWzPSaDbT+k8rKdqWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:39 GMT'
]);
