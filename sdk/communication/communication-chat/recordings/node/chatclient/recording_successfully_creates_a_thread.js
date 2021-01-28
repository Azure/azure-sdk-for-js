let nock = require('nock');

module.exports.hash = "d1eddafa7cd3950c0aef9f6678bb0ddd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420"},"accessToken":{"token":"token","expiresOn":"2021-01-28T19:40:45.0203429+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '9QZbp1WDVkum+pEg2CDEVA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '7ea3ccf4-f688-498a-85fc-bacc21c038e8',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '411ms',
  'X-Azure-Ref',
  '0vcERYAAAAAAH+n4JGwq2Q4hcL69RFlSpWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7305-6032-3b3a0d0096dd"},"accessToken":{"token":"token","expiresOn":"2021-01-28T19:40:45.2366795+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'oCXAoSi7s02Z102rJTB0Kg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '568643a3-29d0-4d49-a188-76ddc5649707',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '35ms',
  'X-Azure-Ref',
  '0vsERYAAAAABKHBGopS8tSKzt9w5R4bNcWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","members":[{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420"},{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7305-6032-3b3a0d0096dd"}]})
  .query(true)
  .reply(207, {"multipleStatus":[{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420","statusCode":201,"type":"ThreadMember"},{"id":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7305-6032-3b3a0d0096dd","statusCode":201,"type":"ThreadMember"},{"id":"19:a57caa80215748b484a26279925e5a92@thread.v2","statusCode":201,"type":"Thread"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://13.64.171.212/chat/threads/19%3Aa57caa80215748b484a26279925e5a92@thread.v2',
  'MS-CV',
  'a9bzwEDkxkCOoYq/xuPkcg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '260ms',
  'X-Azure-Ref',
  '0vsERYAAAAABUm2VPAvfuQrnO7HUgYxbdWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:46 GMT'
]);
