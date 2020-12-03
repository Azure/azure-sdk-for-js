let nock = require('nock');

module.exports.hash = "6671f74e8fe41f7a33a111a51ebb1d5d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1606969659707","type":"Text","priority":"Normal","version":"1606969659707","content":"content","senderDisplayName":"","createdOn":"2020-12-03T04:27:39Z","senderId":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078"},{"id":"1606969658200","type":"ThreadActivity/TopicUpdate","priority":"Normal","version":"1606969658200","content":"<topicupdate><eventtime>1606969658200</eventtime><initiator>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078</initiator><value>test topic</value></topicupdate>","createdOn":"2020-12-03T04:27:38Z","senderId":"19:8dbd0526e07a41ab8982a9e29a042127@thread.v2"},{"id":"1606969658184","type":"ThreadActivity/AddMember","priority":"Normal","version":"1606969658184","content":"<addmember><eventtime>1606969658169</eventtime><initiator>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078</initiator><rosterVersion>1606969657981</rosterVersion><target>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078</target><detailedtargetinfo><id>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078</id></detailedtargetinfo><target>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a9fd-8a72-5a3a0d0000b0</target><detailedtargetinfo><id>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a9fd-8a72-5a3a0d0000b0</id></detailedtargetinfo></addmember>","createdOn":"2020-12-03T04:27:38Z","senderId":"19:8dbd0526e07a41ab8982a9e29a042127@thread.v2"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'DeWTChXMO06RZXIZLbQPbA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '257ms',
  'X-Azure-Ref',
  '0PWnIXwAAAAAcrHBZBZRiQbAFXQuE1KevWVZSMzBFREdFMDQwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:41 GMT'
]);
