let nock = require('nock');

module.exports.hash = "31e17666f781ad18cd063e7dde571c6c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-2e87-1db7-3a3a0d0043a3"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'cLOPrgFkME6aPelkkMe3BA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'd2ebb8f1-cee6-4295-b026-6e1a6ae1380a',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '62ms',
  'X-Azure-Ref',
  '0tO3sXwAAAAATLakmTQUbRoZUt0xC5rRRWVZSMzBFREdFMDQxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-2e87-1db7-3a3a0d0043a3/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-2e87-1db7-3a3a0d0043a3","token":"token","expiresOn":"2020-12-31T21:14:28.0190859+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'GWO8IjwebUyL8QfsJJs4Kw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'c0f3627e-7224-40a4-a6c5-befc706212e4',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '91ms',
  'X-Azure-Ref',
  '0tO3sXwAAAAD64pzxlbGpQ4CFL+4V/xPMWVZSMzBFREdFMDQxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c%40thread.v2/participants/:add', {"participants":[{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-2e87-1db7-3a3a0d0043a3"}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'WymZ75ejHkiljw955z6Eig.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '424ms',
  'X-Azure-Ref',
  '0te3sXwAAAABSxuADyJWoSLv1+z9nQRJEWVZSMzBFREdFMDQxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:29 GMT'
]);
