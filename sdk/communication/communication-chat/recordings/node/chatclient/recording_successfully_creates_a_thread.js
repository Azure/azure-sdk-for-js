let nock = require('nock');

module.exports.hash = "d4936284041bb7af6986d6e176cba699";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'mHNgV9E47k6oykZ3HfqZ5g.0',
  'x-ms-client-request-id',
  '55942a2d-93ea-47c9-88f3-7eb4413393ec',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '149ms',
  'X-Azure-Ref',
  '0N2nIXwAAAAD59hTHEIbxR5aahzN55V4jWVZSMzBFREdFMDQxOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078","token":"token","expiresOn":"2020-12-04T04:27:35.5229408+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'o4ShZZOx9EeA/cxznhnLyw.0',
  'x-ms-client-request-id',
  'faed6d67-50e8-4026-bdd3-74f93de5c0ca',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '301ms',
  'X-Azure-Ref',
  '0OGnIXwAAAACyqRUOGJRbTbvAHoGNqS/yWVZSMzBFREdFMDQxOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a9fd-8a72-5a3a0d0000b0"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'l8yfCeCG+0umedhUIQIBYw.0',
  'x-ms-client-request-id',
  'e0b73bc5-0a8d-4a0b-8850-06ca33cb16c4',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '148ms',
  'X-Azure-Ref',
  '0OGnIXwAAAACVSREABL2cQ7qJ6GCP++FgWVZSMzBFREdFMDQxNwA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a9fd-8a72-5a3a0d0000b0/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a9fd-8a72-5a3a0d0000b0","token":"token","expiresOn":"2020-12-04T04:27:36.1745785+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'gm7xf3XR8EafIU3+kuVCtQ.0',
  'x-ms-client-request-id',
  '81aad8a4-6752-494d-b79b-e8e87d2d987f',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '299ms',
  'X-Azure-Ref',
  '0OGnIXwAAAACERTKED8sbRbsrWTQUZJffWVZSMzBFREdFMDQxNwA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078"},{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a9fd-8a72-5a3a0d0000b0"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:8dbd0526e07a41ab8982a9e29a042127@thread.v2","topic":"test topic","createdOn":"2020-12-03T04:27:37Z","createdBy":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://168.61.22.92/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127@thread.v2',
  'MS-CV',
  'OTGQQOINUk2Di2HO9yhx1Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '1304ms',
  'X-Azure-Ref',
  '0OWnIXwAAAAAqNjn0ApjuRIP0f5imPvgSWVZSMzBFREdFMDQxNgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:38 GMT'
]);
