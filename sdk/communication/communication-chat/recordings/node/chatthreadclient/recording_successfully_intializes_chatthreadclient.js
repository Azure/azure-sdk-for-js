let nock = require('nock');

module.exports.hash = "628c4be719245416c8ba7170a19f6873";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c"},"accessToken":{"token":"token","expiresOn":"2021-08-25T01:19:19.6029421+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'zqlqbxGPlEqBHNtfHWYJ5A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'e7893bcf-04e8-4244-a963-cbbf33ebe683',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '40ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0F0kkYQAAAADHoqMQEFIqQ4dVp0nTMmU0UERYMzFFREdFMDIwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 24 Aug 2021 01:19:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-287d-02c3-593a0d000754"},"accessToken":{"token":"token","expiresOn":"2021-08-25T01:19:19.6999991+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'C/mBRTGEHkmACXCfBaeMBA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '546ea6f2-06f4-4f44-9316-55af060184ab',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '39ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0F0kkYQAAAAAR80w2zYm7QYN3RYX71UuoUERYMzFFREdFMDIwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 24 Aug 2021 01:19:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-287d-02c3-593a0d000754"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:6GWcNAPQG7ZctIOLMIvOZnlvHJo5gahbUshyKQfgCa41@thread.v2","topic":"test topic","createdOn":"2021-08-24T01:19:19Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3A6GWcNAPQG7ZctIOLMIvOZnlvHJo5gahbUshyKQfgCa41@thread.v2',
  'MS-CV',
  'kD69V5X+s0W9/lPlU5jutQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '943ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0F0kkYQAAAADypPPm/RT9RLrLbLh3NFnkUERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 24 Aug 2021 01:19:20 GMT'
]);
