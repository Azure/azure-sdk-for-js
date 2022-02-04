let nock = require('nock');

module.exports.hash = "1b4d74b8fdcbd80f10e063f085f851c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3An_H9uIjLqmROnaakf1aaclqRHTM7sclYSTv4_q_g7E41%40thread.v2/readReceipts', {"chatMessageId":"1643759961771"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'tWP32CcBk0KyatT2uyJ2cw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '126ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Wsn5YQAAAAArI0yfUqUpRZqo3Vc++qBYUERYMzFFREdFMDIxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:59:21 GMT',
  'Content-Length',
  '0'
]);
