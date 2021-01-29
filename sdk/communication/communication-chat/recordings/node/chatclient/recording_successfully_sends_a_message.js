let nock = require('nock');

module.exports.hash = "397e36863f23efcd229d410a33dcc37f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1611776447102"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://13.64.171.212/chat/threads/19%3Aa57caa80215748b484a26279925e5a92@thread.v2/messages/1611776447102',
  'MS-CV',
  'rhiTnDvYjU2ktvN3Iq3RIw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '126ms',
  'X-Azure-Ref',
  '0v8ERYAAAAACpzVNAPwA0TqfezLqpognuWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:46 GMT'
]);
