let nock = require('nock');

module.exports.hash = "445066970a0a7ca03bae7bcddd06b520";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1b5c-1db7-3a3a0d0043a2","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1ca2-b0b7-3a3a0d0044b6","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-2e87-1db7-3a3a0d0043a3","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '5EDiEr3TM0OGBhKfdAufsw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '273ms',
  'X-Azure-Ref',
  '0te3sXwAAAAAiJFr/oZo4Sp6mS46u9a2vWVZSMzBFREdFMDQxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:29 GMT'
]);
