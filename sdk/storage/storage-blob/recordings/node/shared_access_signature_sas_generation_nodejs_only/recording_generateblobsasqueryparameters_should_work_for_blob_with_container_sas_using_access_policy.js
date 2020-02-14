let nock = require('nock');

module.exports.hash = "19b422506e1195ebdca000119ab1cb59";

module.exports.testInfo = {"uniqueName":{"container":"container158167179299607529","blob":"blob158167179429500913"},"newDate":{"now":"2020-02-14T09:16:32.995Z","tmr":"2020-02-14T09:16:32.996Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158167179299607529')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 14 Feb 2020 09:16:34 GMT',
  'ETag',
  '"0x8D7B12E96161256"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4821742-101e-0032-7c17-e35f72000000',
  'x-ms-client-request-id',
  '99e4cb07-f202-44ea-8a8e-f9f2e2660a07',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 14 Feb 2020 09:16:34 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158167179299607529/blob158167179429500913')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 14 Feb 2020 09:16:34 GMT',
  'ETag',
  '"0x8D7B12E9645B88A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4821823-101e-0032-4917-e35f72000000',
  'x-ms-client-request-id',
  '9d5bcbd3-822c-413d-aac4-272c096336ad',
  'x-ms-version',
  '2019-07-07',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 14 Feb 2020 09:16:34 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158167179299607529', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2020-02-14T09:11:32.9950000Z</Start><Expiry>2020-02-15T09:16:32.9960000Z</Expiry><Permission>racwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 14 Feb 2020 09:16:34 GMT',
  'ETag',
  '"0x8D7B12E9674107B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f482191d-101e-0032-3217-e35f72000000',
  'x-ms-client-request-id',
  '53012907-e7b5-4eea-8d32-85bda0846938',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 14 Feb 2020 09:16:34 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158167179299607529/blob158167179429500913')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 14 Feb 2020 09:16:34 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7B12E9645B88A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4821a4e-101e-0032-5617-e35f72000000',
  'x-ms-client-request-id',
  '601a86d8-a646-4010-9d1e-c3067f551d4e',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Fri, 14 Feb 2020 09:16:34 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 14 Feb 2020 09:16:34 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158167179299607529')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4821b56-101e-0032-4617-e35f72000000',
  'x-ms-client-request-id',
  'bc8a28b9-09f8-44f7-92d6-c624da7cc5a3',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 14 Feb 2020 09:16:35 GMT' ]);
