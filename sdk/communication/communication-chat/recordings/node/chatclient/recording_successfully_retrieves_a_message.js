let nock = require('nock');

module.exports.hash = "fc9f126b8906a13cafb1265001b083bc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127%40thread.v2/messages/1606969659707')
  .query(true)
  .reply(200, {"id":"1606969659707","type":"Text","priority":"Normal","version":"1606969659707","content":"content","senderDisplayName":"","createdOn":"2020-12-03T04:27:39Z","senderId":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'IMOm3tbOYEmuHbVu+SrYKg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '251ms',
  'X-Azure-Ref',
  '0PWnIXwAAAACVjlZzKCwCRLYK5LZYFUxBWVZSMzBFREdFMDQwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:41 GMT'
]);
