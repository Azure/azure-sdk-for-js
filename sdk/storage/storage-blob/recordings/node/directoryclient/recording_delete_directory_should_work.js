let nock = require('nock');

module.exports.testInfo = {"container":"container157113268712103832","directory":"directory157113268826805792","directory_delete":"directory_delete157113268826903500"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113268712103832')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:39:53 GMT',
  'ETag',
  '"0x8D75153A1CEE316"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfaa01b1-101e-0076-5e3c-83c122000000',
  'x-ms-client-request-id',
  'd310745f-13b1-4b2e-9233-e38843c56a42',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:39:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113268712103832/directory157113268826805792/directory_delete157113268826903500')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:39:54 GMT',
  'ETag',
  '"0x8D75153A27FB7BB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cf803f6-401f-006e-4d3c-83ecb7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f9c26aa8-c465-494c-9e39-568d8cad1641',
  'Date',
  'Tue, 15 Oct 2019 09:39:54 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113268712103832/directory157113268826805792/directory_delete157113268826903500')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00af0586-601f-0014-543c-8386fa000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4e338766-4c14-41de-a21f-b1d0c742bc51',
  'Date',
  'Tue, 15 Oct 2019 09:39:55 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113268712103832')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '15d2ac92-601e-005b-713c-8342e2000000',
  'x-ms-client-request-id',
  '5415167d-7c09-4f65-9cca-8d447ef406b6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:39:56 GMT',
  'Connection',
  'close' ]);

