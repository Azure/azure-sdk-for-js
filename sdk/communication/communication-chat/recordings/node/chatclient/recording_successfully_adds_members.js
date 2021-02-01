let nock = require('nock');

module.exports.hash = "ecd696a34056369467b8bbb4fadf0a68";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7acf-6032-3b3a0d0096de"},"accessToken":{"token":"token","expiresOn":"2021-01-28T19:40:47.2287421+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'OpRHP72s70iM//iSPg+cfw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '0880f411-b55a-42a7-9687-0d1b420ec423',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '32ms',
  'X-Azure-Ref',
  '0wMERYAAAAACl/tLbebciQK4p87NVAZnyWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2/members', {"members":[{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7acf-6032-3b3a0d0096de"}]})
  .query(true)
  .reply(207, {"multipleStatus":[{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7acf-6032-3b3a0d0096de","statusCode":201,"type":"ThreadMember"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'm/G3q4ldnk+uHkIqIttPFw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2',
  'X-Processing-Time',
  '346ms',
  'X-Azure-Ref',
  '0wMERYAAAAAD5nU3HbKnBTJZ4lUZleDRCWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:48 GMT'
]);
