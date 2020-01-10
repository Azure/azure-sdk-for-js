let nock = require('nock');

module.exports.testInfo = {"container":"container156816865979606144","blob":"blob156816866021301678","randomstring":"randomstring156816866021404285"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816865979606144')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:20 GMT',
  'ETag',
  '"0x8D7365F2710AF88"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6edf5b7-601e-0029-7e48-6810be000000',
  'x-ms-client-request-id',
  'b6656599-7646-416a-aaa5-251e8fc999a0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:19 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816865979606144/blob156816866021301678', "randomstring156816866021404285")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'tXNoNqM4LJocJZ/lCaiJHQ==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:20 GMT',
  'ETag',
  '"0x8D7365F2750C245"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb61c65d-401e-001c-5148-68beeb000000',
  'x-ms-client-request-id',
  '435fae35-8433-4163-8e9c-1ad99698196a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'sdhrCrvgXBM=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:24:20 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816865979606144/blob156816866021301678')
  .reply(200, "randomstring156816866021404285", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'tXNoNqM4LJocJZ/lCaiJHQ==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:20 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365F2750C245"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ae64de5-801e-0067-2248-68d55b000000',
  'x-ms-client-request-id',
  '9ab5e227-84ee-437a-8e86-bd44714d26f3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:24:20 GMT',
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
  'Wed, 11 Sep 2019 02:24:20 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816865979606144')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6798cea2-b01e-0064-0f48-68d65c000000',
  'x-ms-client-request-id',
  '1f9fdfff-7bde-49a6-84c2-de865773d485',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:20 GMT' ]);

