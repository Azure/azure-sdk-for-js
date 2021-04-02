let nock = require('nock');

module.exports.hash = "61bde83cf5c0c1bf73fdd3c8c3d79e7f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1611606392859","type":"Text","priority":"Normal","version":"1611606392859","content":"content","senderDisplayName":"","createdOn":"2021-01-25T20:26:32Z","senderId":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0"},{"id":"1611606390614","type":"ThreadActivity/TopicUpdate","priority":"Normal","version":"1611606390614","content":"<topicupdate><eventtime>1611606390614</eventtime><initiator>8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0</initiator><value>test topic</value></topicupdate>","createdOn":"2021-01-25T20:26:30Z","senderId":"19:14724b43dee94c22a938d44457110b8a@thread.v2"},{"id":"1611606390544","type":"ThreadActivity/AddMember","priority":"Normal","version":"1611606390544","content":"<addmember><eventtime>1611606390544</eventtime><initiator>8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0</initiator><rosterVersion>1611606390464</rosterVersion><target>8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0</target><detailedtargetinfo><id>8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0</id></detailedtargetinfo><target>8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-99e7-6032-3b3a0d0048e1</target><detailedtargetinfo><id>8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-99e7-6032-3b3a0d0048e1</id></detailedtargetinfo></addmember>","createdOn":"2021-01-25T20:26:30Z","senderId":"19:14724b43dee94c22a938d44457110b8a@thread.v2"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'G41vUzBR+ke7K1yB5a4jSw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '97ms',
  'X-Azure-Ref',
  '0eykPYAAAAAD095Pav8ZkRbJ9xouSDrZWWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:35 GMT'
]);
