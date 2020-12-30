let nock = require('nock');

module.exports.hash = "ccd0e3cb07ad54a246c1c01e8fd816bd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-965c-dbb7-3a3a0d0043d1"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'aHa1l4JDj0KfA86XNYT/nQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '7ba1221c-dc85-4bbc-ac58-ba7af60bedb2',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '23ms',
  'X-Azure-Ref',
  '0SuLsXwAAAABfLb2CUdNORbDxF6V4d6UJWVZSMzBFREdFMDQxNABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-965c-dbb7-3a3a0d0043d1/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-965c-dbb7-3a3a0d0043d1","token":"token","expiresOn":"2020-12-31T20:25:45.4824682+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'QAqXIE/uukOTpw0IND6p6Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'db64a1d7-d67c-4200-9dbd-01dfa3072582',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '104ms',
  'X-Azure-Ref',
  '0SuLsXwAAAAA8TBe+NpAySojupKRSgo+wWVZSMzBFREdFMDQxNABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2/participants/:add', {"participants":[{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-965c-dbb7-3a3a0d0043d1"}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'f2pqrl0030CYVmxHUpjjZQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '442ms',
  'X-Azure-Ref',
  '0SuLsXwAAAADIfAaP/M6yRLwYAPiJFcftWVZSMzBFREdFMDMxMgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:46 GMT'
]);
