let nock = require('nock');

module.exports.hash = "61bde83cf5c0c1bf73fdd3c8c3d79e7f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1611776447102","type":"Text","priority":"Normal","version":"1611776447102","content":"content","senderDisplayName":"","createdOn":"2021-01-27T19:40:47Z","senderId":"8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420"},{"id":"1611776446547","type":"ThreadActivity/TopicUpdate","priority":"Normal","version":"1611776446547","content":"<topicupdate><eventtime>1611776446547</eventtime><initiator>8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420</initiator><value>test topic</value></topicupdate>","createdOn":"2021-01-27T19:40:46Z","senderId":"19:a57caa80215748b484a26279925e5a92@thread.v2"},{"id":"1611776446492","type":"ThreadActivity/AddMember","priority":"Normal","version":"1611776446492","content":"<addmember><eventtime>1611776446492</eventtime><initiator>8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420</initiator><rosterVersion>1611776446412</rosterVersion><target>8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420</target><detailedtargetinfo><id>8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7133-e1ae-1d3a0d004420</id></detailedtargetinfo><target>8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7305-6032-3b3a0d0096dd</target><detailedtargetinfo><id>8:acs:a6b1db05-01f4-4539-95c4-d37fdd6d9a2d_00000007-e53e-7305-6032-3b3a0d0096dd</id></detailedtargetinfo></addmember>","createdOn":"2021-01-27T19:40:46Z","senderId":"19:a57caa80215748b484a26279925e5a92@thread.v2"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'MzEAdvmtoU6G8lOklCiFuQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '82ms',
  'X-Azure-Ref',
  '0v8ERYAAAAACiFeNL0scNT6Ak1dDr291OWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:47 GMT'
]);
