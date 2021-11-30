let nock = require('nock');

module.exports.hash = "532588d7bc35f02e085fe3d50b331b6f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-c951-8e0e-454822000d93"},"accessToken":{"token":"token","expiresOn":"2021-09-04T19:27:15.9600921+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '+VsasNMuRkaU4roSFED9YA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '626eb2de-baee-4d5b-aa45-813923620f9e',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '183ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0E3cyYQAAAAD/lv48v3FUQLaVVhyV/uTsUERYMzFFREdFMDIwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 03 Sep 2021 19:27:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-ca58-8e0e-454822000d94"},"accessToken":{"token":"token","expiresOn":"2021-09-04T19:27:16.2172875+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '0Ygh+FDaS0OiMTmvhXfycQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'b0687b5e-222e-4cb7-9c48-c7e4a525ab92',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '178ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FHcyYQAAAACCNOvwr/o6R4TJyXVEUH/EUERYMzFFREdFMDIwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 03 Sep 2021 19:27:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-c951-8e0e-454822000d93"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-ca58-8e0e-454822000d94"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:jC1S7FSI-7F0_JKoOXovspHWhvcWzLCBZ0kgoN4YnVM1@thread.v2","topic":"test topic","createdOn":"2021-09-03T19:27:16Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-c951-8e0e-454822000d93","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-4d02-c951-8e0e-454822000d93"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3AjC1S7FSI-7F0_JKoOXovspHWhvcWzLCBZ0kgoN4YnVM1@thread.v2',
  'MS-CV',
  'ntQSXIJbtE2c6ufHN6Agyw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6, 2021-09-07',
  'X-Processing-Time',
  '467ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FHcyYQAAAADvoqKvXmo9T7IzE1KH1slAUERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 03 Sep 2021 19:27:16 GMT'
]);
