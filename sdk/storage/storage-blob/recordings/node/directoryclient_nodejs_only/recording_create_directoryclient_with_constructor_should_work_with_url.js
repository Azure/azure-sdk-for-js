let nock = require('nock');

module.exports.testInfo = {"container":"container157113293533702552","directory":"directory157113293649801380"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113293533702552')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:44:01 GMT',
  'ETag',
  '"0x8D7515435C3511A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45465cc0-101e-0032-5a3d-831d4e000000',
  'x-ms-client-request-id',
  '1cb19160-bea2-4dc3-8703-a1f82c1b2580',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:44:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113293533702552/directory157113293649801380')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:44:02 GMT',
  'ETag',
  '"0x8D751543675528A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'deffce7f-501f-0053-743d-835991000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9d8d9138-1e6a-4e99-bceb-5b0724cc896f',
  'Date',
  'Tue, 15 Oct 2019 09:44:02 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113293533702552/directory157113293649801380')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8cff3bd2-301f-0061-663d-830141000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'cb03c711-aa71-42b8-83a7-4969fae2f773',
  'Date',
  'Tue, 15 Oct 2019 09:44:03 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113293533702552')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0113c62a-001e-0062-793d-830246000000',
  'x-ms-client-request-id',
  '21630ef6-3609-49c8-a29e-f14f53972f9a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:44:04 GMT',
  'Connection',
  'close' ]);

