let nock = require('nock');

module.exports.hash = "aeae07c7c5d15582403b68ecbf7d39d7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77"},"accessToken":{"token":"token","expiresOn":"2021-03-07T01:14:21.5339305+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'WoBn9xOFCESOkuil/ZnR+A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'f5790626-9eb7-4f80-a938-fe779bfa4ffa',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '269ms',
  'X-Azure-Ref',
  '0btdCYAAAAACuEBPeSqtqQbThlhfTeSKSWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2bfd-99c6-593a0d006b78"},"accessToken":{"token":"token","expiresOn":"2021-03-07T01:14:21.6090599+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'JRn69ldUj0aYlyqH8M4Ksg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'ae4aba38-49fe-4a6c-90d1-24cd5c313892',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '30ms',
  'X-Azure-Ref',
  '0btdCYAAAAACCGqSH4Hi9RInd/mePs1lrWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2bfd-99c6-593a0d006b78"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:xJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41@thread.v2","topic":"test topic","createdOn":"2021-03-06T01:14:22Z","createdByCommunicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://kimtestacs.communication.azure.com/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41@thread.v2',
  'MS-CV',
  'r/kt7T1U/UatnvJ6sZlkkw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '456ms',
  'X-Azure-Ref',
  '0btdCYAAAAAChK0qbow1mQIqvoBcP52+DWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:22 GMT'
]);
