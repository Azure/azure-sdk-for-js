let nock = require('nock');

module.exports.testInfo = {"container":"container156776196584104704","blob":"blob156776196635709669","newblockblob":"newblockblob156776196714007788"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776196584104704')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:06 GMT',
  'ETag',
  '"0x8D732AC3E8A8E74"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0621f1e0-401e-0156-7e95-64f861000000',
  'x-ms-client-request-id',
  '838e2d3a-a083-4af5-af68-5e7bd444bd54',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776196584104704/blob156776196635709669', "HelloWorld")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:06 GMT',
  'ETag',
  '"0x8D732AC3ED9996B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e02069e-f01e-0063-7f95-646a78000000',
  'x-ms-client-request-id',
  'aa60f074-7717-496e-9161-4da5968dc98d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:26:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776196584104704', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers/>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:07 GMT',
  'ETag',
  '"0x8D732AC3F15C26A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0abc853b-b01e-002f-5c95-64fa48000000',
  'x-ms-client-request-id',
  '1d5552a5-e82d-4d27-adc3-907cd0246c7f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776196584104704/newblockblob156776196714007788', "Hell")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '943202f0-001e-0157-3995-64a7bd000000',
  'x-ms-client-request-id',
  '76507978-690a-4f37-aad0-1dd240be5c36',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'nuXQFtc8BqA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Fri, 06 Sep 2019 09:26:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776196584104704/newblockblob156776196714007788')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ad87b9e-901e-0145-1f95-64dc6d000000',
  'x-ms-client-request-id',
  '832cf885-6587-4eef-8059-124995166937',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'n6BouArmEbQ=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Fri, 06 Sep 2019 09:26:07 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776196584104704/newblockblob156776196714007788')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '003482d4-d01e-0090-3895-64cded000000',
  'x-ms-client-request-id',
  'd132c7af-495a-4b99-9451-1fc273e35685',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'sMJJw3kkP8c=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Fri, 06 Sep 2019 09:26:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776196584104704/newblockblob156776196714007788')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><UncommittedBlocks><Block><Name>MQ==</Name><Size>4</Size></Block><Block><Name>Mg==</Name><Size>4</Size></Block><Block><Name>Mw==</Name><Size>2</Size></Block></UncommittedBlocks></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '79770461-c01e-0158-4595-64d1d1000000',
  'x-ms-client-request-id',
  'ddbad3c9-773b-4a2f-9881-a6bcdb1cbede',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:26:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776196584104704/newblockblob156776196714007788', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest><Latest>Mw==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:09 GMT',
  'ETag',
  '"0x8D732AC406D6DAF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26fe7e3a-a01e-001c-6295-64a5e3000000',
  'x-ms-client-request-id',
  '8fad5d9e-9845-40d1-9d65-7670fdb95292',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AviKeNGq9Po=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Fri, 06 Sep 2019 09:26:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776196584104704/newblockblob156776196714007788')
  .reply(200, "HelloWorld", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:09 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732AC406D6DAF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3771217f-501e-0045-4495-642260000000',
  'x-ms-client-request-id',
  'f7679822-be3b-4f05-b96c-2c1790501d3f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:26:09 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:26:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776196584104704')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0d5bde68-b01e-00e4-5b95-64f91d000000',
  'x-ms-client-request-id',
  '9bdcdad9-6931-4f1c-b5e4-e139d5b69b63',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:09 GMT',
  'Connection',
  'close' ]);

