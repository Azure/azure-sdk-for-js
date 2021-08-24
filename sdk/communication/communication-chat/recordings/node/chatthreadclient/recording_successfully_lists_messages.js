let nock = require('nock');

module.exports.hash = "1f8534fbb5a951a66d210f9e8991c150";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A6GWcNAPQG7ZctIOLMIvOZnlvHJo5gahbUshyKQfgCa41%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1629767961421","type":"text","sequenceId":"4","version":"1629767961421","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-08-24T01:19:21Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c"}},"metadata":{"tags":"sometag"}},{"id":"1629767961042","type":"topicUpdated","sequenceId":"3","version":"1629767961042","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c"}}},"createdOn":"2021-08-24T01:19:21Z"},{"id":"1629767960456","type":"topicUpdated","sequenceId":"2","version":"1629767960456","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c"}}},"createdOn":"2021-08-24T01:19:20Z"},{"id":"1629767960436","type":"participantAdded","sequenceId":"1","version":"1629767960436","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-287d-02c3-593a0d000754","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-287d-02c3-593a0d000754"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c"}}},"createdOn":"2021-08-24T01:19:20Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '2KIgyXnaw0CcJUyag0zD5w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '150ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GkkkYQAAAACfopdKDvZMS4ZLQItujlhhUERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 24 Aug 2021 01:19:22 GMT'
]);
