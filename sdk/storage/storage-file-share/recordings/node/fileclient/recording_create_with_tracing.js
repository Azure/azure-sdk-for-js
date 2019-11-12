let nock = require('nock');

module.exports.testInfo = {"share":"share157008711292300407","dir":"dir157008711443400651","file":"file157008711460400420"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157008711292300407')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 03 Oct 2019 07:18:33 GMT',
  'ETag',
  '"0x8D747D1E67B202A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'baf6ae35-001a-00af-44ba-790ac0000000',
  'x-ms-client-request-id',
  '93f3a4b8-4cfa-4dbc-acfd-6ce2a8285055',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 03 Oct 2019 07:18:33 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157008711292300407/dir157008711443400651')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 03 Oct 2019 07:18:34 GMT',
  'ETag',
  '"0x8D747D1E6C4C85F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0cadeebf-b01a-0003-1eba-791969000000',
  'x-ms-client-request-id',
  '1d524f55-5945-426b-93bb-358978e4ed18',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-10-03T07:18:34.1607519Z',
  'x-ms-file-last-write-time',
  '2019-10-03T07:18:34.1607519Z',
  'x-ms-file-creation-time',
  '2019-10-03T07:18:34.1607519Z',
  'x-ms-file-permission-key',
  '10601938801812273194*18156966929047809955',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 03 Oct 2019 07:18:33 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157008711292300407/dir157008711443400651/file157008711460400420')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 03 Oct 2019 07:18:34 GMT',
  'ETag',
  '"0x8D747D1E6E59CAF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70244f5e-201a-005c-04ba-79ad55000000',
  'x-ms-client-request-id',
  '47cbf030-bc63-49b9-8f68-b305f1e9be2b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-10-03T07:18:34.3759023Z',
  'x-ms-file-last-write-time',
  '2019-10-03T07:18:34.3759023Z',
  'x-ms-file-creation-time',
  '2019-10-03T07:18:34.3759023Z',
  'x-ms-file-permission-key',
  '6006229023213291309*18156966929047809955',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 03 Oct 2019 07:18:34 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157008711292300407')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7b727e17-201a-0001-2eba-79a7d1000000',
  'x-ms-client-request-id',
  'd9695e82-fa75-4feb-bfe4-9492b5e130b2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 03 Oct 2019 07:18:34 GMT' ]);

