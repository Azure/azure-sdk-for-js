let nock = require('nock');

module.exports.testInfo = {"container":"container156816844333804365","prefix":"prefix156816844373806414","blockblob":"blockblob156816844373803610"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816844333804365')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:43 GMT',
  'ETag',
  '"0x8D7365EA60965A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '02702a8f-201e-0043-5147-684c15000000',
  'x-ms-client-request-id',
  'd2886241-5106-4412-94c7-4ca0afe71b5e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:42 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036100')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:44 GMT',
  'ETag',
  '"0x8D7365EA647126B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbec9b2e-701e-001f-5447-68bdec000000',
  'x-ms-client-request-id',
  '349244cd-421a-4d06-ba67-1a21d9770b67',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:43 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036101')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:44 GMT',
  'ETag',
  '"0x8D7365EA6862280"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'af570aed-501e-0008-2047-687d8f000000',
  'x-ms-client-request-id',
  '18d695a9-a068-4540-b92f-3bb87f532c1b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:43 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036102')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:44 GMT',
  'ETag',
  '"0x8D7365EA6C3F9F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbec9bd3-701e-001f-7247-68bdec000000',
  'x-ms-client-request-id',
  '6e043626-a86f-429d-a404-7ef44a67de66',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:44 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036103')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:45 GMT',
  'ETag',
  '"0x8D7365EA702BC01"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '816dbbb2-c01e-006b-2d47-683baa000000',
  'x-ms-client-request-id',
  '6305dbae-a1cd-4280-865b-c29ff8a6573a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:44 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036104')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:45 GMT',
  'ETag',
  '"0x8D7365EA74108C0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ec2f4c9-601e-004f-2947-68a2e4000000',
  'x-ms-client-request-id',
  'bf6bb28a-e989-4b11-ac07-a2dd06cc48e0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:45 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036105')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:46 GMT',
  'ETag',
  '"0x8D7365EA77FA3AD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b36c9db9-801e-0023-3447-680937000000',
  'x-ms-client-request-id',
  '73960d6a-4e06-4d1d-8858-5a1af14b681b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:45 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816844333804365')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156816844333804365\"><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>prefix156816844373806414/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '331d0ccd-c01e-000d-2247-6889f0000000',
  'x-ms-client-request-id',
  'c13e4d7b-8c59-4be0-a2d2-2e113f332619',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:46 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036100')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64827821-e01e-005e-7947-6895ff000000',
  'x-ms-client-request-id',
  'b9c9fb7d-c09e-496f-9819-2a471fd98011',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:46 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036101')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ae57981-801e-0067-3847-68d55b000000',
  'x-ms-client-request-id',
  'ce1ce5bd-ea99-4c11-8c1e-ff4e1ab63a1f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:46 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036102')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a357e03-301e-003a-6b47-68255f000000',
  'x-ms-client-request-id',
  'eb5197d4-c51f-4252-9699-0e71c18ba80c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:47 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036103')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'df1895a1-401e-0058-5d47-686287000000',
  'x-ms-client-request-id',
  '3126aa18-c139-4ba1-9d9d-ddc53df22655',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:47 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036104')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd4b2748-901e-0037-6547-68ca53000000',
  'x-ms-client-request-id',
  'd7fc6b31-f567-4a5c-a98f-c789df8c02cc',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:48 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816844333804365/prefix156816844373806414%2Fblockblob1568168443738036105')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '585ef535-101e-0026-6d47-68fd48000000',
  'x-ms-client-request-id',
  '4d2b67c7-649b-4fc6-93f9-9ff8950037ec',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:20:48 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816844333804365')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b36ca3dc-801e-0023-5c47-680937000000',
  'x-ms-client-request-id',
  'cc810e4b-fb1a-4110-b674-8c2b5efa4f12',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:49 GMT' ]);

