let nock = require('nock');

module.exports.testInfo = {"container":"container157113272134109435","directory":"directory157113272250607133"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113272134109435')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:40:27 GMT',
  'ETag',
  '"0x8D75153B63694F2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c3465cd-c01e-00b3-173c-83bf19000000',
  'x-ms-client-request-id',
  '2ea76b43-7769-4329-964d-303f86d0eb20',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113272134109435/directory157113272250607133')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:28 GMT',
  'ETag',
  '"0x8D75153B6E85CE0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd493d2e1-301f-0084-2e3c-8313b6000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f72d3061-a045-4d5c-9243-428bd9ab7af4',
  'Date',
  'Tue, 15 Oct 2019 09:40:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113272134109435')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '011152f7-001e-0062-143c-830246000000',
  'x-ms-client-request-id',
  'a42f2258-3f5c-4c78-b0c5-da36197c06d1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:29 GMT',
  'Connection',
  'close' ]);

