let nock = require('nock');

module.exports.hash = "49c6686d60ef4074b8144e037007c99a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1619048916697","type":"text","sequenceId":"4","version":"1619048916697","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-04-21T23:48:36Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8"}},"properties":{"tags":"sometag"}},{"id":"1619048916153","type":"topicUpdated","sequenceId":"3","version":"1619048916153","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8"}}},"createdOn":"2021-04-21T23:48:36Z"},{"id":"1619048915303","type":"topicUpdated","sequenceId":"2","version":"1619048915303","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8"}}},"createdOn":"2021-04-21T23:48:35Z"},{"id":"1619048915143","type":"participantAdded","sequenceId":"1","version":"1619048915143","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-8150-71bf-a43a0d0044e3","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-8150-71bf-a43a0d0044e3"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8"}}},"createdOn":"2021-04-21T23:48:35Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'wEDrbWUmVU6f6T8J3mnIIA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '159ms',
  'X-Azure-Ref',
  '01bmAYAAAAAARLrX2FxnYT45QrdcSBkuFV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:37 GMT'
]);
