let nock = require('nock');

module.exports.testInfo = {"container":"container156231860218608940","blob":"blob156231860245601199"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860218608940')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:03 GMT',
  'ETag',
  '"0x8D70129F61F0B71"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd16369c7-701e-006c-0612-339545000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860218608940/blob156231860245601199', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8aad05d8-801e-0079-3a12-3357dc000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860218608940/blob156231860245601199', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'aOEJ8PQMpyoV4FzCJ4b45g==',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da55f325-801e-00d3-4612-338133000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231860218608940/blob156231860245601199', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'dFAuDrRd9NVDo3Ngdh/H9g==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:03 GMT',
  'ETag',
  '"0x8D70129F69FE0AB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e4b3367-001e-0005-6312-33cae9000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:20:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231860218608940/blob156231860245601199')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><CommittedBlocks><Block><Name>MQ==</Name><Size>10</Size></Block><Block><Name>Mg==</Name><Size>10</Size></Block></CommittedBlocks></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:03 GMT',
  'ETag',
  '"0x8D70129F69FE0AB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2a81bd24-901e-00e5-2f12-332c61000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-blob-content-length',
  '20',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-blob-content-length,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:20:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231860218608940')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3473a6c7-901e-00aa-7612-33e879000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:04 GMT',
  'Connection',
  'close' ]);

