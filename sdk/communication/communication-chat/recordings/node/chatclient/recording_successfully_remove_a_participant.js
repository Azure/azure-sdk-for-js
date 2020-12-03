let nock = require('nock');

module.exports.hash = "3b167aa11c9a71d3eaf96a152e30f002";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127%40thread.v2/participants/8%3Aacs%3A9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a9fd-8a72-5a3a0d0000b0')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'ldUdmZhUR0KfJOau1dy57Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '425ms',
  'X-Azure-Ref',
  '0P2nIXwAAAABkEB5e+YuhS4lwj/Kh02X7WVZSMzBFREdFMDQwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:43 GMT'
]);
