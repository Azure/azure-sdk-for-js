let nock = require('nock');

module.exports.hash = "28a39068dc1d56a110f18d8ca5465626";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AR3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1%40thread.v2/messages', {"content":"content","metadata":{"tags":"sometag"}})
  .query(true)
  .reply(201, {"id":"1643757023943"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3AR3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1@thread.v2/messages/1643757023943',
  'MS-CV',
  '1hB32kcCqkS22Prg2AJNjA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '185ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03735YQAAAABUgI/wHwghTK5bhbamIL1RUERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:23 GMT'
]);
