let nock = require('nock');

module.exports.testInfo = {"container":"container156231859894503377","blob":"blob156231859921407505","newblockblob":"newblockblob156231859976308086"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859894503377')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:59 GMT',
  'ETag',
  '"0x8D70129F430969E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '155ac440-301e-0085-2c12-336943000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859894503377/blob156231859921407505', "HelloWorld")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:00 GMT',
  'ETag',
  '"0x8D70129F45A6717"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '97450b66-c01e-00b9-2c12-33dd98000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:19:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859894503377', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers/>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:00 GMT',
  'ETag',
  '"0x8D70129F4848803"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddc6e851-701e-004e-7012-33fb73000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859894503377/newblockblob156231859976308086')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'GCTo4DB8v90Zk1EasEAHXA==',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eeb6bc7d-501e-0016-5012-33ff08000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:19:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859894503377/newblockblob156231859976308086')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'K6r/BQlnE9XQ+/wI1bNxNQ==',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cd633206-101e-0011-1f12-33098d000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859894503377/newblockblob156231859976308086')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'lGSQrQ/cF7O4mXYKRFEo8A==',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '776c8c27-101e-00f4-5a12-331b7a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231859894503377/newblockblob156231859976308086')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><UncommittedBlocks><Block><Name>MQ==</Name><Size>4</Size></Block><Block><Name>Mg==</Name><Size>4</Size></Block><Block><Name>Mw==</Name><Size>2</Size></Block></UncommittedBlocks></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43d372d3-201e-00de-2312-336e3f000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231859894503377/newblockblob156231859976308086', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest><Latest>Mw==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'mIrrBfaRkeYI2Jey2fQPeg==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:02 GMT',
  'ETag',
  '"0x8D70129F59DF85D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f705f7f-901e-010f-1912-339535000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231859894503377/newblockblob156231859976308086')
  .reply(200, "HelloWorld", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:02 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129F59DF85D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8d0d55c5-a01e-0047-6212-33e1fd000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:20:02 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231859894503377')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d3eaaf9-501e-0052-2412-332364000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:02 GMT',
  'Connection',
  'close' ]);

