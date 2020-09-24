let nock = require('nock');

module.exports.hash = "6c359419b94381d03bad2a9dce0534bc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1600132531629","type":"Text","priority":"Normal","version":"1600132531629","content":"content","senderDisplayName":"","createdOn":"2020-09-15T01:15:31Z","senderId":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e"},{"id":"1600132530651","type":"ThreadActivity/TopicUpdate","priority":"Normal","version":"1600132530651","content":"<topicupdate><eventtime>1600132530651</eventtime><initiator>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e</initiator><value>test topic</value></topicupdate>","createdOn":"2020-09-15T01:15:30Z","senderId":"19:069d3bbafc4840df836c5fe8e232a17f@thread.v2"},{"id":"1600132530587","type":"ThreadActivity/AddMember","priority":"Normal","version":"1600132530587","content":"<addmember><eventtime>1600132530587</eventtime><initiator>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e</initiator><rosterVersion>1600132530506</rosterVersion><target>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e</target><detailedtargetinfo><id>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e</id></detailedtargetinfo><target>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-62cc-6a0b-343a0d00003b</target><detailedtargetinfo><id>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-62cc-6a0b-343a0d00003b</id></detailedtargetinfo></addmember>","createdOn":"2020-09-15T01:15:30Z","senderId":"19:069d3bbafc4840df836c5fe8e232a17f@thread.v2"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'opexShkLyUCGJLe4FirCAQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '88ms',
  'X-Azure-Ref',
  '0tBVgXwAAAABZ7PVAzCCBS65m4D7nxQCdV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:32 GMT'
]);
