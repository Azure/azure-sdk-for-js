let nock = require('nock');

module.exports.testInfo = {"container":"container156816844943808366","randomstring":"randomstring156816844984001567","blob":"blob156816844984005339"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816844943808366')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:49 GMT',
  'ETag',
  '"0x8D7365EA9AC7A3E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e4311cfc-a01e-0052-5247-687b0e000000',
  'x-ms-client-request-id',
  '69afd63b-8ef9-4d41-97f9-05556288f37b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:49 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816844943808366/blob156816844984005339', "randomstring156816844984001567")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'x7nGjjLbjWNfQ5GGOCFrnw==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:50 GMT',
  'ETag',
  '"0x8D7365EA9EA83A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b36ca566-801e-0023-4947-680937000000',
  'x-ms-client-request-id',
  'cd4a3795-fd1e-476c-a974-b26c44306177',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'hGBZxCJKqPk=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:50 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816844943808366/blob156816844984005339')
  .reply(200, ["72616e646f6d737472696e67313536383136383434393834303031353637"], [ 'Cache-Control',
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
  'x7nGjjLbjWNfQ5GGOCFrnw==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:50 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365EA9EA83A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b907a1f-e01e-001a-2847-684993000000',
  'x-ms-client-request-id',
  'e3bfd884-f96a-4994-a7b9-c666c4146b10',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:20:50 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-meta-keya,x-ms-meta-keyb,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:50 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816844943808366/blob156816844984005339')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e18a478e-d01e-0030-0b47-683cd6000000',
  'x-ms-client-request-id',
  'b5e242f4-7378-4103-819a-60b6496eb05a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:50 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156816844943808366/blob156816844984005339')
  .reply(404, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51443738-301e-0031-3247-683d2b000000',
  'x-ms-client-request-id',
  '73cb5553-1b30-4451-bba5-e5b1f6729851',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:50 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816844943808366')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cabe8b9-101e-004b-2947-685766000000',
  'x-ms-client-request-id',
  '2d0b4dd1-9feb-4a1a-ab1b-c11552dbd370',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:51 GMT' ]);

