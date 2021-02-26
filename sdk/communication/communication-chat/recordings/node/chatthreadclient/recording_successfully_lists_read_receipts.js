let nock = require('nock');

module.exports.hash = "68f698ad1cd68fb5d2031b79d0a1fd0f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899%40thread.v2/readReceipts')
  .query(true)
  .reply(200, {"value":[{"senderCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774"}},"chatMessageId":"1614300005782","readOn":"2021-02-26T00:40:06Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '7SgseZY/UE2rx51at0so2g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '121ms',
  'X-Azure-Ref',
  '0aEM4YAAAAADwid+Q2d9lTYbMGHYMzJ7VV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 26 Feb 2021 00:40:07 GMT'
]);
