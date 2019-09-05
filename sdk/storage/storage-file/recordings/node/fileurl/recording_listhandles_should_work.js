let nock = require('nock');

module.exports.testInfo = {"share":"share156767542806703354","dir":"dir156767542846804971","file":"file156767542886800137"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767542806703354')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:48 GMT',
  'ETag',
  '"0x8D731E2C1FF097C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '131dedb4-d01a-0006-40cb-63c43c000000',
  'x-ms-client-request-id',
  '8e4cbb98-9688-4d84-9353-3ec1418fb310',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767542806703354/dir156767542846804971')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:48 GMT',
  'ETag',
  '"0x8D731E2C23BAF2C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86121f60-f01a-00ca-6fcb-63ab0a000000',
  'x-ms-client-request-id',
  '2694315c-2592-48df-a545-3498f3596dd7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:48.7275820Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:48.7275820Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:48.7275820Z',
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
  'Thu, 05 Sep 2019 09:23:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767542806703354/dir156767542846804971/file156767542886800137')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:49 GMT',
  'ETag',
  '"0x8D731E2C2798A7E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f46f078-f01a-00a8-75cb-63692d000000',
  'x-ms-client-request-id',
  '1f44a511-73af-4496-b14d-5ef27e98d6f3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:49.1329662Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:49.1329662Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:49.1329662Z',
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
  'Thu, 05 Sep 2019 09:23:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767542806703354/dir156767542846804971/file156767542886800137')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70ccc5e6-001a-011a-08cb-636851000000',
  'x-ms-client-request-id',
  '0a680aec-fe52-4fe3-9026-94c9fefc1546',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:23:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767542806703354')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c246ccf-701a-0042-6fcb-634e03000000',
  'x-ms-client-request-id',
  'db599554-adf4-4d0c-acf1-c5e50777b139',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:49 GMT',
  'Connection',
  'close' ]);

