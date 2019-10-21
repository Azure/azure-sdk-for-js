let nock = require('nock');

module.exports.testInfo = {"container":"container156816843601704158","blockblob0/0":"blockblob0/0156816843642004345","blockblob1/1":"blockblob1/1156816843683502992","blockblob2/2":"blockblob2/2156816843724602387"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816843601704158')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:36 GMT',
  'ETag',
  '"0x8D7365EA1ACDA61"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cea6aa9c-e01e-0055-0f47-688d8b000000',
  'x-ms-client-request-id',
  '87f623a3-7765-486c-a198-6b1ac1785f52',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:35 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816843601704158/blockblob0%2F0156816843642004345')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:36 GMT',
  'ETag',
  '"0x8D7365EA1EA1A86"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f34aebb-601e-0044-0547-68ba90000000',
  'x-ms-client-request-id',
  'd64a6173-defb-4169-a645-ebe0f1d46742',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:36 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816843601704158/blockblob1%2F1156816843683502992')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:37 GMT',
  'ETag',
  '"0x8D7365EA22AD8BA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd53a4a80-001e-0032-2b47-683e2c000000',
  'x-ms-client-request-id',
  'dc9bbf4a-685e-4d7b-b898-b3046a0603de',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:36 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816843601704158/blockblob2%2F2156816843724602387')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:37 GMT',
  'ETag',
  '"0x8D7365EA267ECBB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cea6ace6-e01e-0055-1547-688d8b000000',
  'x-ms-client-request-id',
  '7ccc3b3a-f048-46c6-bb4a-b03c26fb4aff',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:36 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816843601704158')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156816843601704158\"><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob0/</Name></BlobPrefix><BlobPrefix><Name>blockblob1/</Name></BlobPrefix><BlobPrefix><Name>blockblob2/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96e2c6d1-201e-0061-0947-682223000000',
  'x-ms-client-request-id',
  'cfd479c2-145f-41a5-bd15-70a7fe72deba',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:37 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816843601704158/blockblob0%2F0156816843642004345')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f34b13a-601e-0044-3247-68ba90000000',
  'x-ms-client-request-id',
  '87eea91f-7996-4d0a-afba-c5aeac232754',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:38 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816843601704158/blockblob1%2F1156816843683502992')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1836bc4d-b01e-004d-5847-68a01e000000',
  'x-ms-client-request-id',
  '2d6f4ce3-5798-4bfb-9c61-9c497e897923',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:37 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816843601704158/blockblob2%2F2156816843724602387')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '95f2fe85-401e-0053-3047-687af3000000',
  'x-ms-client-request-id',
  '1307ea4f-e23b-4827-a7d1-708378d77a6c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:39 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816843601704158')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eba0932a-d01e-003b-7547-6824a2000000',
  'x-ms-client-request-id',
  'ef35ee8d-5856-49f2-adfd-5901aa80fda7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:39 GMT' ]);

