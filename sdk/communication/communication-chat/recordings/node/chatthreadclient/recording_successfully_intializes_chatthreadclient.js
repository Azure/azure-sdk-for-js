let nock = require('nock');

module.exports.hash = "dd036b6eec754710de54033ddef4fddb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '9oHNmKDmVkSxhlghsfBXxw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '2484e6f2-87af-4ff8-95e4-efbfd11e2cfb',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '18ms',
  'X-Azure-Ref',
  '03moQYAAAAABmAd3WwikNT6v/pxyAFLuzWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9","token":"token","expiresOn":"2021-01-27T19:17:49.8351273+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '4gPyDcFy2EeO94wLmO9iWg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '437309ff-568e-4034-b941-2198f7ee2e6d',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '83ms',
  'X-Azure-Ref',
  '03moQYAAAAAAJspLzvNvfRJGlXnNWgjuHWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1aa3-1655-373a0d0032ea"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'x7mto+e+b0OPQm2LRYSvPA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'e94a4d73-dfbc-47e8-89a3-647e7efd9c55',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '15ms',
  'X-Azure-Ref',
  '03moQYAAAAAAnp6zkMeP3Tp7tD4T0bfyCWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1aa3-1655-373a0d0032ea/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1aa3-1655-373a0d0032ea","token":"token","expiresOn":"2021-01-27T19:17:50.0183904+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '77dJ45+cmEmovuaWcEr2xw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'e0cb837b-4d0e-483f-af8f-28ff274afcbf',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '85ms',
  'X-Azure-Ref',
  '03moQYAAAAABztk2FF92OR4jxyo+VZzVzWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9"},{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1aa3-1655-373a0d0032ea"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:acc5e14e9ced46fbbb8fd0ee8160d9e4@thread.v2","topic":"test topic","createdOn":"2021-01-26T19:17:51Z","createdBy":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://168.61.22.92/chat/threads/19%3Aacc5e14e9ced46fbbb8fd0ee8160d9e4@thread.v2',
  'MS-CV',
  '2A3qmywG60WbmpwLtLibMA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '825ms',
  'X-Azure-Ref',
  '032oQYAAAAAC1y3XQ6+yEQJa3evfm0OsxWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:51 GMT'
]);
