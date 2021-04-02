let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2/readreceipts', {"chatMessageId":"1611606392859"})
  .query(true)
  .reply(201, "", [
  'MS-CV',
  'IbaoficFIUOxdqO3GPHMPw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '168ms',
  'X-Azure-Ref',
  '0eSkPYAAAAAAGZkSfGEScR4C7S3oDCvlqWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:33 GMT',
  'Content-Length',
  '0'
]);
