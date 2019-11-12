let nock = require('nock');

module.exports.testInfo = {"container":"container156996518724600077","blob":"blob156996518770804054"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518724600077')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:27 GMT',
  'ETag',
  '"0x8D746B604AE3CE9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '773cb599-401e-00b2-779e-78cb0c000000',
  'x-ms-client-request-id',
  'fe4c26d6-9a5c-4082-aec3-7642e1260387',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:26 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996518724600077/blob156996518770804054', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:27 GMT',
  'ETag',
  '"0x8D746B604D66E48"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb77c743-101e-006d-5a9e-789a58000000',
  'x-ms-client-request-id',
  '8e0c98b0-1832-4347-8f44-26310a4e4c4c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 01 Oct 2019 21:26:26 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156996518724600077/blob156996518770804054')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:27 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D746B604D66E48"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e24046fe-b01e-012b-699e-78029b000000',
  'x-ms-client-request-id',
  '24b4b664-ab2b-4485-bd11-220177e4bc10',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Tue, 01 Oct 2019 21:26:27 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 01 Oct 2019 21:26:27 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156996518724600077')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a03a6a97-c01e-00ec-6d9e-78380f000000',
  'x-ms-client-request-id',
  '530065c5-0984-452f-a4be-4461248a7ab1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:27 GMT' ]);

