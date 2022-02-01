let nock = require('nock');

module.exports.hash = "b464c066789191fdab123a1355bca3a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"},"accessToken":{"token":"token","expiresOn":"2022-02-02T18:57:34.005435+00:00"}}, [
  'Content-Length',
  '919',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'CgjVcCZ0oU65YUTPl0h68A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'aef2d081-c13a-40e6-86fc-a84dff11bf36',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '43ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0nYL5YQAAAABELdn0Y75BT5gdDdXdGXKRUERYMzFFREdFMDIxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd70-2c8a-08482200cb98"},"accessToken":{"token":"token","expiresOn":"2022-02-02T18:57:34.090842+00:00"}}, [
  'Content-Length',
  '919',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'KYFW3bBTRUieV6CJKFaXqg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'bd94c3e7-1457-479a-a621-8e9d6f442485',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '50ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0noL5YQAAAAC9qbaiIc4uSra8jsAwfEXgUERYMzFFREdFMDIxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd70-2c8a-08482200cb98"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:gvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2","topic":"test topic","createdOn":"2022-02-01T18:57:34Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-5687-dd1f-2c8a-08482200cb97"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3AgvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1@thread.v2',
  'MS-CV',
  'B4QdcI7HhkSTElae4Q7NLw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '478ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0noL5YQAAAAC9MAgF8z4eTaJ9dCqCr4DhUERYMzFFREdFMDIxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:33 GMT'
]);
