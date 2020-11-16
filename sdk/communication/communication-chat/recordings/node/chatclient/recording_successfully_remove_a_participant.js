let nock = require('nock');

module.exports.hash = "d7d9c53ca6d92782284e12b923bfc109";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22%40thread.v2/participants/8%3Aacs%3A9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d519-ea7c-5a3a0d00025b')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'fnAbLunwVEevRgAmRKxXEw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '462ms',
  'X-Azure-Ref',
  '09A+zXwAAAACnPbeyUz3sT5+psKRwyRfPV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:08 GMT'
]);
