let nock = require('nock');

module.exports.testInfo = {"container":"container156816840220208943","blob":"blob156816840260909307"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816840220208943')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:02 GMT',
  'ETag',
  '"0x8D7365E8D85B4E1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25d636c4-101e-002d-0947-68e53c000000',
  'x-ms-client-request-id',
  'cbf6de84-8512-4a08-85d9-3b2f3682f940',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:01 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816840220208943/blob156816840260909307', "Hello World!")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>Crc64Mismatch</Code><Message>The CRC64 value specified in the request did not match with the CRC64 value calculated by the server.\nRequestId:f7bd0fff-301e-005c-4747-689705000000\nTime:2019-09-11T02:20:02.9451882Z</Message><UserSpecifiedCrc>AQIDBAUGBwg=</UserSpecifiedCrc><ServerCalculatedCrc>peH8Xsgc5QI=</ServerCalculatedCrc></Error>", [ 'Content-Length',
  '387',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f7bd0fff-301e-005c-4747-689705000000',
  'x-ms-client-request-id',
  'e15a2676-45df-4812-a636-ef2682d9a660',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'Crc64Mismatch',
  'Date',
  'Wed, 11 Sep 2019 02:20:02 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816840220208943')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '331ce157-c01e-000d-4747-6889f0000000',
  'x-ms-client-request-id',
  '30a8d46d-d079-4e4d-9166-7dc0a53a4386',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:02 GMT' ]);

