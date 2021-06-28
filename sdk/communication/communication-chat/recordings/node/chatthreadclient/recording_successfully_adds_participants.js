let nock = require('nock');

module.exports.hash = "56896101f9b0e9c5b2aba99d4beff406";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-9bbd-7679-5b3a0d000828"},"accessToken":{"token":"token","expiresOn":"2021-06-15T21:15:18.4458709+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'XAlB3ZS7nE6NfSDezouE/Q.0',
  'x-ms-client-request-id',
  'e3730f66-b10e-4fa5-894b-7181192df5a6',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '170ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '058bHYAAAAABjIUhHYqt4S6cxCxD6QET1UERYMzFFREdFMDIwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AoXeDm2YWQ-rjbfG0ilcCtPs5GBwZEeVt5ssFsYc0Ehc1%40thread.v2/participants/:add', {"participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-9bbd-7679-5b3a0d000828"}}}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '2WnPhc87c0eJR4b6S8wpvQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '446ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '058bHYAAAAABH6CU36KQDTJTqShF3Pk4qUERYMzFFREdFMDIxNgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:19 GMT'
]);
