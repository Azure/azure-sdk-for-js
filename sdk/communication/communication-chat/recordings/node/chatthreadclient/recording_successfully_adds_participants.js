let nock = require('nock');

module.exports.hash = "1a1f067ce4b17032ea2a8259d4e72e62";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-6d9e-54b7-a43a0d002bd6"},"accessToken":{"token":"token","expiresOn":"2021-03-10T01:27:39.8265444+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'haXdSZhgvUu5qEVPclnxHg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '095b4e01-5411-4b7a-b8f5-080ad9f8612a',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '220ms',
  'X-Azure-Ref',
  '0DM9GYAAAAABVvdAX573SQqfX/xyW7ToRV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0%40thread.v2/participants/:add', {"participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-6d9e-54b7-a43a0d002bd6"}}}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'IHKh/PBvPUq0ge4hDe9PYg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '309ms',
  'X-Azure-Ref',
  '0DM9GYAAAAAALFbmURx2TTKSPjGjVKCXFV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:41 GMT'
]);
