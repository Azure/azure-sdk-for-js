let nock = require('nock');

module.exports.testInfo = {"container":"container156711962955101904"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711962955101904')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 23:00:29 GMT',
  'ETag',
  '"0x8D72CD4B0402DC5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f884008-501e-0072-12bd-5e0baf000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 23:00:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156711962955101904/')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 23:00:29 GMT',
  'ETag',
  '"0x8D72CD4B0402DC5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5ded8046-301e-0087-5fbd-5e2fbe000000',
  'x-ms-version',
  '2018-11-09',
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
  'Thu, 29 Aug 2019 23:00:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156711962955101904')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '224394ea-701e-006e-06bd-5ed3b8000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 23:00:29 GMT',
  'Connection',
  'close' ]);

