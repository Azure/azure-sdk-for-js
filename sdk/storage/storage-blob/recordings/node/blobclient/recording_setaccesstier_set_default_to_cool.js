let nock = require('nock');

module.exports.testInfo = {"container":"container156988644246202534","blob":"blob156988644268700646"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988644246202534')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:02 GMT',
  'ETag',
  '"0x8D745FEAD37A487"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b0fe1428-c01e-009a-68e7-77ff5e000000',
  'x-ms-client-request-id',
  'a548b91e-5897-4109-b8d6-e50d1fcc44c2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:01 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988644246202534/blob156988644268700646', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:02 GMT',
  'ETag',
  '"0x8D745FEAD5A5C0F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'deeaee00-101e-00dc-68e7-7721c8000000',
  'x-ms-client-request-id',
  '557aef57-fbee-40c4-af28-9621f0c525af',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 30 Sep 2019 23:34:01 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988644246202534/blob156988644268700646')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '08a7b332-701e-0083-04e7-77d336000000',
  'x-ms-client-request-id',
  'd6563af5-8d31-4cbc-8ca1-faa603c8e337',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:02 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156988644246202534/blob156988644268700646')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:02 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D745FEAD5A5C0F"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9185a4e8-401e-008b-14e7-77c845000000',
  'x-ms-client-request-id',
  '73d48b01-91be-43b3-b3c7-fd0aa428c9d8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Mon, 30 Sep 2019 23:34:02 GMT',
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
  'x-ms-access-tier-change-time',
  'Mon, 30 Sep 2019 23:34:03 GMT',
  'Date',
  'Mon, 30 Sep 2019 23:34:02 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156988644246202534')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2124efcf-401e-0047-77e7-77acf0000000',
  'x-ms-client-request-id',
  '10c77259-6760-4c25-982d-0fdbb802415b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:03 GMT' ]);

