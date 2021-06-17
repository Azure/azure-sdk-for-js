let nock = require('nock');

module.exports.hash = "c58a8bd2d6a25564b38d6c2e3574d185";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-c874-2a7a-5b3a0d0005f3"},"accessToken":{"token":"token","expiresOn":"2021-05-12T18:24:14.0747804+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Clh8b1LiokOV7fOiM78GRg.0',
  'x-ms-client-request-id',
  'ababe5e9-8ad2-4259-a7d0-5bdd1ed1c09e',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '457ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0z8uaYAAAAACuXXPWqSrZTLQKflOb+Nn9V1NURURHRTA4MTMANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-c9e6-2a7a-5b3a0d0005f4"},"accessToken":{"token":"token","expiresOn":"2021-05-12T18:24:15.4525515+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'GIik/a/LJEK1WyxNnz6kDQ.0',
  'x-ms-client-request-id',
  '38a4084e-5c4e-41be-8f42-9a2e1eeaeb70',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '111ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00MuaYAAAAADiarmY5bBUTL938buslC9RV1NURURHRTA4MTMANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-c874-2a7a-5b3a0d0005f3"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-c9e6-2a7a-5b3a0d0005f4"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:ccmd51185skzyzMBCnT8VLrapOfYFlFnAa0F1kztzbs1@thread.v2","topic":"test topic","createdOn":"2021-05-11T18:24:17Z","createdByCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-c874-2a7a-5b3a0d0005f3","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-c874-2a7a-5b3a0d0005f3"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-sdktester-e2e.dev.communication.azure.net/chat/threads/19%3Accmd51185skzyzMBCnT8VLrapOfYFlFnAa0F1kztzbs1@thread.v2',
  'MS-CV',
  'grA+ljHdmkO4MqywxMQyRg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '929ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00cuaYAAAAACi9PG3F/cMSKg2oxKRWqQvV1NURURHRTA4MTQANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:17 GMT'
]);
