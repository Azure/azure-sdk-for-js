let nock = require('nock');

module.exports.testInfo = {"container":"container157049332364700263"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157049332364700263')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 08 Oct 2019 00:08:44 GMT',
  'ETag',
  '"0x8D74B83AED1C2B2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '897c39db-b01e-0064-736c-7dd65c000000',
  'x-ms-client-request-id',
  '578186d4-2308-4ce0-b198-7b8f4d7db6ad',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 00:08:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157049332364700263')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 08 Oct 2019 00:08:44 GMT',
  'ETag',
  '"0x8D74B83AED1C2B2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7dd3b154-601e-0029-6e6c-7d10be000000',
  'x-ms-client-request-id',
  '00d3c934-a964-4a36-b656-1f2d6264c351',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Oct 2019 00:08:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157049332364700263')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a01128f6-301e-0031-656c-7d3d2b000000',
  'x-ms-client-request-id',
  '7f4933f6-3ae8-457a-a6d5-590c072ce7ed',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 00:08:44 GMT',
  'Connection',
  'close' ]);

