let nock = require('nock');

module.exports.hash = "64233ff8187dfa27fce879385526b7c0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'R+QRrO7bPEKdKD8pOF/NTg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'b1988273-da29-4062-950c-b8353292b83d',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '18ms',
  'X-Azure-Ref',
  '0tVX+XwAAAADgHyPaQuWERY7ajteWs7wOV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe","token":"token","expiresOn":"2021-01-14T02:06:46.0132731+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'D327V2zDZkWb/ERmvL1/CA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'a22faa44-953e-4768-b3f6-c02c215f937a',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '23ms',
  'X-Azure-Ref',
  '0tVX+XwAAAADHcncfyh2iRIadpbEF83XVV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-74aa-1000-343a0d0023c1"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'rkr6koyRz0myaLeozKRuVw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '95f5922b-687c-43d6-a1ed-e1ea57b5f1a6',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '19ms',
  'X-Azure-Ref',
  '0tlX+XwAAAAC6zQKv9oB8SbmD3c2aFrgzV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3A8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-74aa-1000-343a0d0023c1/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-74aa-1000-343a0d0023c1","token":"token","expiresOn":"2021-01-14T02:06:45.5807287+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '+TFfi8e1z0uWZr4KYkSEkQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '214779e4-48b7-45a1-9dd9-dbccb408da3d',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '25ms',
  'X-Azure-Ref',
  '0tlX+XwAAAAB+GZeI44eLT7y75ZltWsjKV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe","shareHistoryTime":"2020-05-26T18:06:06.000Z"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-74aa-1000-343a0d0023c1","shareHistoryTime":"2020-05-26T18:06:06.000Z"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:883ce5bf892c47d6a7da73da6df31c7e@thread.v2","topic":"test topic","createdOn":"2021-01-13T02:06:47Z","createdBy":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://13.64.171.212/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e@thread.v2',
  'MS-CV',
  'qEuDQ4xHME6aVcs1UL436w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '445ms',
  'X-Azure-Ref',
  '0tlX+XwAAAAAE5W2/7phcSJMvqTksVYhWV1NURURHRTA4MTkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:47 GMT'
]);
