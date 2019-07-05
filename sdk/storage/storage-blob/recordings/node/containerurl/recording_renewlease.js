let nock = require('nock');

module.exports.testInfo = {"container":"container156231861428106426"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231861428106426')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:15 GMT',
  'ETag',
  '"0x8D70129FD5545D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '617172ac-101e-0115-4112-33ba5a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231861428106426')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:15 GMT',
  'ETag',
  '"0x8D70129FD5545D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9eba4eb6-a01e-0125-4c12-33e070000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 05 Jul 2019 09:20:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231861428106426')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:15 GMT',
  'ETag',
  '"0x8D70129FD5545D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da0f9360-601e-00d2-4c12-3380ce000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231861428106426')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:15 GMT',
  'ETag',
  '"0x8D70129FD5545D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '845e91a6-701e-00ef-5012-3335e8000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'expired',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231861428106426')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:15 GMT',
  'ETag',
  '"0x8D70129FD5545D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c12c8fa9-901e-0083-0f12-339e3b000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 05 Jul 2019 09:20:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231861428106426')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:15 GMT',
  'ETag',
  '"0x8D70129FD5545D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ca7e5ebd-a01e-006e-1412-3397bf000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231861428106426')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:15 GMT',
  'ETag',
  '"0x8D70129FD5545D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a094066e-a01e-010c-3d12-339632000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231861428106426')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd2e1bb06-101e-00d6-0512-33754c000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:32 GMT',
  'Connection',
  'close' ]);

