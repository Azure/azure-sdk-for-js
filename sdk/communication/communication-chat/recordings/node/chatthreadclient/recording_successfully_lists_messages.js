let nock = require('nock');

module.exports.hash = "1f8534fbb5a951a66d210f9e8991c150";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AXTvysZD4351uz6bY6_ZO6PK6M5Ovmh0-VmHO9GhQLtM1%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1623884770449","type":"text","sequenceId":"4","version":"1623884770449","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-06-16T23:06:10Z","senderCommunicationIdentifier":{"rawId":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0","communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0"}},"metadata":{"tags":"sometag"}},{"id":"1623884770041","type":"topicUpdated","sequenceId":"3","version":"1623884770041","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0","communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0"}}},"createdOn":"2021-06-16T23:06:10Z"},{"id":"1623884769475","type":"topicUpdated","sequenceId":"2","version":"1623884769475","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0","communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0"}}},"createdOn":"2021-06-16T23:06:09Z"},{"id":"1623884769430","type":"participantAdded","sequenceId":"1","version":"1623884769430","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0","communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c9c5-edbe-a43a0d00fdd1","communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c9c5-edbe-a43a0d00fdd1"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0","communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0"}}},"createdOn":"2021-06-16T23:06:09Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ZxxSpVI9lEK1j2aCTdmdWg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '122ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '044PKYAAAAAAY8qoYJw9UTZXmms9sjmKLWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:11 GMT'
]);
