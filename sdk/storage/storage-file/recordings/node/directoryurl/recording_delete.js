let nock = require('nock');

module.exports.testInfo = {"share":"share156758472014906995","dir":"dir156758472059001630"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472014906995')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:00 GMT',
  'ETag',
  '"0x8D7310F8FDC33EC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3f7b10d-a01a-0033-15f8-62a828000000',
  'x-ms-client-request-id',
  '2c3f20f0-d994-467d-9385-acbe820b5974',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758472014906995/dir156758472059001630')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:00 GMT',
  'ETag',
  '"0x8D7310F901DFFF9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b488c16-801a-012b-62f8-628942000000',
  'x-ms-client-request-id',
  'd6f3035b-c42c-46f2-bd9b-72bb9fa8d4e6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:00.8370169Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:00.8370169Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:00.8370169Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:12:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758472014906995')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d320cd7-101a-015b-0df8-6230b5000000',
  'x-ms-client-request-id',
  'b4f542ef-c8a5-47ac-8f1b-f690c02011d2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:01 GMT',
  'Connection',
  'close' ]);

