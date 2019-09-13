let nock = require('nock');

module.exports.testInfo = {"container":"container156776197181006903","blob":"blob156776197220204594"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776197181006903')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:12 GMT',
  'ETag',
  '"0x8D732AC42199684"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f55bdb55-501e-0008-7395-64ed8c000000',
  'x-ms-client-request-id',
  '7660de0e-a7a0-4e5d-b3f7-7f78de46119d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776197181006903/blob156776197220204594', "Hello World!")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>Crc64Mismatch</Code><Message>The CRC64 value specified in the request did not match with the CRC64 value calculated by the server.\nRequestId:afd2c41d-001e-0067-6095-64e77f000000\nTime:2019-09-06T09:26:12.4963811Z</Message><UserSpecifiedCrc>AQIDBAUGBwg=</UserSpecifiedCrc><ServerCalculatedCrc>peH8Xsgc5QI=</ServerCalculatedCrc></Error>", [ 'Content-Length',
  '387',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'afd2c41d-001e-0067-6095-64e77f000000',
  'x-ms-client-request-id',
  '6a664a9d-2ead-4c93-bb20-5137937df9c1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'Crc64Mismatch',
  'Date',
  'Fri, 06 Sep 2019 09:26:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776197181006903')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8474e71e-401e-011b-3795-64378d000000',
  'x-ms-client-request-id',
  '7de06bbf-adfd-484d-be48-364f97eab4b4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:12 GMT',
  'Connection',
  'close' ]);

