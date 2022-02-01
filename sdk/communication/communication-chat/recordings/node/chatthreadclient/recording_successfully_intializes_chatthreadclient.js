let nock = require('nock');

module.exports.hash = "b464c066789191fdab123a1355bca3a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"},"accessToken":{"token":"token","expiresOn":"2022-02-02T23:10:22.6844809+00:00"}}, [
  'Content-Length',
  '920',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'feNXC+lU70iiXJB/zeNSWA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '0ac5fb22-f464-475c-89d0-d5e41182f4ea',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '47ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03r35YQAAAABFTfVfdHzIQJ37aacOPStOUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-5219-99c6-593a0d00e2ac"},"accessToken":{"token":"token","expiresOn":"2022-02-02T23:10:22.7709606+00:00"}}, [
  'Content-Length',
  '920',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'wNG4crJ++kSn55xxy0LOcA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '7775227b-6fdf-4142-b9b4-16a946352ce3',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '45ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03r35YQAAAACOD9hvPip6T6iWpLo6zoDHUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-5219-99c6-593a0d00e2ac"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:R3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1@thread.v2","topic":"test topic","createdOn":"2022-02-01T23:10:22Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3AR3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1@thread.v2',
  'MS-CV',
  'HgAo3tGLS0eyB3knbjLrWA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '392ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03r35YQAAAAA2ht+Zq8SiQ4JoONtJ5HhzUERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:22 GMT'
]);
