let nock = require('nock');

module.exports.testInfo = {"container":"container156231859717908645","blob":"blob156231859745105355","newblockblob":"newblockblob156231859799201465"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859717908645')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:58 GMT',
  'ETag',
  '"0x8D70129F3233194"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '46b38ed8-601e-00fb-7612-33f68c000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859717908645/blob156231859745105355', "HelloWorld")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:58 GMT',
  'ETag',
  '"0x8D70129F34D593D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5e41144-e01e-00c8-3412-33afa1000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:19:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859717908645', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers/>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:58 GMT',
  'ETag',
  '"0x8D70129F376422C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3de5087c-b01e-0071-5a12-334caf000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859717908645/newblockblob156231859799201465')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f45de7fa-501e-00b7-4f12-333193000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:19:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231859717908645/newblockblob156231859799201465')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><UncommittedBlocks><Block><Name>MQ==</Name><Size>10</Size></Block></UncommittedBlocks></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be0e14c2-101e-00ff-4512-33030e000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:19:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231859717908645')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f61ae0ed-101e-00dd-7812-336d38000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:59 GMT',
  'Connection',
  'close' ]);

