let nock = require('nock');

module.exports.testInfo = {"container":"container156996518874607869","blob":"blob156996518886404889","blobCPK":"blobCPK156996518899905906"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518874607869')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:28 GMT',
  'ETag',
  '"0x8D746B6056F2B8B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1dce39c9-701e-00d7-489e-787a51000000',
  'x-ms-client-request-id',
  '396b7cc4-265f-4eab-bd36-55c84e7c394f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:27 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518874607869/blob156996518886404889', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:28 GMT',
  'ETag',
  '"0x8D746B605843E8C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '42c85ba1-f01e-00ef-469e-783b08000000',
  'x-ms-client-request-id',
  '5139d965-21ba-400a-8984-8a71c80362c7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 01 Oct 2019 21:26:28 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518874607869/blobCPK156996518899905906', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:28 GMT',
  'ETag',
  '"0x8D746B605977D30"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22e4cb65-a01e-0056-379e-78d806000000',
  'x-ms-client-request-id',
  '0ffabc73-28a9-4e2c-a27c-f2e399e6ad7a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Tue, 01 Oct 2019 21:26:28 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518874607869/blobCPK156996518899905906')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:28 GMT',
  'ETag',
  '"0x8D746B605ADF0F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62138eb6-e01e-0096-749e-785242000000',
  'x-ms-client-request-id',
  '37f4ea46-6374-4c61-b242-2bcefb65cc37',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Tue, 01 Oct 2019 21:26:28 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156996518874607869/blobCPK156996518899905906')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:28 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D746B605ADF0F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dcb4c6df-301e-009f-7c9e-7848cc000000',
  'x-ms-client-request-id',
  '0fbd097c-b52e-4bc9-bf83-03c7e0daae7e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-a',
  'a',
  'x-ms-creation-time',
  'Tue, 01 Oct 2019 21:26:28 GMT',
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
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-meta-a,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 01 Oct 2019 21:26:28 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156996518874607869')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e450e3e-a01e-009a-549e-78bcb3000000',
  'x-ms-client-request-id',
  '48c57066-f6e7-4d55-bd3a-932824d14879',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:29 GMT' ]);

