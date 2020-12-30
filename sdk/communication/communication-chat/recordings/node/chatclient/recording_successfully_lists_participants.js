let nock = require('nock');

module.exports.hash = "b56d623d661b55248a369b405cdd5d00";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-8308-1db7-3a3a0d00437f","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-965c-dbb7-3a3a0d0043d1","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '7xO8Qg4iYEq2vF3wMZATdg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '271ms',
  'X-Azure-Ref',
  '0SuLsXwAAAAAF+c+rFk3/SI4YGcIuXkERWVZSMzBFREdFMDMxMgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:47 GMT'
]);
