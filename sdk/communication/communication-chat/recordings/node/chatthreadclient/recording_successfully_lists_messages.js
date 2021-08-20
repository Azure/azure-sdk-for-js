let nock = require('nock');

module.exports.hash = "e3a61b172d089f60c49747f7ffe46058";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AG9Ahp1Z8TtiJdI42d6ndj1QXAXeWZGeqjdxqjgPOdR81%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1629486443938","type":"text","sequenceId":"4","version":"1629486443938","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-08-20T19:07:23Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311"}},"metadata":{"tags":"sometag"}},{"id":"1629486443452","type":"topicUpdated","sequenceId":"3","version":"1629486443452","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311"}}},"createdOn":"2021-08-20T19:07:23Z"},{"id":"1629486442908","type":"topicUpdated","sequenceId":"2","version":"1629486442908","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311"}}},"createdOn":"2021-08-20T19:07:22Z"},{"id":"1629486442878","type":"participantAdded","sequenceId":"1","version":"1629486442878","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8c32-02c3-593a0d001312","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8c32-02c3-593a0d001312"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-8bc8-02c3-593a0d001311"}}},"createdOn":"2021-08-20T19:07:22Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'dbr66Ui880y1xi2YMr0Iag.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '107ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bP0fYQAAAAAq0QrdHBotQ6nu7TPiE+YdUERYMzFFREdFMDIxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 20 Aug 2021 19:07:24 GMT'
]);
