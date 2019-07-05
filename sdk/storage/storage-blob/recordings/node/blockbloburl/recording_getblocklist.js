let nock = require('nock');

module.exports.testInfo = {"container":"container156231860579705624","blob":"blob156231860606503162"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860579705624')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:06 GMT',
  'ETag',
  '"0x8D70129F845A8FA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8d160010-701e-012c-3f12-33fafe000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860579705624/blob156231860606503162', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8135e2c7-001e-0063-2012-3378b3000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860579705624/blob156231860606503162', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fef7feb-e01e-0087-2812-336bb9000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860579705624/blob156231860606503162', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'J7SxPNqjL6/aXqADHyKYzA==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:07 GMT',
  'ETag',
  '"0x8D70129F8C2898D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5f6aba6-001e-010a-1c12-33614a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231860579705624/blob156231860606503162')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><CommittedBlocks><Block><Name>Mg==</Name><Size>10</Size></Block></CommittedBlocks><UncommittedBlocks /></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:07 GMT',
  'ETag',
  '"0x8D70129F8C2898D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eccf3722-301e-0102-1a12-337a39000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-blob-content-length',
  '10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-blob-content-length,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231860579705624')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86acf2fa-401e-0020-1d12-33525a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:07 GMT',
  'Connection',
  'close' ]);

