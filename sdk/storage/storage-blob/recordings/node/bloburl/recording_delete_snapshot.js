let nock = require('nock');

module.exports.testInfo = {"container":"container156231858111703112","blob":"blob156231858138701450"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231858111703112')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:42 GMT',
  'ETag',
  '"0x8D70129E990536B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '026650cc-c01e-0090-1812-33abda000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231858111703112/blob156231858138701450', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:42 GMT',
  'ETag',
  '"0x8D70129E9B9794D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0b6fe3b-201e-0019-1212-3312fe000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:19:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231858111703112/blob156231858138701450')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:42 GMT',
  'ETag',
  '"0x8D70129E9B9794D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bd7be54-101e-013c-4312-33cc18000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-snapshot',
  '2019-07-05T09:19:42.5439921Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:19:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156231858111703112/blob156231858138701450')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D70129E9B9794D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3257c810-f01e-00dc-6d12-336cc5000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-snapshot',
  '2019-07-05T09:19:42.5439921Z',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:19:42 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-snapshot,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:19:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231858111703112/blob156231858138701450')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '39d00b08-701e-00e4-2c12-332d9c000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:19:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231858111703112/blob156231858138701450')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5f67a8f-001e-010a-0b12-33614a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:19:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231858111703112')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156231858111703112\"><Blobs /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ce4c47f4-701e-00a0-1b12-33f1f0000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:19:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231858111703112')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec77826b-201e-00b3-6812-33c411000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:43 GMT',
  'Connection',
  'close' ]);

