let nock = require('nock');

module.exports.testInfo = {"container":"container156816837098403099","blob":"blob156816837145903695","randomstring":"randomstring156816837145901175"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816837098403099')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:31 GMT',
  'ETag',
  '"0x8D7365E7AEC2F68"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47448060-301e-0013-2c47-68531d000000',
  'x-ms-client-request-id',
  'd90414ba-9788-4ef4-8c92-3643358cc21d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:30 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816837098403099/blob156816837145903695', "randomstring156816837145901175")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'kokktELrHVcmCg91VFGRHg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:31 GMT',
  'ETag',
  '"0x8D7365E7B345107"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9ac294f-a01e-0016-5047-68a762000000',
  'x-ms-client-request-id',
  'b24f391e-a403-492a-a1e8-f0505a145577',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YwuaqqdzVjo=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:31 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816837098403099/blob156816837145903695')
  .reply(200, "randomstring156816837145901175", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'kokktELrHVcmCg91VFGRHg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:31 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E7B345107"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab88fabf-c01e-0060-3d47-6823de000000',
  'x-ms-client-request-id',
  '4b0f1272-4a46-4e23-b58f-b309331c87b7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:19:31 GMT',
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
  'Wed, 11 Sep 2019 02:19:31 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816837098403099')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6eca58f-601e-0029-3047-6810be000000',
  'x-ms-client-request-id',
  'c83c93ed-ece4-401e-b710-4aa7124db26a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:31 GMT' ]);

