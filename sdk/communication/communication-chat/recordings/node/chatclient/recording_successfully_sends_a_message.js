let nock = require('nock');

module.exports.hash = "44a1a3fb76689a98de0cbdfbe9b12da6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1605570543468"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://168.61.22.92/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22@thread.v2/messages/1605570543468',
  'MS-CV',
  'NcSaRvgC8Eq76slwjOjtEw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '386ms',
  'X-Azure-Ref',
  '07w+zXwAAAAAX1e3KJAjlSYiX81Y3vRuSV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:02 GMT'
]);
