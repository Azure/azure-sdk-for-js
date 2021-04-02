let nock = require('nock');

module.exports.hash = "e351de90db1a935439638e481a932450";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2/readreceipts')
  .query(true)
  .reply(200, {"value":[{"senderId":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0","chatMessageId":"1611606392859","readOn":"2021-01-25T20:26:33Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '5wEvGyKNaUGSOCui8okG6Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '60ms',
  'X-Azure-Ref',
  '0fykPYAAAAAB649PQel6VRZrzCcGh3PF1WVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:39 GMT'
]);
