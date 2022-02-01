let nock = require('nock');

module.exports.hash = "577a7ed1929861e78f8f806b6c48c6aa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-4c90-99c6-593a0d00e2a9"},"accessToken":{"token":"token","expiresOn":"2022-02-02T23:10:21.3582163+00:00"}}, [
  'Content-Length',
  '920',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'CX8d4VvXr0i7l8wbyBvpuQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '4c162fd3-36a8-4256-b702-efa718b26551',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '51ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03b35YQAAAAAHPCx5zDYZTIk7/uteBR8FUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-4cfe-99c6-593a0d00e2aa"},"accessToken":{"token":"token","expiresOn":"2022-02-02T23:10:21.4595636+00:00"}}, [
  'Content-Length',
  '920',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Cx9W7krgk0ulaS/rHrFPyw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '47b95af0-2f51-4df0-979e-06350a9178a7',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '41ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03b35YQAAAAAXkwluk/A+R5kX8tI+AZz3UERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-4c90-99c6-593a0d00e2a9"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-4cfe-99c6-593a0d00e2aa"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:bj6i-OBgaSVOJAjHx8MrVMyZ3uGIaCZPnrNf9EYYzxM1@thread.v2","topic":"test topic","createdOn":"2022-02-01T23:10:21Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-4c90-99c6-593a0d00e2a9","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-4c90-99c6-593a0d00e2a9"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3Abj6i-OBgaSVOJAjHx8MrVMyZ3uGIaCZPnrNf9EYYzxM1@thread.v2',
  'MS-CV',
  'hS4ZYfPXS0GwD6WPsEVyKw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '530ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03b35YQAAAAA5xEcUKSeQSZ/ZDbdHstTXUERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:21 GMT'
]);
