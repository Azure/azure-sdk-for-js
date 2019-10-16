let nock = require('nock');

module.exports.testInfo = {"container":"container156816866145808325","blob":"blob156816866188404634","randomstring":"randomstring156816866188601407"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816866145808325')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:21 GMT',
  'ETag',
  '"0x8D7365F280EFC33"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a458ab68-f01e-0041-7748-684eef000000',
  'x-ms-client-request-id',
  '61e606a2-49cb-4778-b267-f549208f6268',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:20 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816866145808325/blob156816866188404634', "randomstring156816866188601407")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sxTCHUrtwjkkL//yvnc2Gw==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:22 GMT',
  'ETag',
  '"0x8D7365F284FC2A2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f35fc54-601e-0044-0848-68ba90000000',
  'x-ms-client-request-id',
  '6a604c55-38cd-4346-8678-323b3d1f3f01',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'KXdlQmpcWIY=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:24:21 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816866145808325/blob156816866188404634')
  .reply(200, "randomstring156816866188601407", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sxTCHUrtwjkkL//yvnc2Gw==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:22 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365F284FC2A2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bf9b793-501e-0047-4948-68b997000000',
  'x-ms-client-request-id',
  '88eb18ab-84d5-4152-8959-0e5b961f9896',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:24:22 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:24:21 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816866145808325')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14e930b4-b01e-0020-6d48-680a30000000',
  'x-ms-client-request-id',
  '4f6eff22-576a-41ce-a47b-f639430976f7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:22 GMT' ]);

