let nock = require('nock');

module.exports.hash = "cdaca9cba53e2ea55edb80336ba72818";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1613524939985","type":"text","sequenceId":"4","version":"1613524939985","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-02-17T01:22:19Z","senderId":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8"},{"id":"1613524939389","type":"topicUpdated","sequenceId":"3","version":"1613524939389","content":{"topic":"new topic","initiator":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8"},"createdOn":"2021-02-17T01:22:19Z"},{"id":"1613524938954","type":"topicUpdated","sequenceId":"2","version":"1613524938954","content":{"topic":"test topic","initiator":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8"},"createdOn":"2021-02-17T01:22:18Z"},{"id":"1613524938849","type":"participantAdded","sequenceId":"1","version":"1613524938849","content":{"participants":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-5349-e3c7-593a0d0002da","shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiator":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8"},"createdOn":"2021-02-17T01:22:18Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'DXLFFtlxxUiq7JBAD/FaZQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '75ms',
  'X-Azure-Ref',
  '0zG8sYAAAAAClg+fVn/sZQL/z64x+vPnjU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:20 GMT'
]);
