let nock = require('nock');

module.exports.testInfo = {"container":"container156816865221709034","blob":"blob156816865264005444","randomstring":"randomstring156816865264206812"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816865221709034')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:12 GMT',
  'ETag',
  '"0x8D7365F228CEF82"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a22cd037-401e-0035-2d48-68c8a9000000',
  'x-ms-client-request-id',
  '09440c97-1ddd-476c-96b0-9642582d40e1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:12 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816865221709034/blob156816865264005444', "randomstring156816865264206812")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'wrIy75oxaxGKi1xwW7xXKA==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:12 GMT',
  'ETag',
  '"0x8D7365F22CE621B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6edee7f-601e-0029-5348-6810be000000',
  'x-ms-client-request-id',
  '01b2c26e-1a8d-4d9b-93bc-d857a23b57d1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '1vWqiYOYA6E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:24:12 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816865221709034/blob156816865264005444')
  .reply(200, "randomstring156816865264206812", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'wrIy75oxaxGKi1xwW7xXKA==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:24:12 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365F22CE621B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b646fc7-801e-0001-2048-686701000000',
  'x-ms-client-request-id',
  'c99d5d4d-9055-48ff-94fd-d5cc3cb30bc0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:24:12 GMT',
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
  'Wed, 11 Sep 2019 02:24:13 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816865221709034')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7e13515-501e-002a-4748-6813b9000000',
  'x-ms-client-request-id',
  '45099605-ce56-434c-bb05-12388ba81243',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:24:12 GMT' ]);

