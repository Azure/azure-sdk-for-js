let nock = require('nock');

module.exports.hash = "d1b1ea54f4e60c7db92b5a7e81c4cc14";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1605570543468","type":"Text","priority":"Normal","version":"1605570543468","content":"content","senderDisplayName":"","createdOn":"2020-11-16T23:49:03Z","senderId":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148"},{"id":"1605570541718","type":"ThreadActivity/TopicUpdate","priority":"Normal","version":"1605570541718","content":"<topicupdate><eventtime>1605570541718</eventtime><initiator>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148</initiator><value>test topic</value></topicupdate>","createdOn":"2020-11-16T23:49:01Z","senderId":"19:08f3db9af86044bfa21eb8b02b847f22@thread.v2"},{"id":"1605570541671","type":"ThreadActivity/AddMember","priority":"Normal","version":"1605570541671","content":"<addmember><eventtime>1605570541671</eventtime><initiator>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148</initiator><rosterVersion>1605570541468</rosterVersion><target>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148</target><detailedtargetinfo><id>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148</id></detailedtargetinfo><target>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d519-ea7c-5a3a0d00025b</target><detailedtargetinfo><id>8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d519-ea7c-5a3a0d00025b</id></detailedtargetinfo></addmember>","createdOn":"2020-11-16T23:49:01Z","senderId":"19:08f3db9af86044bfa21eb8b02b847f22@thread.v2"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'VeNF50DEbkGKm0xtDOExRA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '263ms',
  'X-Azure-Ref',
  '08Q+zXwAAAABQMXYwkXM2SLL3lyaCPvtvV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:05 GMT'
]);
