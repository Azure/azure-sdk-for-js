let nock = require('nock');

module.exports.hash = "0343e67db5392abf4721684204568393";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-d468-2a7a-5b3a0d0005f5"},"accessToken":{"token":"token","expiresOn":"2021-05-12T18:24:18.1319123+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '1wX7u/e6F0SMwdBTMAg+Gg.0',
  'x-ms-client-request-id',
  'd2db3cda-15c7-40de-a2f0-609698f4f12e',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '101ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '008uaYAAAAAAA6zChyT/KTpcuU8G/JcYoV1NURURHRTA4MTMANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-d72a-2e7c-5b3a0d000545"},"accessToken":{"token":"token","expiresOn":"2021-05-12T18:24:18.8514265+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'iHQC3nJspkuU7Iwkbwoorg.0',
  'x-ms-client-request-id',
  '8e2b0035-c7ff-41d8-8f21-08f982b78320',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '116ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '008uaYAAAAAA+ZZfLKV42RY8O5uqQWCXzV1NURURHRTA4MTMANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-d468-2a7a-5b3a0d0005f5"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-d72a-2e7c-5b3a0d000545"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:-SU2gzDrzE720bWocJYfAkee6As1QmtdJW3bcNJWyEw1@thread.v2","topic":"test topic","createdOn":"2021-05-11T18:24:20Z","createdByCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-d468-2a7a-5b3a0d0005f5","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_00000009-fc8d-d468-2a7a-5b3a0d0005f5"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-sdktester-e2e.dev.communication.azure.net/chat/threads/19%3A-SU2gzDrzE720bWocJYfAkee6As1QmtdJW3bcNJWyEw1@thread.v2',
  'MS-CV',
  'ycAE05ZEKUWe1wrjpl9T6g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '910ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '008uaYAAAAAB3Lf7fxXLeTIOrwyeDZZ5TV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:20 GMT'
]);
