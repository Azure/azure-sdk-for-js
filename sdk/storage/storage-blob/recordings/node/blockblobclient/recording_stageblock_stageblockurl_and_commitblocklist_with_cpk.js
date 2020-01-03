let nock = require('nock');

module.exports.testInfo = {"container":"container156816839585601813","blob":"blob156816839627408646","newblockblob":"newblockblob156816839710009687"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816839585601813')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:56 GMT',
  'ETag',
  '"0x8D7365E89BF0166"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7e01172-501e-002a-4c47-6813b9000000',
  'x-ms-client-request-id',
  'e398a830-8cd5-4d4b-a92a-602f3a3681cf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:55 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816839585601813/blob156816839627408646', "HelloWorld")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:56 GMT',
  'ETag',
  '"0x8D7365E89FE3FFD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14e80344-b01e-0020-3e47-680a30000000',
  'x-ms-client-request-id',
  '955c4d12-1c27-413c-b247-a18f1b4bf2d0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:56 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816839585601813', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers/>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:57 GMT',
  'ETag',
  '"0x8D7365E8A3D4F78"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2bc13c2e-e01e-0038-1f47-6827a5000000',
  'x-ms-client-request-id',
  'e8a123fd-a561-4c81-b8fd-5d8a14d17461',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:56 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816839585601813/newblockblob156816839710009687', "Hell")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bf86d13-501e-0047-5047-68b997000000',
  'x-ms-client-request-id',
  '31e0fa0f-8d0d-4756-b003-50c80664b971',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'nuXQFtc8BqA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Wed, 11 Sep 2019 02:19:57 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816839585601813/newblockblob156816839710009687')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7e01310-501e-002a-4747-6813b9000000',
  'x-ms-client-request-id',
  'ec46a5d7-22f9-4037-949e-358fb94e3233',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'n6BouArmEbQ=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Wed, 11 Sep 2019 02:19:57 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816839585601813/newblockblob156816839710009687')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ae5451f-801e-0067-4047-68d55b000000',
  'x-ms-client-request-id',
  'f2980275-71a6-4418-9905-f1f1c7dab7b2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'sMJJw3kkP8c=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Wed, 11 Sep 2019 02:19:58 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816839585601813/newblockblob156816839710009687')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><UncommittedBlocks><Block><Name>MQ==</Name><Size>4</Size></Block><Block><Name>Mg==</Name><Size>4</Size></Block><Block><Name>Mw==</Name><Size>2</Size></Block></UncommittedBlocks></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a22bc230-401e-0035-2947-68c8a9000000',
  'x-ms-client-request-id',
  'e097d78d-901e-43fa-b5ad-4a4425d7531f',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:58 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816839585601813/newblockblob156816839710009687', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest><Latest>Mw==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:59 GMT',
  'ETag',
  '"0x8D7365E8BCFAA70"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'af56c37d-501e-0008-3247-687d8f000000',
  'x-ms-client-request-id',
  '945017f4-37da-49bb-8f3d-c9d90068573f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AviKeNGq9Po=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Wed, 11 Sep 2019 02:19:58 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816839585601813/newblockblob156816839710009687')
  .reply(200, "HelloWorld", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:59 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E8BCFAA70"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed16d665-f01e-0005-4247-689283000000',
  'x-ms-client-request-id',
  '3bc1fbb5-cac5-4dbe-a1b4-fbdeec9e8e3c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:19:59 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:59 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816839585601813')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14e80819-b01e-0020-3347-680a30000000',
  'x-ms-client-request-id',
  '34b36c87-290f-4476-97e5-a79abc4626fb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:00 GMT' ]);

