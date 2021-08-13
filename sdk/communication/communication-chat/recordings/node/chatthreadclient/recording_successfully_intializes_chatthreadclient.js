let nock = require('nock');

module.exports.hash = "628c4be719245416c8ba7170a19f6873";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826"},"accessToken":{"token":"token","expiresOn":"2021-06-15T21:15:11.6627392+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '9iiQ2TgLGk6J0iWF5k54ag.0',
  'x-ms-client-request-id',
  '85dcfae4-5b7b-46f2-9067-000edfa734cd',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '166ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04MbHYAAAAAD+DyxeKk+HTq9OeaPd3N+UUERYMzFFREdFMDIwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-820c-7679-5b3a0d000827"},"accessToken":{"token":"token","expiresOn":"2021-06-15T21:15:11.8626066+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '34iLh6L7EkuVg/olxHn+Dg.0',
  'x-ms-client-request-id',
  'b0e33386-ff54-44d9-90ec-97faeb84b839',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '162ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04MbHYAAAAABbIm5PJmpvTI+XFNecp4zyUERYMzFFREdFMDIwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-820c-7679-5b3a0d000827"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:oXeDm2YWQ-rjbfG0ilcCtPs5GBwZEeVt5ssFsYc0Ehc1@thread.v2","topic":"test topic","createdOn":"2021-06-14T21:15:13Z","createdByCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-sdktester-e2e.dev.communication.azure.net/chat/threads/19%3AoXeDm2YWQ-rjbfG0ilcCtPs5GBwZEeVt5ssFsYc0Ehc1@thread.v2',
  'MS-CV',
  'Jwp+ONjCskKl4P/Y3RMZqA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '1797ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04MbHYAAAAADOWtc18Nn6RJcudXb+q203UERYMzFFREdFMDIxNgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:14 GMT'
]);
