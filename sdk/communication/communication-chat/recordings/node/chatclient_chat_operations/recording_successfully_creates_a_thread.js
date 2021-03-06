let nock = require('nock');

module.exports.hash = "60c461ca49c65b9ceccb7989d6da9037";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2419-99c6-593a0d006b75"},"accessToken":{"token":"token","expiresOn":"2021-03-07T01:14:19.8298619+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'yf++B7u9Z0C+MYKftO9RoA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '693d9f61-0048-4105-b1d8-697da75feef4',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '279ms',
  'X-Azure-Ref',
  '0bNdCYAAAAADgcJbQfx7WRqAQl0Ra0qsvWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2567-99c6-593a0d006b76"},"accessToken":{"token":"token","expiresOn":"2021-03-07T01:14:20.1582261+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '67gkjBn8q0+WHLpjC8DVXQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '129b5ead-4112-456d-9513-96c5ea819263',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '264ms',
  'X-Azure-Ref',
  '0bNdCYAAAAAC238y51djwRaTDNHrEQr0uWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2419-99c6-593a0d006b75"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2567-99c6-593a0d006b76"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:NwlgB-5YRrqAXkbD3xoOMwUpif42PMt4qlUiJALerCM1@thread.v2","topic":"test topic","createdOn":"2021-03-06T01:14:21Z","createdByCommunicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2419-99c6-593a0d006b75","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2419-99c6-593a0d006b75"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://kimtestacs.communication.azure.com/chat/threads/19%3ANwlgB-5YRrqAXkbD3xoOMwUpif42PMt4qlUiJALerCM1@thread.v2',
  'MS-CV',
  'UHIeNbiBL0SP/2za7vZ/DQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '691ms',
  'X-Azure-Ref',
  '0bddCYAAAAADZYO6gqaaeQ4bGM0Td0shfWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:21 GMT'
]);
