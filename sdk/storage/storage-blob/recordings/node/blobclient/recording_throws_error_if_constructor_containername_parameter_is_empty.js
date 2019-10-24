let nock = require('nock');

module.exports.testInfo = {"container":"container156816832802407388","blob":"blob156816832843900912"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816832802407388')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:48 GMT',
  'ETag',
  '"0x8D7365E615008E1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6ec7481-601e-0029-0e47-6810be000000',
  'x-ms-client-request-id',
  'ed44283b-37d9-4e48-86fc-b20d7f14b8aa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:47 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816832802407388/blob156816832843900912', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:48 GMT',
  'ETag',
  '"0x8D7365E619064E4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96e20e8b-201e-0061-6647-682223000000',
  'x-ms-client-request-id',
  '5ac7d80d-2cb0-4c47-b00a-0234a5660cd1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:48 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816832802407388')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bf81066-501e-0047-2547-68b997000000',
  'x-ms-client-request-id',
  '8ba7bc5a-5c3f-49f6-8286-e78be6bbb274',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:48 GMT' ]);

