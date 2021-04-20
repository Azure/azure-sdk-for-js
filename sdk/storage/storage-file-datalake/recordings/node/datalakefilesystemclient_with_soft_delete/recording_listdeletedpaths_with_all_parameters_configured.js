let nock = require('nock');

module.exports.hash = "73792ec59abf091bf114a60c7296e48a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162061903127808083","file0":"file0162061903158808013","file1":"file1162061903199009195"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061903127808083')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:11 GMT',
  'ETag',
  '"0x8D91367B0BAE429"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8ceb6-801e-0045-6750-459843000000',
  'x-ms-client-request-id',
  'e08e2757-f3a4-4227-974a-3099dcaa9682',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:11 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061903127808083/file0162061903158808013')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:12 GMT',
  'ETag',
  '"0x8D91367B0FA0A7E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93cc-201f-0073-6450-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'f1fe9381-e9dc-498d-a8e8-270d6378b042',
  'Date',
  'Mon, 10 May 2021 03:57:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061903127808083/file1162061903199009195')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:12 GMT',
  'ETag',
  '"0x8D91367B129081E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93ce-201f-0073-6550-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'aa4baded-09d3-461d-a956-2b07fde445f4',
  'Date',
  'Mon, 10 May 2021 03:57:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061903127808083/file0162061903158808013')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926327497531',
  'x-ms-request-id',
  '6d9f93cf-201f-0073-6650-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '885a08e7-35c9-4338-85e8-e97de40cff2b',
  'Date',
  'Mon, 10 May 2021 03:57:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061903127808083/file1162061903199009195')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926330821535',
  'x-ms-request-id',
  '6d9f93d0-201f-0073-6750-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '2f26376b-4e07-4a64-8d25-f0ccac3256a8',
  'Date',
  'Mon, 10 May 2021 03:57:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162061903127808083')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162061903127808083\"><MaxResults>1</MaxResults><Blobs><Blob><Name>file0162061903158808013</Name><DeletionId>132650926327497531</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:12 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:12 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:12 GMT</Expiry-Time><Etag>0x8D91367B0FA0A7E</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:12 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!348!MDAwMjE2IU1URXdNamcxTmpBME16TXpOelExTmpVeU9EY2dNQ0F2YzJWaGJtNXpaV05oYm1GeWVRRXdNVVEyTURrME1EazNOMEV5UVVRekx5UjBjbUZ6YUM5bWFXeGxjM2x6ZEdWdE1UWXlNRFl4T1RBek1USTNPREE0TURnekFUQXhSRGMwTlRVd09FVTBORFZGTVVRQ0wyWnBiR1V4TVRZeU1EWXhPVEF6TVRrNU1EQTVNVGsxQVRJd01qRXRNRFV0TVRCVU1ETTZOVGM2TVRNdU1EZ3lNVFV6TlZvPSEwMDAwMjghMjAyMS0wNS0xMFQwMzo1NzoxMy40NTIzMzUzWiE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8cf2b-801e-0045-3f50-459843000000',
  'x-ms-client-request-id',
  '4834449a-cf80-4496-b325-f58057584621',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162061903127808083')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162061903127808083\"><Marker>2!348!MDAwMjE2IU1URXdNamcxTmpBME16TXpOelExTmpVeU9EY2dNQ0F2YzJWaGJtNXpaV05oYm1GeWVRRXdNVVEyTURrME1EazNOMEV5UVVRekx5UjBjbUZ6YUM5bWFXeGxjM2x6ZEdWdE1UWXlNRFl4T1RBek1USTNPREE0TURnekFUQXhSRGMwTlRVd09FVTBORFZGTVVRQ0wyWnBiR1V4TVRZeU1EWXhPVEF6TVRrNU1EQTVNVGsxQVRJd01qRXRNRFV0TVRCVU1ETTZOVGM2TVRNdU1EZ3lNVFV6TlZvPSEwMDAwMjghMjAyMS0wNS0xMFQwMzo1NzoxMy40NTIzMzUzWiE-</Marker><MaxResults>2</MaxResults><Blobs><Blob><Name>file1162061903199009195</Name><DeletionId>132650926330821535</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:12 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:12 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:13 GMT</Expiry-Time><Etag>0x8D91367B129081E</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:13 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8cf37-801e-0045-4a50-459843000000',
  'x-ms-client-request-id',
  'b174e253-9983-4bef-a168-c4d4ad5ab71e',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061903127808083')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8cf42-801e-0045-5350-459843000000',
  'x-ms-client-request-id',
  'fe0c4765-af94-4ff4-a314-1b18076155f1',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:13 GMT'
]);
