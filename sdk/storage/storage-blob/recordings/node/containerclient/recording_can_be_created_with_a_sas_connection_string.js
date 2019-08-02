let nock = require('nock');

module.exports.testInfo = {"container":"container156464897233003891"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156464897233003891')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 01 Aug 2019 08:42:52 GMT',
  'ETag',
  '"0x8D7165C3DCBCB45"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9944b8e3-601e-0053-5645-48669e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:42:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156464897233003891')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 01 Aug 2019 08:42:52 GMT',
  'ETag',
  '"0x8D7165C3DCBCB45"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fa6f6a2-301e-00ae-1145-4859fc000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 01 Aug 2019 08:42:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156464897233003891')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc007f40-601e-00bd-3a45-486c1d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:42:52 GMT',
  'Connection',
  'close' ]);

