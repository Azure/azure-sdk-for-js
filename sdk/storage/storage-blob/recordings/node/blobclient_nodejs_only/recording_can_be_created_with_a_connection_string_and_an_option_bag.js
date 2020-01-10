let nock = require('nock');

module.exports.testInfo = {"container":"container157050172168909411","blob":"blob157050172186908642"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157050172168909411')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 08 Oct 2019 02:28:41 GMT',
  'ETag',
  '"0x8D74B973C07D50E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2f929591-101e-0104-2e80-7d83a1000000',
  'x-ms-client-request-id',
  'c95976a2-0a2a-4cd6-b279-48bc2500059b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 02:28:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157050172168909411/blob157050172186908642', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Oct 2019 02:28:41 GMT',
  'ETag',
  '"0x8D74B973C22B007"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10cf2fe5-701e-0010-5c80-7d0690000000',
  'x-ms-client-request-id',
  'a179a9a1-3e31-40ac-b09b-3eacd41fafd2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Oct 2019 02:28:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157050172168909411/blob157050172186908642')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 08 Oct 2019 02:28:41 GMT',
  'ETag',
  '"0x8D74B973C3CCDF6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '197838a6-301e-0071-1a80-7d424f000000',
  'x-ms-client-request-id',
  '8809eb2b-ace0-47c2-800f-7e9871a261e0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Oct 2019 02:28:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157050172168909411/blob157050172186908642')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Oct 2019 02:28:41 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D74B973C3CCDF6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a94a47e6-d01e-0095-6480-7d5145000000',
  'x-ms-client-request-id',
  '16dd05e8-629a-4e81-ade6-c343bbfa7b08',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Tue, 08 Oct 2019 02:28:41 GMT',
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
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Oct 2019 02:28:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157050172168909411')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd12110cf-501e-00e2-6580-7dd404000000',
  'x-ms-client-request-id',
  'fee6a0e9-38f8-4064-b320-5bdae1a72656',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 02:28:41 GMT',
  'Connection',
  'close' ]);

