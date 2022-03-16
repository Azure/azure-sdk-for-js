let nock = require('nock');

module.exports.hash = "350ce45f52731288cad4f7db93a45b60";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"777.fqdn.com":{"sipSignalingPort":5678},"888.fqdn.com":{"sipSignalingPort":5678},"44.fqdn.com":{"sipSignalingPort":4567}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'JtDQab+5wEmWlBA5aP/z5Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '361ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0OMX6YgAAAACAuX5Z/kNRQKC3k+WtdjkmUFJHMDFFREdFMDkxMQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 15 Aug 2022 22:14:16 GMT'
]);

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"777.fqdn.com":null,"888.fqdn.com":null,"44.fqdn.com":null}})
  .query(true)
  .reply(200, {"trunks":{},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'UTQt3bmkEke0LmIx+seKNA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '636ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0OcX6YgAAAAAazwCgUkZ4S7P3vYwjS1rAUFJHMDFFREdFMDkxMQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 15 Aug 2022 22:14:17 GMT'
]);

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'U7A1x7L22UCF+R8QyUqsvw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '334ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0OsX6YgAAAABcUG6ZuXA5Rqht8UbEfkDcUFJHMDFFREdFMDkxMQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 15 Aug 2022 22:14:18 GMT'
]);
