let nock = require('nock');

module.exports.hash = "9898d73f1792f47eaa7bbe2aca4c97b3";

module.exports.testInfo = {"uniqueName":{"share":"share167875881990400398","dir":"dir167875882016700782"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881990400398')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:40 GMT',
  'ETag',
  '"0x8DB242EEF2AD009"',
  'x-ms-request-id',
  '0b0de35e-701a-0008-7617-56c247000000',
  'x-ms-client-request-id',
  '8f712c3c-69e8-4902-83bb-42e40913f226',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881990400398/dir167875882016700782.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:40 GMT',
  'ETag',
  '"0x8DB242EEF53BAE5"',
  'x-ms-request-id',
  '0b0de360-701a-0008-7717-56c247000000',
  'x-ms-client-request-id',
  'c69336c9-561f-4349-a011-1a71ce162ef1',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:40.5394661Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:40.5394661Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:40.5394661Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881990400398/dir167875882016700782.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de361-701a-0008-7817-56c247000000',
  'x-ms-client-request-id',
  '79a0bfc5-a9ad-4fff-b242-f50583390599',
  'x-ms-version',
  '2022-11-02',
  'x-ms-number-of-handles-closed',
  '0',
  'x-ms-number-of-handles-failed',
  '0',
  'Date',
  'Tue, 14 Mar 2023 01:53:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875881990400398')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de362-701a-0008-7917-56c247000000',
  'x-ms-client-request-id',
  '01635bd0-2817-4efe-b24e-f70bbf41217a',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:40 GMT'
]);
