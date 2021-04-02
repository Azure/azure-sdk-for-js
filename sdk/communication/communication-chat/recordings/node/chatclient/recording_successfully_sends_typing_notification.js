let nock = require('nock');

module.exports.hash = "33d8e6bf8697a18bf09f6892ba52451b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  '6S96apxn7UmgpzhTecbbag.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '104ms',
  'X-Azure-Ref',
  '0eCkPYAAAAAD+i8TyVfbuRquUnNz/GxPWWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:33 GMT',
  'Content-Length',
  '0'
]);
