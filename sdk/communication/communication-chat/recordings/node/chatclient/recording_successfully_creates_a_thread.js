let nock = require('nock');

module.exports.hash = "d4936284041bb7af6986d6e176cba699";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1b5c-1db7-3a3a0d0043a2"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'HU/q+YyWTkmin6hmupuvkA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'ed182e6f-73b0-40b5-82ac-09316f6dc10b',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '62ms',
  'X-Azure-Ref',
  '0r+3sXwAAAABLuSPm+3Y7TZc8kJ3KOF1JWVZSMzBFREdFMDMxNgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1b5c-1db7-3a3a0d0043a2/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1b5c-1db7-3a3a0d0043a2","token":"token","expiresOn":"2020-12-31T21:14:23.1122863+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'gU65RAQvBEetY2YZqVFeog.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '400a8ebe-d6db-4d9c-8cc2-8fba7ca720bf',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '84ms',
  'X-Azure-Ref',
  '0sO3sXwAAAABypqZDwmW2TYUI1D3tlme1WVZSMzBFREdFMDMxNgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1ca2-b0b7-3a3a0d0044b6"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'qkULgHTd90+wmEhCtqPIsw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '64cf97bf-1c8f-4b52-b3ee-cc8b97294883',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '17ms',
  'X-Azure-Ref',
  '0sO3sXwAAAAB9IH0MRm0HRLgoJIBNg/y5WVZSMzBFREdFMDMwNgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1ca2-b0b7-3a3a0d0044b6/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1ca2-b0b7-3a3a0d0044b6","token":"token","expiresOn":"2020-12-31T21:14:23.417037+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'nDJBp/AKy065exAKixJkOw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'b8b8100c-7373-4012-9bd2-d5c6952f2e13',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '83ms',
  'X-Azure-Ref',
  '0sO3sXwAAAABcXrZVNP8dRYNwk/pc0V1jWVZSMzBFREdFMDMwNgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1b5c-1db7-3a3a0d0043a2"},{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1ca2-b0b7-3a3a0d0044b6"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:0771a8d8c00d4329b664c4237e41bf0c@thread.v2","topic":"test topic","createdOn":"2020-12-30T21:14:24Z","createdBy":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1b5c-1db7-3a3a0d0043a2"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://168.61.22.92/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c@thread.v2',
  'MS-CV',
  '0x0ni1/kbkOVzKLIzOE+Rg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '844ms',
  'X-Azure-Ref',
  '0sO3sXwAAAADi7IMuzpBxS6Mjrp7meP9jWVZSMzBFREdFMDQxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:24 GMT'
]);
