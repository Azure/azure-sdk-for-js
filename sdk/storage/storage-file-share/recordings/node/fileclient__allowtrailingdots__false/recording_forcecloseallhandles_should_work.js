let nock = require('nock');

module.exports.hash = "1350c307152e08822f9aa14d56c42293";

module.exports.testInfo = {"uniqueName":{"share":"share167747856268900603","dir":"dir167747856296302740","file":"file167747856322603331"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747856268900603')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:03 GMT',
  'ETag',
  '"0x8DB188A1A7C252C"',
  'x-ms-request-id',
  '1775ea06-e01a-0001-6072-4a1b65000000',
  'x-ms-client-request-id',
  'e12e2e84-0c25-4dc2-8f0f-37a6c35f4930',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:16:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747856268900603/dir167747856296302740....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:03 GMT',
  'ETag',
  '"0x8DB188A1AA7F89C"',
  'x-ms-request-id',
  '1775ea09-e01a-0001-6172-4a1b65000000',
  'x-ms-client-request-id',
  '2d811b34-bae6-4266-9dab-cffcdc2d4536',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:16:03.4826396Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:16:03.4826396Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:16:03.4826396Z',
  'x-ms-file-permission-key',
  '13895902193744473398*5510371786133343095',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:16:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747856268900603/dir167747856296302740..../file167747856322603331....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:16:03 GMT',
  'ETag',
  '"0x8DB188A1ACF2FD2"',
  'x-ms-request-id',
  '1775ea0a-e01a-0001-6272-4a1b65000000',
  'x-ms-client-request-id',
  'b23ee6ac-f92b-42c4-9441-c9c7b770250a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:16:03.7396434Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:16:03.7396434Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:16:03.7396434Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:16:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747856268900603/dir167747856296302740..../file167747856322603331....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775ea0b-e01a-0001-6372-4a1b65000000',
  'x-ms-client-request-id',
  '7474fabd-3e86-4eb0-8009-2db577b55e6d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-number-of-handles-closed',
  '0',
  'x-ms-number-of-handles-failed',
  '0',
  'Date',
  'Mon, 27 Feb 2023 06:16:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747856268900603')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775ea0c-e01a-0001-6472-4a1b65000000',
  'x-ms-client-request-id',
  '0699fb3e-6ee0-4919-883a-94ce55b8f9e8',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:16:04 GMT'
]);
