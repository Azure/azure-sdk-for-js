let nock = require('nock');

module.exports.testInfo = {"container":"container156231861284301594"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231861284301594')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:13 GMT',
  'ETag',
  '"0x8D70129FC7926A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ac696a7-801e-00b5-6f12-333369000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231861284301594')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:13 GMT',
  'ETag',
  '"0x8D70129FC7926A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd84d998a-b01e-00f9-7512-33f476000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 05 Jul 2019 09:20:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231861284301594')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:13 GMT',
  'ETag',
  '"0x8D70129FC7926A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e4b5959-001e-0005-2b12-33cae9000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231861284301594')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:13 GMT',
  'ETag',
  '"0x8D70129FC7926A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cd4ce66c-201e-007f-2512-33a0a4000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231861284301594')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7f170-401e-00ce-2012-3358d9000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:14 GMT',
  'Connection',
  'close' ]);

