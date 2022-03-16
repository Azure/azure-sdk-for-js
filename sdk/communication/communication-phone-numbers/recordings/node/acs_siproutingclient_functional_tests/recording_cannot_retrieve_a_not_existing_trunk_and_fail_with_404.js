let nock = require('nock');

module.exports.hash = "ffd66c8004710e84989f702ad826916e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"777.fqdn.com":{"sipSignalingPort":5678},"888.fqdn.com":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'U7jLxrcb+Uao8P1V3J0jgw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '340ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0M8X6YgAAAADF5V5ox9GCSpMMdUklCKx4UFJHMDFFREdFMDkxMQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 15 Aug 2022 22:14:12 GMT'
]);
