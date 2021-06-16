let nock = require('nock');

module.exports.hash = "5f24872081379cf3a7425479e8f94dde";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3ANNwKCiOnGlKzJ7nuaxX1DgoxzeH3_T3twQGlLsMKVIY1%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'V8OACMSFo0OcUTMtA1SM1w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '261ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '034PKYAAAAAB+kmSAfDvyQqZC+etTAIH5WVZSMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:07 GMT'
]);
