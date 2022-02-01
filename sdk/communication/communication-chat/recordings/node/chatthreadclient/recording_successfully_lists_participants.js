let nock = require('nock');

module.exports.hash = "bf58bd7461d0411a164f442bd8ca5deb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AR3ghv0Je1o0E5kNDZCvq3gMbtXC5nKOabojL-zYubCI1%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-51c2-99c6-593a0d00e2ab"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-5219-99c6-593a0d00e2ac","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-5219-99c6-593a0d00e2ac"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-5ddd-99c6-593a0d00e2ad","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000f-576f-5ddd-99c6-593a0d00e2ad"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '80cCj0XQ2kK6yWrBlPGSug.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '113ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04r35YQAAAACZDshVzffwTZ/Ubaq8XoSvUERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:25 GMT'
]);
