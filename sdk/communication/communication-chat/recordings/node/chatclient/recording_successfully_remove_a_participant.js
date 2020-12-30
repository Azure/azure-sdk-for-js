let nock = require('nock');

module.exports.hash = "10e23f822ab435387529ce641b780900";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2/participants/8%3Aacs%3A188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-8308-1db7-3a3a0d00437f')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '0lqZpb+DwU6GnpttCXtgrQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '480ms',
  'X-Azure-Ref',
  '0S+LsXwAAAADokxnyhkqeSYHLIzQSQOjEWVZSMzBFREdFMDMxMgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:47 GMT'
]);
