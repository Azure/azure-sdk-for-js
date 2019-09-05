let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-05T09:25:14.583Z","share":"share156767551458303274","dir":"dir156767551501804897","file":"file156767551541108920"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767551458303274')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:25:14 GMT',
  'ETag',
  '"0x8D731E2F593A069"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f080a62-a01a-0103-07cb-63e8ea000000',
  'x-ms-client-request-id',
  'b6db922a-2074-4ced-a3a4-e2e2290835a3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:25:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767551458303274/dir156767551501804897')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:25:15 GMT',
  'ETag',
  '"0x8D731E2F5D1687E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '993cfa40-e01a-0022-5bcb-63329c000000',
  'x-ms-client-request-id',
  'c14d6fd4-875e-49a1-9680-79b37927fc61',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:25:15.2726142Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:25:15.2726142Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:25:15.2726142Z',
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
  'Thu, 05 Sep 2019 09:25:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767551458303274/dir156767551501804897/file156767551541108920')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:25:15 GMT',
  'ETag',
  '"0x8D731E2F60DE3E6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f46f107-f01a-00a8-2acb-63692d000000',
  'x-ms-client-request-id',
  '4341d874-4535-47cc-9a07-1fec2b4f6263',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:25:15.6689894Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:25:15.6689894Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:25:15.6689894Z',
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
  'Thu, 05 Sep 2019 09:25:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767551458303274', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-09-05T09:20:14.5830000Z</Start><Expiry>2019-09-06T09:25:14.5830000Z</Expiry><Permission>rcwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:25:16 GMT',
  'ETag',
  '"0x8D731E2F6552069"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd32cb5d8-f01a-00b8-71cb-63ac45000000',
  'x-ms-client-request-id',
  'cf10c639-13c1-4c24-8c54-e709f1c02525',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:25:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767551458303274/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156767551458303274\" DirectoryPath=\"\"><Entries><Directory><Name>dir156767551501804897</Name><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '134d59c6-401a-00cf-3ccb-6379d1000000',
  'x-ms-client-request-id',
  '737127b1-f7aa-496e-b8d1-54af770e762d',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:25:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767551458303274')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2ca14d4-e01a-013d-4acb-637f95000000',
  'x-ms-client-request-id',
  'b989f617-7026-49c5-a646-dea0ddf7bda0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:25:16 GMT',
  'Connection',
  'close' ]);

