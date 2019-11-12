let nock = require('nock');

module.exports.testInfo = {"container":"container156816839409708337","blob":"blob156816839451604953","randomstring":"randomstring156816839451700158"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816839409708337')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:54 GMT',
  'ETag',
  '"0x8D7365E88B2AC41"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a22bbd64-401e-0035-2947-68c8a9000000',
  'x-ms-client-request-id',
  'de31de87-8d99-422d-b538-390f8954e5f8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:53 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816839409708337/blob156816839451604953', "randomstring156816839451700158")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'OATixF2Euq4VPFmwOLqB/A==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:54 GMT',
  'ETag',
  '"0x8D7365E88F3CBD8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed16cd19-f01e-0005-2347-689283000000',
  'x-ms-client-request-id',
  'aa99506a-a90d-4f26-87eb-dda6460beceb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'bhZtECyVqHU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Wed, 11 Sep 2019 02:19:54 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816839409708337/blob156816839451604953')
  .reply(200, ["72616e646f6d737472696e67313536383136383339343531373030313538"], [ 'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '30',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Content-MD5',
  'OATixF2Euq4VPFmwOLqB/A==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E88F3CBD8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5143e907-301e-0031-6047-683d2b000000',
  'x-ms-client-request-id',
  '59fc424a-69bb-47f7-a3b3-d5f54ba17c7e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:19:54 GMT',
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
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-meta-keya,x-ms-meta-keyb,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:54 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816839409708337')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14e80210-b01e-0020-2447-680a30000000',
  'x-ms-client-request-id',
  'd5f6a5a5-8182-4a5b-b46d-27c7940f5895',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:55 GMT' ]);

