let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-06T07:02:04.396Z","share":"share156775332439601677","dir":"dir156775332482002363","file":"file156775332522703676"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775332439601677')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:02:04 GMT',
  'ETag',
  '"0x8D732981FD7A598"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cfbbc65f-501a-014a-2880-64aa01000000',
  'x-ms-client-request-id',
  'b8ad3ddf-8418-45d4-863c-9b7b533fa981',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:02:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775332439601677/dir156775332482002363')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:02:05 GMT',
  'ETag',
  '"0x8D732982016BE3F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8f532c82-e01a-000d-1f80-643f57000000',
  'x-ms-client-request-id',
  'dd8ee6fc-da0c-4636-a70b-86af7cb5dee7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:02:05.0993727Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:02:05.0993727Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:02:05.0993727Z',
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
  'Fri, 06 Sep 2019 07:02:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775332439601677/dir156775332482002363/file156775332522703676')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:02:05 GMT',
  'ETag',
  '"0x8D73298205387DA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e789249-c01a-0057-5a80-6459b0000000',
  'x-ms-client-request-id',
  '65b7ce3d-4509-471c-89a2-5aa350f7aa2e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:02:05.4977498Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:02:05.4977498Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:02:05.4977498Z',
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
  'Fri, 06 Sep 2019 07:02:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775332439601677', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-09-06T06:57:04.3960000Z</Start><Expiry>2019-09-07T07:02:04.3960000Z</Expiry><Permission>rcwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:02:05 GMT',
  'ETag',
  '"0x8D73298209A8CA5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '312c87a9-f01a-00da-6d80-646e62000000',
  'x-ms-client-request-id',
  'e1192196-01d9-4ea8-834c-c77fed3e5cf4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:02:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775332439601677/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156775332439601677\" DirectoryPath=\"\"><Entries><Directory><Name>dir156775332482002363</Name><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c04c5a4-101a-0044-3e80-647dbc000000',
  'x-ms-client-request-id',
  '90c86b22-cd53-4450-9a68-ba253185ab23',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:02:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775332439601677')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '190fffe6-e01a-014f-7880-6478da000000',
  'x-ms-client-request-id',
  '63739686-04e1-45c8-82f4-ee0a721c75b9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:02:05 GMT',
  'Connection',
  'close' ]);

