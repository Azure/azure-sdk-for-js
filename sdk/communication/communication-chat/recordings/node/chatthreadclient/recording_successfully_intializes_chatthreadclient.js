let nock = require('nock');

module.exports.hash = "aeae07c7c5d15582403b68ecbf7d39d7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4"},"accessToken":{"token":"token","expiresOn":"2021-03-10T01:27:35.7976508+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'q4K3SO3ff0KsNaTwz7EY+w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '87399239-fad7-4ee1-9353-1693d6e943a6',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '504ms',
  'X-Azure-Ref',
  '0CM9GYAAAAADT9RbEJrmbQoMKi/8c4a8FV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5f01-63b2-a43a0d002ec6"},"accessToken":{"token":"token","expiresOn":"2021-03-10T01:27:36.3604468+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '81D0FI43OU2Oc3ubDOz6aQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '44d59769-3ec2-4b92-8f35-0d29ebdae272',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '495ms',
  'X-Azure-Ref',
  '0CM9GYAAAAAD4pagaLuLHQoLJOXkzMQ0xV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5f01-63b2-a43a0d002ec6"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:95b53ec9905344ae89865d3a90726fb0@thread.v2","topic":"test topic","createdOn":"2021-03-09T01:27:37Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0@thread.v2',
  'MS-CV',
  'Deh01VHtuEKYTD2iGK7U1g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '582ms',
  'X-Azure-Ref',
  '0Cc9GYAAAAADnPE92dYslS40CvVs0+BjEV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:37 GMT'
]);
