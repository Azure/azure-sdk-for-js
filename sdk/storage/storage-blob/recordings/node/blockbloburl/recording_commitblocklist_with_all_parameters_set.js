let nock = require('nock');

module.exports.testInfo = {"container":"container156231860385702200","blob":"blob156231860413005147"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860385702200')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:04 GMT',
  'ETag',
  '"0x8D70129F71E7B74"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aa4b3873-601e-00b4-7512-333294000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860385702200/blob156231860413005147', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'af8f7ff8-701e-0045-5112-33e307000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860385702200/blob156231860413005147', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '847408b6-b01e-0017-0312-33fef5000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860385702200/blob156231860413005147', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'dFAuDrRd9NVDo3Ngdh/H9g==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:05 GMT',
  'ETag',
  '"0x8D70129F79EE220"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '989f334e-801e-00fa-0f12-33f771000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231860385702200/blob156231860413005147')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><CommittedBlocks><Block><Name>MQ==</Name><Size>10</Size></Block><Block><Name>Mg==</Name><Size>10</Size></Block></CommittedBlocks></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:05 GMT',
  'ETag',
  '"0x8D70129F79EE220"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da55f56e-801e-00d3-4f12-338133000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-blob-content-length',
  '20',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-blob-content-length,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231860385702200/blob156231860413005147')
  .reply(200, ["48656c6c6f576f726c64","48656c6c6f576f726c64"], [ 'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '20',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129F79EE220"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '85ad6f28-601e-011a-4912-3357ac000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:20:05 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-meta-keya,x-ms-meta-keyb,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231860385702200')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '584e6a70-901e-0126-0112-33e377000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:05 GMT',
  'Connection',
  'close' ]);

