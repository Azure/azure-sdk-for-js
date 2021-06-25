let nock = require('nock');

module.exports.hash = "5f24872081379cf3a7425479e8f94dde";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3AS6rsC6flduxpFtSV2TaFwiS99mKWwhg5608zV5bO0-o1%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '6Z1zjleAN0+B0QN0TxKSLA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '335ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04MbHYAAAAAC3tznKaCjMTbSJYs5TKRX7UERYMzFFREdFMDIyMAA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:11 GMT'
]);
