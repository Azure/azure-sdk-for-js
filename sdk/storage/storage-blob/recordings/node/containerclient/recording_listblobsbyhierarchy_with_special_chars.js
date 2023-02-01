let nock = require('nock');

module.exports.hash = "b963543250830298b2efb9ad6c02c436";

module.exports.testInfo = {"uniqueName":{"container":"container165899958524406447"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958524406447')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:05 GMT',
  'ETag',
  '"0x8DA7079617BCDC4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baa59-d01e-0054-1962-a2abee000000',
  'x-ms-client-request-id',
  '48a2fadc-19f5-4844-85eb-6a65ce9d8b33',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:13:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958524406447/first_dir%EF%BF%BF/file%EF%BF%BF.blob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:05 GMT',
  'ETag',
  '"0x8DA7079618D0C1A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baa79-d01e-0054-3462-a2abee000000',
  'x-ms-client-request-id',
  'dd4d50e1-07dc-4d25-b4d2-4832e6543e83',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958524406447/second_dir%EF%BF%BF/file%EF%BF%BF.blob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:05 GMT',
  'ETag',
  '"0x8DA7079619C24E0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baa8e-d01e-0054-4762-a2abee000000',
  'x-ms-client-request-id',
  'a846305a-881a-4d56-9ea4-afbeec88348d',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958524406447/normal_dir/file%EF%BF%BF.blob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:05 GMT',
  'ETag',
  '"0x8DA707961AB64B6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baa9d-d01e-0054-5462-a2abee000000',
  'x-ms-client-request-id',
  '2dff1c10-57ff-4b35-9832-fb73b3e61319',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958524406447/first_file%EF%BF%BF.blob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:05 GMT',
  'ETag',
  '"0x8DA707961BAA47A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baaa4-d01e-0054-5b62-a2abee000000',
  'x-ms-client-request-id',
  '12b33149-ab61-4f68-8e3e-ad27e1edc7e9',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958524406447/second_file%EF%BF%BF.blob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:06 GMT',
  'ETag',
  '"0x8DA707961C9E44C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baab7-d01e-0054-6762-a2abee000000',
  'x-ms-client-request-id',
  '1d9d22d9-f164-4d31-baa0-2540eb52d4d0',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958524406447/NormalBlob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:06 GMT',
  'ETag',
  '"0x8DA707961D8FD16"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baada-d01e-0054-0562-a2abee000000',
  'x-ms-client-request-id',
  'c16ecf75-022c-43f7-a3ac-ccfe6a5e6b35',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899958524406447')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899958524406447\"><Delimiter>/</Delimiter><Blobs><Blob><Name>NormalBlob</Name><Properties><Creation-Time>Thu, 28 Jul 2022 09:13:06 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:13:06 GMT</Last-Modified><Etag>0x8DA707961D8FD16</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><BlobPrefix><Name Encoded=\"true\">first_dir%EF%BF%BF%2F</Name></BlobPrefix><Blob><Name Encoded=\"true\">first_file%EF%BF%BF.blob</Name><Properties><Creation-Time>Thu, 28 Jul 2022 09:13:05 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:13:05 GMT</Last-Modified><Etag>0x8DA707961BAA47A</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><BlobPrefix><Name>normal_dir/</Name></BlobPrefix><BlobPrefix><Name Encoded=\"true\">second_dir%EF%BF%BF%2F</Name></BlobPrefix><Blob><Name Encoded=\"true\">second_file%EF%BF%BF.blob</Name><Properties><Creation-Time>Thu, 28 Jul 2022 09:13:06 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:13:06 GMT</Last-Modified><Etag>0x8DA707961C9E44C</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baaed-d01e-0054-1762-a2abee000000',
  'x-ms-client-request-id',
  '763fbb6a-5978-4fdc-9e96-03c8cf4a452d',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 09:13:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899958524406447')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85bab10-d01e-0054-3162-a2abee000000',
  'x-ms-client-request-id',
  '2384999e-473e-4fcd-bdc4-18720321361f',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:13:06 GMT'
]);
