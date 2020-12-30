let nock = require('nock');

module.exports.hash = "4ef54a833987be8d1884a033e0850755";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1609362866505"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://168.61.22.92/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c@thread.v2/messages/1609362866505',
  'MS-CV',
  'IsiphM151Ey/EhVxR9LZCg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '378ms',
  'X-Azure-Ref',
  '0su3sXwAAAABg04r89Be9Spit2yZHeGUBWVZSMzBFREdFMDQxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:26 GMT'
]);
