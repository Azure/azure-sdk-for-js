let nock = require('nock');

module.exports.testInfo = {"container":"container156929859498303117","directory":"directory156929859617507290"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929859498303117')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:12:13 GMT',
  'ETag',
  '"0x8D740A560AF47F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e7785a3-401e-0065-4b8e-72f4c3000000',
  'x-ms-client-request-id',
  'a4f94dce-22a2-4135-b98a-3ac3e6d1759e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:12 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929859498303117/directory156929859617507290')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:14 GMT',
  'ETag',
  '"0x8D740A5616024A5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '015ce556-001f-0026-3c8e-72de2a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '5fd9aca8-af98-414a-9e0e-32dd5d9eb181',
  'Date',
  'Tue, 24 Sep 2019 04:12:14 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929859498303117/directory156929859617507290')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '30198183-701f-0088-5d8e-72fd47000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '2bd73d63-f978-4c38-ad15-305d7623e3c6',
  'Date',
  'Tue, 24 Sep 2019 04:12:14 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929859498303117')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a5ccfc6-b01e-009e-778e-723cd9000000',
  'x-ms-client-request-id',
  '13e08c4c-1cdf-4c5f-a091-0e8d446a43d0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:16 GMT' ]);
