let nock = require('nock');

module.exports.hash = "ccd0e3cb07ad54a246c1c01e8fd816bd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-f093-8a72-5a3a0d00020a"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'xDqFGvAxx066+2zsnUaaMQ.0',
  'x-ms-client-request-id',
  'dccc19e2-c3e0-4c31-89a2-a5c82d7a016e',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '190ms',
  'X-Azure-Ref',
  '08g+zXwAAAACGqDo0sKHyRYiKftGg9zEgV1NURURHRTA4MTcANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-f093-8a72-5a3a0d00020a/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-f093-8a72-5a3a0d00020a","token":"token","expiresOn":"2020-11-17T23:49:06.2603307+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'LnXSO4F8Hky1/wxTakeENg.0',
  'x-ms-client-request-id',
  'fd01b26b-9dae-4ca6-b198-2bed788ca16a',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '303ms',
  'X-Azure-Ref',
  '08g+zXwAAAABvCFnXAvukQ6fvbPzgkVfkV1NURURHRTA4MTcANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22%40thread.v2/participants', {"participants":[{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-f093-8a72-5a3a0d00020a"}]})
  .query(true)
  .reply(201, "", [
  'MS-CV',
  'wop8z5S23EmEkmIhMynKhQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '931ms',
  'X-Azure-Ref',
  '08w+zXwAAAADdR3zVqr6yQrVB0nJ7QJueV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:07 GMT',
  'Content-Length',
  '0'
]);
