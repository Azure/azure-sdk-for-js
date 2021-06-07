let nock = require('nock');

module.exports.hash = "e51bac69f00a983af97a432032dbf341";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Accmd51185skzyzMBCnT8VLrapOfYFlFnAa0F1kztzbs1%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'gjSfUOTO4UG6PypUI3I1Ig.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '290ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00suaYAAAAADxjFPE2PVKRKKvJK4CDVxXV1NURURHRTA4MTQANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:18 GMT'
]);
