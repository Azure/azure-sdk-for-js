let nock = require('nock');

module.exports.testInfo = {"container":"container156776193643701297","blob":"blob156776193683006998"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776193643701297')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:36 GMT',
  'ETag',
  '"0x8D732AC2D04285E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cd15ba50-701e-014d-5295-64c662000000',
  'x-ms-client-request-id',
  '356919dc-d3d6-453f-909c-a9944dde350a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776193643701297/blob156776193683006998', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:37 GMT',
  'ETag',
  '"0x8D732AC2D410877"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e2fcb275-901e-0137-7595-64db22000000',
  'x-ms-client-request-id',
  '903b2cac-2cae-4d67-b230-490d4e35da5e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:25:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776193643701297/blob156776193683006998')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c6b0d79e-701e-015d-5095-64030a000000',
  'x-ms-client-request-id',
  'eb1ef4cb-dc42-4b91-8c53-3c32e51c54d5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156776193643701297/blob156776193683006998')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:37 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732AC2D410877"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '806e11cc-301e-0101-0695-645652000000',
  'x-ms-client-request-id',
  'aee7b1f6-2556-4b4f-a245-6fba49353be1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:25:37 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-change-time',
  'Fri, 06 Sep 2019 09:25:37 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:25:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776193643701297')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '514b40c9-201e-0122-4c95-64cc91000000',
  'x-ms-client-request-id',
  '579e35dc-ddff-4866-9997-25a21f0ca95f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:37 GMT',
  'Connection',
  'close' ]);

