let nock = require('nock');

module.exports.hash = "232c4191fc30a21fa33707d4ac5be8c3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"sanitized"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'VggvdAWyqEyhoaAr/ub0iA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '13ms',
  'X-Azure-Ref',
  '06zh+YAAAAADA0BHWtZqaSrtMn77YsB9FWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 20 Apr 2021 02:14:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/identities/sanitized')
  .query(true)
  .reply(204, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'C85ZzS6rTkCiO7fODEU18A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '667ms',
  'X-Azure-Ref',
  '06zh+YAAAAABRPzWqZQEsR4gGCHC0yH5gWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 20 Apr 2021 02:14:03 GMT'
]);
