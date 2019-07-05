let nock = require('nock');

module.exports.testInfo = {"container":"container156231863245404388"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231863245404388')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:33 GMT',
  'ETag',
  '"0x8D7012A0829DE64"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31ff9706-d01e-0103-1512-337bc4000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231863245404388')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:33 GMT',
  'ETag',
  '"0x8D7012A0829DE64"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91b37657-c01e-0135-2e12-33d696000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 05 Jul 2019 09:20:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231863245404388')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:33 GMT',
  'ETag',
  '"0x8D7012A0829DE64"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '30e9dde6-301e-00ca-6a12-33ad5b000000',
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
  'Fri, 05 Jul 2019 09:20:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231863245404388')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:33 GMT',
  'ETag',
  '"0x8D7012A0829DE64"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '55c5ae97-401e-00a8-1e12-33ea83000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-lease-id',
  '3c7e72eb-b430-4526-bc53-d8ecef03798f',
  'Date',
  'Fri, 05 Jul 2019 09:20:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231863245404388')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:33 GMT',
  'ETag',
  '"0x8D7012A0829DE64"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a229f39-701e-0105-5d12-338cbc000000',
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
  'Fri, 05 Jul 2019 09:20:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231863245404388')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:33 GMT',
  'ETag',
  '"0x8D7012A0829DE64"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6171a003-101e-0115-2412-33ba5a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231863245404388')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cd637ba4-101e-0011-6b12-33098d000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:34 GMT',
  'Connection',
  'close' ]);

