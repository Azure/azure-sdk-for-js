let nock = require('nock');

module.exports.hash = "628c4be719245416c8ba7170a19f6873";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-cec5-8e0e-454822000d95"},"accessToken":{"token":"token","expiresOn":"2021-09-04T19:27:17.3688903+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'QA2eM+0pcEK8etJZYucycA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '49400690-f678-42c8-8141-2c1e95af7180',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '197ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FXcyYQAAAABhxgbqJAn0Sru0WdtnJxSAUERYMzFFREdFMDIwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 03 Sep 2021 19:27:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-cfd1-8e0e-454822000d96"},"accessToken":{"token":"token","expiresOn":"2021-09-04T19:27:17.6214649+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '0VxYqju2lUufw4PDs0umQg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '104a0413-7d03-4e27-aa16-83c34f3aaea3',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '187ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FXcyYQAAAAA0RJ2HY+LlSbzz7zLRNnb2UERYMzFFREdFMDIwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 03 Sep 2021 19:27:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-cec5-8e0e-454822000d95"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-cfd1-8e0e-454822000d96"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:GJhzTT5V5GxxOF-a6Z84_zITnb7xu-IRf-8431aqf8w1@thread.v2","topic":"test topic","createdOn":"2021-09-03T19:27:17Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-cec5-8e0e-454822000d95","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-cec5-8e0e-454822000d95"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3AGJhzTT5V5GxxOF-a6Z84_zITnb7xu-IRf-8431aqf8w1@thread.v2',
  'MS-CV',
  'Iq/1UcehnE+ughCFDbH2Kg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6, 2021-09-07',
  'X-Processing-Time',
  '365ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FXcyYQAAAAB5kCR3MKXJSp9MWmO0B7j8UERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 03 Sep 2021 19:27:17 GMT'
]);
