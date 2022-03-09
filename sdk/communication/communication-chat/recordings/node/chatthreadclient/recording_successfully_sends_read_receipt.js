let nock = require('nock');

module.exports.hash = "1b4d74b8fdcbd80f10e063f085f851c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AGJhzTT5V5GxxOF-a6Z84_zITnb7xu-IRf-8431aqf8w1%40thread.v2/readReceipts', {"chatMessageId":"1630697238761"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'BEdU0vKpf0aVK832Ees06w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6, 2021-09-07',
  'X-Processing-Time',
  '344ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0F3cyYQAAAABS+yyvHKCZRKsJpYnxBwAaUERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 03 Sep 2021 19:27:19 GMT',
  'Content-Length',
  '0'
]);
