let nock = require('nock');

module.exports.hash = "9dcece4c2de1547e4e0750ac24ad5a1a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AR3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1%40thread.v2/readReceipts')
  .query(true)
  .reply(200, {"value":[{"senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}},"chatMessageId":"1643757023943","readOn":"2022-02-01T23:10:24Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'brnvhWbkyUmok5YHVeFFbw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '97ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04r35YQAAAAA+QB0nTAk9Sq39hCCRzM3fUERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:26 GMT'
]);
