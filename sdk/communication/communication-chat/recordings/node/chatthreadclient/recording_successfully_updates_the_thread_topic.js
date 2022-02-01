let nock = require('nock');

module.exports.hash = "583421fca0c161e20873222c40e6e511";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/chat/threads/19%3AR3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1%40thread.v2', {"topic":"new topic"})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '905cSA+moUCJsUGnfNfwaA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '292ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03735YQAAAAAUA+3nroHJR4Kd+tCoMREcUERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AR3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:R3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1@thread.v2","topic":"new topic","createdOn":"2022-02-01T23:10:22Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '+GRzjfyXj0+tMQwFGAgacw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '86ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03735YQAAAACte+8mNOKoQr5xv6VtzOVzUERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:23 GMT'
]);
