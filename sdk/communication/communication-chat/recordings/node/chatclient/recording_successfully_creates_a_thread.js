let nock = require('nock');

module.exports.hash = "3794069742a81251dee851468f730252";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'mUqXja0SvEKMdWd8n13AsQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'f81048b2-53d8-464f-b4d6-eb79274dddf5',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '58ms',
  'X-Azure-Ref',
  '0ROLsXwAAAACphyPHZQA+Q5sFDOSQWGBhWVZSMzBFREdFMDMxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91","token":"token","expiresOn":"2020-12-31T20:25:40.2092307+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'QQ3mhFSl/UqRHl8jjK4kBA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '2e46933c-65f2-46a4-9e3a-6a711253639f',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '91ms',
  'X-Azure-Ref',
  '0ReLsXwAAAAAouc4euwPCTL/yzNtKSARhWVZSMzBFREdFMDMxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-8308-1db7-3a3a0d00437f"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'lKeQhG+cwkuLlE6IKoXNUg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'aeeede68-33b3-4a30-a594-afa84dc11eee',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '21ms',
  'X-Azure-Ref',
  '0ReLsXwAAAAAsB8fudgUZTIuKkXruPfTKWVZSMzBFREdFMDMxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-8308-1db7-3a3a0d00437f/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-8308-1db7-3a3a0d00437f","token":"token","expiresOn":"2020-12-31T20:25:40.5131515+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Us2pGTrVBEqNVkfpmv/ukg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '699701f2-6a67-4760-9207-75e8a0f9afb1',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '82ms',
  'X-Azure-Ref',
  '0ReLsXwAAAACXIzeXScxITq1XsPwaRVhgWVZSMzBFREdFMDMxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91"},{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-8308-1db7-3a3a0d00437f"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:9f956fe210414cc3a38295c399294c02@thread.v2","topic":"test topic","createdOn":"2020-12-30T20:25:41Z","createdBy":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://168.61.22.92/chat/threads/19%3A9f956fe210414cc3a38295c399294c02@thread.v2',
  'MS-CV',
  'gkrv8WbYNE+TCMFE7x5twQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '962ms',
  'X-Azure-Ref',
  '0ReLsXwAAAACGUha2jXi8T65+UMDgoILvWVZSMzBFREdFMDQwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:42 GMT'
]);
