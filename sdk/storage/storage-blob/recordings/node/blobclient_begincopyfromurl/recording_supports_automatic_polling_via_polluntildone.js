let nock = require('nock');

module.exports.testInfo = {"container":"container157169652956905696","blob":"blob157169652987205795","dest-container":"dest-container157169652997000155","copiedblob":"copiedblob157169653006806452"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169652956905696')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'ETag',
  '"0x8D756751D36757F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4423b0a0-d01e-0069-605d-886ab8000000',
  'x-ms-client-request-id',
  '51b2eeb5-c61a-482c-96e1-e59768637249',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157169652956905696/blob157169652987205795', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'ETag',
  '"0x8D756751D4B3E31"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1408afd3-f01e-0033-715d-880c5f000000',
  'x-ms-client-request-id',
  '8e1d989b-ae3d-4a01-854d-e87d09af2adf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157169652997000155')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'ETag',
  '"0x8D756751D565DB3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '786e36eb-e01e-0072-215d-8854bb000000',
  'x-ms-client-request-id',
  'a3e6ff85-8fca-42d1-9610-c38bba034f61',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157169652997000155/copiedblob157169653006806452')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'ETag',
  '"0x8D756751D6ADA09"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e73e583-701e-00d9-755d-882b71000000',
  'x-ms-client-request-id',
  '4b6fabc9-8893-4798-acc8-491423e9eac5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '3e39d6db-74ac-446c-82da-04208bfa6d26',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157169652956905696/blob157169652987205795')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D756751D4B3E31"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '047f614c-f01e-006e-555d-8806db000000',
  'x-ms-client-request-id',
  '119c3326-9db9-473a-a7bd-c220b7e2e9c3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/dest-container157169652997000155/copiedblob157169653006806452')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D756751D6ADA09"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '04e062dd-401e-00d2-0b5d-88d01a000000',
  'x-ms-client-request-id',
  '0b26880f-42a9-439d-a47c-87e5bdf02f76',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '3e39d6db-74ac-446c-82da-04208bfa6d26',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container157169652956905696/blob157169652987205795',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Mon, 21 Oct 2019 22:22:10 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157169652956905696')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8ac6594b-f01e-008a-1b5d-880845000000',
  'x-ms-client-request-id',
  '2309c6ab-4e7a-41f9-a31b-043c52bf8525',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157169652956905696')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '179da468-a01e-005c-3c5d-8806ac000000',
  'x-ms-client-request-id',
  '6d3bdd39-1ea6-433e-ac01-dadf30ea18fe',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 21 Oct 2019 22:22:09 GMT',
  'Connection',
  'close'
]);

