let nock = require('nock');

module.exports.hash = "351e07a6e84a7c1868189a472027db0c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2/messages/1611606392859')
  .query(true)
  .reply(200, {"id":"1611606392859","type":"Text","priority":"Normal","version":"1611606392859","content":"content","senderDisplayName":"","createdOn":"2021-01-25T20:26:32Z","senderId":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '/yVKMuN2u0aXpxWK53l+mg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '62ms',
  'X-Azure-Ref',
  '0eikPYAAAAACRWCu8JurNS4xsQOftgvpbWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:34 GMT'
]);
