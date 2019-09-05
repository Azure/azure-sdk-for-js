let nock = require('nock');

module.exports.testInfo = {"share":"share156767543012400445","dir":"dir156767543056306466","file":"file156767543096009194"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767543012400445')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:50 GMT',
  'ETag',
  '"0x8D731E2C33BF8A7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '733349ed-701a-00c4-13cb-6382ba000000',
  'x-ms-client-request-id',
  '9793061d-8ae3-4c75-9984-a8cb99bc02f7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767543012400445/dir156767543056306466')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:50 GMT',
  'ETag',
  '"0x8D731E2C37B3374"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1352c89f-101a-0009-74cb-63b250000000',
  'x-ms-client-request-id',
  '009cc6b0-3867-483f-940f-e831ffad634a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:50.8215668Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:50.8215668Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:50.8215668Z',
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
  'Thu, 05 Sep 2019 09:23:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767543012400445/dir156767543056306466/file156767543096009194')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:51 GMT',
  'ETag',
  '"0x8D731E2C3B8242F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26068b70-101a-0139-0dcb-63f292000000',
  'x-ms-client-request-id',
  '79c97e8f-b9b7-4229-9132-a9a47d27e26e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:51.2209455Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:51.2209455Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:51.2209455Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:23:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767543012400445/dir156767543056306466/file156767543096009194')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74a09f99-101a-00fd-58cb-6379a6000000',
  'x-ms-client-request-id',
  '4bc332f0-9455-4910-a6d7-79148c777fc7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Thu, 05 Sep 2019 09:23:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767543012400445')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd32cb570-f01a-00b8-5acb-63ac45000000',
  'x-ms-client-request-id',
  'b12cfdad-fce8-40ed-a6be-41c061336782',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:51 GMT',
  'Connection',
  'close' ]);

