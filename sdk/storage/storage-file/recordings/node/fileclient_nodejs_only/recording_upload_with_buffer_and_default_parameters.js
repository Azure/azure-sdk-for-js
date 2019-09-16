let nock = require('nock');

module.exports.testInfo = {"share":"share156816850786905481","dir":"dir156816850829205106","file":"file156816850871905607","randomstring":"randomstring156816850872009432"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816850786905481')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:48 GMT',
  'ETag',
  '"0x8D7365ECC83CE36"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c659ba64-401a-0053-5547-687af3000000',
  'x-ms-client-request-id',
  '44b6f0f2-4c62-49b8-85c9-560bc2b25556',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:47 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816850786905481/dir156816850829205106')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:48 GMT',
  'ETag',
  '"0x8D7365ECCC19AAD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5668415d-c01a-0060-7e47-6823de000000',
  'x-ms-client-request-id',
  'a104b91f-aeed-4cee-bba8-b38ebbba81ae',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:48.6280365Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:48.6280365Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:48.6280365Z',
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
  'Wed, 11 Sep 2019 02:21:48 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816850786905481/dir156816850829205106/file156816850871905607')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:49 GMT',
  'ETag',
  '"0x8D7365ECD0406FA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf467a36-501a-0047-3647-68b997000000',
  'x-ms-client-request-id',
  'c57a8d44-7145-4b7f-b027-2b0d02c5f5a3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:49.0633466Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:49.0633466Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:49.0633466Z',
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
  'Wed, 11 Sep 2019 02:21:48 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816850786905481/dir156816850829205106/file156816850871905607', "randomstring156816850872009432")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'A16/4gWBKiHT3M5cUkMcWQ==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:49 GMT',
  'ETag',
  '"0x8D7365ECD4AE0E3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45067147-f01a-004a-6a47-68569b000000',
  'x-ms-client-request-id',
  '2e6359da-2408-4e30-a1ee-08fde72f65f6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:21:49 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816850786905481/dir156816850829205106/file156816850871905607')
  .reply(200, "randomstring156816850872009432", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:49 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365ECD4AE0E3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56684160-c01a-0060-7f47-6823de000000',
  'x-ms-client-request-id',
  '3232c65a-9517-4844-8c58-0e40f81d0866',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:21:49.0633466Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:49.0633466Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:49.0633466Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:49 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816850786905481')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4506714b-f01a-004a-6b47-68569b000000',
  'x-ms-client-request-id',
  '40c653d2-05f1-4deb-a3c7-c8170bc69821',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:50 GMT' ]);

