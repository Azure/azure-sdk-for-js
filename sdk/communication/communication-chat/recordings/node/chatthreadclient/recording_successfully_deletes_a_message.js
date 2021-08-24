let nock = require('nock');

module.exports.hash = "1a814ddcbc4190c3adefc3fc8633ba57";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A6GWcNAPQG7ZctIOLMIvOZnlvHJo5gahbUshyKQfgCa41%40thread.v2/messages/1629767961421')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'eDyqkwCtpkS/afyw9r2I7w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '182ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GkkkYQAAAACIcCLnYLLTR5bHlffqHXmbUERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 24 Aug 2021 01:19:22 GMT'
]);
