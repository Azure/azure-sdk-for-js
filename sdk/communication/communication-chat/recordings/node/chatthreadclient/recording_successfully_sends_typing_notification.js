let nock = require('nock');

module.exports.hash = "10dd04e171c2258c64ce665e70a9383f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3An_H9uIjLqmROnaakf1aaclqRHTM7sclYSTv4_q_g7E41%40thread.v2/typing', {})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'JPGB+bDPyUaBNIfJUMzVkw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '133ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Wcn5YQAAAAA52pXaqu4TSpicJKOWJChnUERYMzFFREdFMDIxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:59:21 GMT',
  'Content-Length',
  '0'
]);
