let nock = require('nock');

module.exports.testInfo = {"share":"share156767543218809168","dir":"dir156767543258206166","file":"file156767543298103595"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767543218809168')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:52 GMT',
  'ETag',
  '"0x8D731E2C472C061"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb6982e4-101a-00a0-38cb-637322000000',
  'x-ms-client-request-id',
  '4bfdf5a3-7e06-4f5b-8c00-288d6d4b5eb3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767543218809168/dir156767543258206166')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:52 GMT',
  'ETag',
  '"0x8D731E2C4AF434C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e192b429-301a-012e-65cb-635b99000000',
  'x-ms-client-request-id',
  'e68ea388-af57-4256-92c2-9ce05da064b2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:52.8404812Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:52.8404812Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:52.8404812Z',
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
  'Thu, 05 Sep 2019 09:23:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767543218809168/dir156767543258206166/file156767543298103595')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:53 GMT',
  'ETag',
  '"0x8D731E2C4EC5B24"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34a5772f-001a-0147-18cb-6362d5000000',
  'x-ms-client-request-id',
  'c4ba7c2f-f35c-48d4-bf32-25b64ebc1b79',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:53.2408612Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:53.2408612Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:53.2408612Z',
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
  'Thu, 05 Sep 2019 09:23:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767543218809168/dir156767543258206166/file156767543298103595')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a36aea3-b01a-005d-2bcb-63fd07000000',
  'x-ms-client-request-id',
  'ba4924ee-c167-46e1-a21f-57710f5f8ce2',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:23:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767543218809168')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '449190a3-301a-014c-77cb-6399be000000',
  'x-ms-client-request-id',
  '2617772a-20be-48e0-a95e-9fdbaa3d27f7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:53 GMT',
  'Connection',
  'close' ]);

