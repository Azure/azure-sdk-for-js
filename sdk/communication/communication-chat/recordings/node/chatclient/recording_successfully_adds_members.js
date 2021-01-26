let nock = require('nock');

module.exports.hash = "ecd696a34056369467b8bbb4fadf0a68";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-b5ce-6032-3b3a0d0048e4"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'yfrwEbYfY0aZk7o0LXSkGw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'cce60acd-35a3-4611-9e27-e9c5892c00e7',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '20ms',
  'X-Azure-Ref',
  '0fSkPYAAAAADqUj+jKUABS6g0WEFDSvDMWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3Aec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-b5ce-6032-3b3a0d0048e4/:issueAccessToken', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"token":"token","expiresOn":"2021-01-26T20:26:36.4842707+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '4bYiqS8tf0y6wrjqZ6lVsQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'c0b3e1b9-89e7-4254-90fc-4189323ff16b',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '39ms',
  'X-Azure-Ref',
  '0fSkPYAAAAAAP9qM4JP67QaVi4MEte2NlWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2/members', {"members":[{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-b5ce-6032-3b3a0d0048e4"}]})
  .query(true)
  .reply(207, {"multipleStatus":[{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-b5ce-6032-3b3a0d0048e4","statusCode":201,"type":"ThreadMember"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'SK9tYUslPEiFRjEIHBkWLQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2',
  'X-Processing-Time',
  '213ms',
  'X-Azure-Ref',
  '0fSkPYAAAAABMh7Q6oKprS7n6eeshI//lWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:37 GMT'
]);
