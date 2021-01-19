let nock = require('nock');

module.exports.hash = "d1b1ea54f4e60c7db92b5a7e81c4cc14";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1610503608398","type":"Text","priority":"Normal","version":"1610503608398","content":"content","senderDisplayName":"","createdOn":"2021-01-13T02:06:48Z","senderId":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe"},{"id":"1610503607272","type":"ThreadActivity/TopicUpdate","priority":"Normal","version":"1610503607272","content":"<topicupdate><eventtime>1610503607272</eventtime><initiator>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe</initiator><value>test topic</value></topicupdate>","createdOn":"2021-01-13T02:06:47Z","senderId":"19:883ce5bf892c47d6a7da73da6df31c7e@thread.v2"},{"id":"1610503607247","type":"ThreadActivity/AddMember","priority":"Normal","version":"1610503607247","content":"<addmember><eventtime>1610503607247</eventtime><initiator>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe</initiator><rosterVersion>1610503607197</rosterVersion><target>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe</target><detailedtargetinfo><id>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe</id></detailedtargetinfo><target>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-74aa-1000-343a0d0023c1</target><detailedtargetinfo><id>8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-74aa-1000-343a0d0023c1</id></detailedtargetinfo></addmember>","createdOn":"2021-01-13T02:06:47Z","senderId":"19:883ce5bf892c47d6a7da73da6df31c7e@thread.v2"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'XxVFaNUhnkSxriAqj6CjjA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '83ms',
  'X-Azure-Ref',
  '0uVX+XwAAAAD0EM+iiJ8yTZzWCM8tAr3hV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:49 GMT'
]);
