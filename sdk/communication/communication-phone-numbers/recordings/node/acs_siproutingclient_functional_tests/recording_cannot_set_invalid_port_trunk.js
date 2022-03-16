let nock = require('nock');

module.exports.hash = "c1c80cfe49347e95d7ed52a92265f9a3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'duEND55G6kK6go9YA1LvtQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '535ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0qeH8YgAAAAC56XbAuKpHQLqsa4umfW3xUFJHMDFFREdFMDkyMQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 17 Aug 2022 12:40:10 GMT'
]);
