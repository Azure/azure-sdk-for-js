let nock = require('nock');

module.exports.testInfo = {"container":"container156231866350803376"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231866350803376')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:04 GMT',
  'ETag',
  '"0x8D7012A1AAC27F9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e4675c4-501e-0119-7c12-3354ab000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231866350803376')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:04 GMT',
  'ETag',
  '"0x8D7012A1AD52671"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6b1d703c-201e-009a-1112-33b253000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231866350803376')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:04 GMT',
  'ETag',
  '"0x8D7012A1AD52671"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4685fe29-601e-003c-5b12-338a4d000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-meta-key0',
  'val0',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-meta-key0,x-ms-meta-keya,x-ms-meta-keyb,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231866350803376')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '06141a79-801e-003d-5912-338bb0000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:04 GMT',
  'Connection',
  'close' ]);

