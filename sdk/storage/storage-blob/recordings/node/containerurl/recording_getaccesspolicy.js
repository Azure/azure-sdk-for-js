let nock = require('nock');

module.exports.testInfo = {"container":"container156231870345407806"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231870345407806')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:44 GMT',
  'ETag',
  '"0x8D7012A327BA98A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b402fec-f01e-0098-4013-33b0a9000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231870345407806')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers />", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:44 GMT',
  'ETag',
  '"0x8D7012A327BA98A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b40308b-f01e-0098-4a13-33b0a9000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231870345407806')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80cbe238-e01e-00e1-5c13-33d9e3000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:44 GMT',
  'Connection',
  'close' ]);

