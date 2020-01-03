let nock = require('nock');

module.exports.testInfo = {"share":"share157129154611207659","dir":"dir157129154646108556","file":"file157129154682200128"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157129154611207659')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 17 Oct 2019 05:52:26 GMT',
  'ETag',
  '"0x8D752C63055A189"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1c073868-301a-0018-0daf-844b69000000',
  'x-ms-client-request-id',
  'b8bad923-e975-4087-a63f-25fc442be253',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 17 Oct 2019 05:52:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157129154611207659/dir157129154646108556')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 17 Oct 2019 05:52:26 GMT',
  'ETag',
  '"0x8D752C6308C3B0C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff76768e-b01a-002b-6eaf-841244000000',
  'x-ms-client-request-id',
  '45c2eb47-0632-4aa5-9f54-6cb33e3b22d4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-10-17T05:52:26.7713292Z',
  'x-ms-file-last-write-time',
  '2019-10-17T05:52:26.7713292Z',
  'x-ms-file-creation-time',
  '2019-10-17T05:52:26.7713292Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 17 Oct 2019 05:52:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157129154611207659/dir157129154646108556/file157129154682200128')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 17 Oct 2019 05:52:27 GMT',
  'ETag',
  '"0x8D752C630C2E549"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5cfbb44c-101a-0004-5baf-84937e000000',
  'x-ms-client-request-id',
  '6e24f4d6-56e3-45f0-a1dd-7091cd37dc53',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-10-17T05:52:27.1295817Z',
  'x-ms-file-last-write-time',
  '2019-10-17T05:52:27.1295817Z',
  'x-ms-file-creation-time',
  '2019-10-17T05:52:27.1295817Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 17 Oct 2019 05:52:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157129154611207659/dir157129154646108556/file157129154682200128')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8314fe3-d01a-0019-63af-844a94000000',
  'x-ms-client-request-id',
  'ca485201-e1b5-4ca8-bcdd-037d17ec2f13',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Thu, 17 Oct 2019 05:52:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157129154611207659')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd7733014-801a-0045-79af-84bb6d000000',
  'x-ms-client-request-id',
  '1d113c8f-2999-4874-b48a-45d0bde95c45',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 17 Oct 2019 05:52:27 GMT',
  'Connection',
  'close' ]);

