let nock = require('nock');

module.exports.hash = "b6c112c2ef55854746cf861b378c4e03";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-2a63-1655-373a0d0032eb"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'P9I0GPDIWkO6aAULlSz+kA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '40cedc18-4e53-429f-bbde-7bddc34e04a9',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '21ms',
  'X-Azure-Ref',
  '04moQYAAAAAAoRVyIbDE9QYEj+2KcSvMzWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-2a63-1655-373a0d0032eb/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-2a63-1655-373a0d0032eb","token":"token","expiresOn":"2021-01-27T19:17:54.0457453+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'pKW2SsbF60KFcXjImENWdg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '2719ad9c-b804-4df5-9872-38d98b52b3b3',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '87ms',
  'X-Azure-Ref',
  '04moQYAAAAAB+Y45aNPmRR42RwhV91l48WVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Aacc5e14e9ced46fbbb8fd0ee8160d9e4%40thread.v2/participants/:add', {"participants":[{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-2a63-1655-373a0d0032eb"}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'RYtX++mT7kSsaNzTY9zDYA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '814ms',
  'X-Azure-Ref',
  '042oQYAAAAAD3p6euUY65Rb9B3N+hGMTHWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:55 GMT'
]);
