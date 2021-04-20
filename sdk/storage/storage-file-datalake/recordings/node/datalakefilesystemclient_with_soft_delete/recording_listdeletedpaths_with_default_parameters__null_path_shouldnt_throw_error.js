let nock = require('nock');

module.exports.hash = "e741f706e030747b5f4a8a313c985378";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162061902789300045","file0":"file0162061902820903317","file1":"file1162061902852109965","file2":"file2162061902882309117"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061902789300045')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:08 GMT',
  'ETag',
  '"0x8D91367AEB610AF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8cddf-801e-0045-5a50-459843000000',
  'x-ms-client-request-id',
  '2bdc1b1d-63b6-4cd1-a368-688e4d201b14',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:07 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061902789300045/file0162061902820903317')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:08 GMT',
  'ETag',
  '"0x8D91367AEE88DCB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93b9-201f-0073-5c50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '1fa808cb-756f-443f-99b1-43d6cbb0ece8',
  'Date',
  'Mon, 10 May 2021 03:57:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061902789300045/file1162061902852109965')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:08 GMT',
  'ETag',
  '"0x8D91367AF16C32B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93ba-201f-0073-5d50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '0d24ce55-a466-4540-90ad-676cc700d15b',
  'Date',
  'Mon, 10 May 2021 03:57:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061902789300045/file2162061902882309117')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:09 GMT',
  'ETag',
  '"0x8D91367AF44A0FF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93bb-201f-0073-5e50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '40fbcc0b-011d-4c99-9ef0-ca9bc9bf0cd2',
  'Date',
  'Mon, 10 May 2021 03:57:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061902789300045/file0162061902820903317')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926296811912',
  'x-ms-request-id',
  '6d9f93bd-201f-0073-5f50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'a677c122-18b9-4d33-b69e-ed99bcd3c95f',
  'Date',
  'Mon, 10 May 2021 03:57:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061902789300045/file1162061902852109965')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926300054107',
  'x-ms-request-id',
  '6d9f93be-201f-0073-6050-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '9ee6ee28-8cab-4449-aebb-d6b68237f565',
  'Date',
  'Mon, 10 May 2021 03:57:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061902789300045/file2162061902882309117')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926304119952',
  'x-ms-request-id',
  '6d9f93bf-201f-0073-6150-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'd7d03803-4f1d-481a-8ab9-9577a229dcb1',
  'Date',
  'Mon, 10 May 2021 03:57:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162061902789300045')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162061902789300045\"><Blobs><Blob><Name>file0162061902820903317</Name><DeletionId>132650926296811912</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:08 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:08 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:09 GMT</Expiry-Time><Etag>0x8D91367AEE88DCB</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:09 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162061902852109965</Name><DeletionId>132650926300054107</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:08 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:08 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:10 GMT</Expiry-Time><Etag>0x8D91367AF16C32B</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:10 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file2162061902882309117</Name><DeletionId>132650926304119952</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:09 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:09 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:10 GMT</Expiry-Time><Etag>0x8D91367AF44A0FF</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:10 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8ce7e-801e-0045-4350-459843000000',
  'x-ms-client-request-id',
  '17db8118-0056-432d-b015-6eeb9ac80201',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061902789300045')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8ce9c-801e-0045-5650-459843000000',
  'x-ms-client-request-id',
  'f3765d24-d3f5-4394-adc7-4e7dc67d86cd',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:10 GMT'
]);
