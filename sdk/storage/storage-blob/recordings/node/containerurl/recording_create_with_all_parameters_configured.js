let nock = require('nock');

module.exports.testInfo = {"container":"container156058652885007879","container156058652885007879":"container156058652885007879156058652963306014"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058652885007879')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:15:28 GMT',
  'ETag',
  '"0x8D6F169A0A3EED7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bb93134d-901e-0081-6b52-23d8c6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:15:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156058652885007879156058652963306014')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:15:30 GMT',
  'ETag',
  '"0x8D6F169A170B5E6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '642bc080-b01e-0015-5a52-23b808000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:15:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156058652885007879156058652963306014')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 15 Jun 2019 08:15:30 GMT',
  'ETag',
  '"0x8D6F169A170B5E6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a942a5c-801e-009e-7952-2303d6000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-meta-key',
  'value',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-blob-public-access',
  'container',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-meta-key,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-blob-public-access,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 15 Jun 2019 08:15:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156058652885007879')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '15aad2a3-b01e-0073-5052-230a52000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 15 Jun 2019 08:15:33 GMT',
  'Connection',
  'close' ]);

