let nock = require('nock');

module.exports.testInfo = {"container":"container157005787786008085","randomstring":"randomstring157005787818307663","blob":"blob157005787818307844"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157005787786008085')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 02 Oct 2019 23:11:18 GMT',
  'ETag',
  '"0x8D7478DD4B5FC1C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'df0182b1-101e-0047-3f76-799356000000',
  'x-ms-client-request-id',
  'cf280967-d663-47d2-bbfd-234966903389',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 02 Oct 2019 23:11:17 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157005787786008085/blob157005787818307844', "randomstring157005787818307663")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'savqGPoYCJ0M2hkruOiyRQ==',
  'Last-Modified',
  'Wed, 02 Oct 2019 23:11:18 GMT',
  'ETag',
  '"0x8D7478DD4CEA533"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37fb010f-201e-005c-7276-79ad55000000',
  'x-ms-client-request-id',
  'd0182932-1f42-41c7-a549-ceb7bd4786ca',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'qm4+giRNgkY=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 02 Oct 2019 23:11:17 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157005787786008085/blob157005787818307844')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8d2dd46-e01e-001e-6276-7914d5000000',
  'x-ms-client-request-id',
  '312126e9-4649-49c9-8832-03e7037f97b5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Wed, 02 Oct 2019 23:11:17 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157005787786008085/blob157005787818307844')
  .reply(404, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80479c8a-b01e-0095-0e76-7910b8000000',
  'x-ms-client-request-id',
  'e66d7543-544b-49ba-998f-9619b1c304cf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 02 Oct 2019 23:11:17 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157005787786008085')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c6197b2f-901e-0014-4076-79b062000000',
  'x-ms-client-request-id',
  '39141bdb-c526-43d2-a12d-5b63ca35ae17',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 02 Oct 2019 23:11:17 GMT' ]);

