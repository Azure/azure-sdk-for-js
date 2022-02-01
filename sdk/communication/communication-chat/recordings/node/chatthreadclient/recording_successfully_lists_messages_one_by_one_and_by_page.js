let nock = require('nock');

module.exports.hash = "b0e45c3b33265f3f3b7b14cee92a2742";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AR3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1643757023943","type":"text","sequenceId":"4","version":"1643757023943","content":{"message":"content"},"senderDisplayName":"","createdOn":"2022-02-01T23:10:23Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}},"metadata":{"tags":"sometag"}},{"id":"1643757023613","type":"topicUpdated","sequenceId":"3","version":"1643757023613","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}}},"createdOn":"2022-02-01T23:10:23Z"},{"id":"1643757023023","type":"topicUpdated","sequenceId":"2","version":"1643757023023","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}}},"createdOn":"2022-02-01T23:10:23Z"},{"id":"1643757022983","type":"participantAdded","sequenceId":"1","version":"1643757022983","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-5219-99c6-593a0d00e2ac","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-5219-99c6-593a0d00e2ac"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}}},"createdOn":"2022-02-01T23:10:22Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'GuvNxw5j8Eu74WckasaC+A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '103ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04L35YQAAAADCdeMkEqiuS7tW+n2iwV+OUERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AR3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1643757023943","type":"text","sequenceId":"4","version":"1643757023943","content":{"message":"content"},"senderDisplayName":"","createdOn":"2022-02-01T23:10:23Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}},"metadata":{"tags":"sometag"}},{"id":"1643757023613","type":"topicUpdated","sequenceId":"3","version":"1643757023613","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}}},"createdOn":"2022-02-01T23:10:23Z"},{"id":"1643757023023","type":"topicUpdated","sequenceId":"2","version":"1643757023023","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}}},"createdOn":"2022-02-01T23:10:23Z"}],"nextLink":"https://chat-prod-e2e.communication.azure.com/chat/threads/19:R3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1@thread.v2/messages?syncState=3e3900000031393a5233676876304a65316f3045356b4e445a43767133674d62745843356e4b4f61626f6a4c2d7a597562434931407468726561642e7632012faf8db77e010000c7b28db77e010000&startTime=1%2F1%2F1970%2012%3A00%3A00%20AM%20%2B00%3A00&maxPageSize=3&api-version=2021-09-07"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'HpMa3wmSn0a8R9UQdZFSFw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '88ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04b35YQAAAADguzPpDFgAS6+ZECax5SJ5UERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19:R3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1@thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1643757022983","type":"participantAdded","sequenceId":"1","version":"1643757022983","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-5219-99c6-593a0d00e2ac","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-5219-99c6-593a0d00e2ac"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}}},"createdOn":"2022-02-01T23:10:22Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'vkhLa4STv069o4WbPj39ow.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '132ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04b35YQAAAADPZTDOddxWSrjvDpl5RtuNUERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:24 GMT'
]);
