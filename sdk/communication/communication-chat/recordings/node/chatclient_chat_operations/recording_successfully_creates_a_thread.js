let nock = require('nock');

module.exports.hash = "532588d7bc35f02e085fe3d50b331b6f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-787b-7679-5b3a0d000824"},"accessToken":{"token":"token","expiresOn":"2021-06-15T21:15:09.4156339+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '4lsn//dUfEmEOQxg48JdVw.0',
  'x-ms-client-request-id',
  'f6bbc4ca-b87a-485e-aef9-643b3c399767',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '428ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03cbHYAAAAAB3+VFAuJH2QZwyeguJQE7SUERYMzFFREdFMDIwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-79ef-7679-5b3a0d000825"},"accessToken":{"token":"token","expiresOn":"2021-06-15T21:15:09.8692238+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '5j/+ZO0E4EWEB2rnLRd6nw.0',
  'x-ms-client-request-id',
  '15bbf9b4-0707-4ef3-8698-209db95e0e7b',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '250ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03sbHYAAAAADaaPM/8KnDRq4iAm7YwQQeUERYMzFFREdFMDIwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-787b-7679-5b3a0d000824"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-79ef-7679-5b3a0d000825"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:S6rsC6flduxpFtSV2TaFwiS99mKWwhg5608zV5bO0-o1@thread.v2","topic":"test topic","createdOn":"2021-06-14T21:15:11Z","createdByCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-787b-7679-5b3a0d000824","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-787b-7679-5b3a0d000824"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-sdktester-e2e.dev.communication.azure.net/chat/threads/19%3AS6rsC6flduxpFtSV2TaFwiS99mKWwhg5608zV5bO0-o1@thread.v2',
  'MS-CV',
  '3/jfTJ4q7ECdh7LoxK8ezg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '979ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03sbHYAAAAACAfBo3xtkORbqu9ZtGDJLvUERYMzFFREdFMDIyMAA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:11 GMT'
]);
