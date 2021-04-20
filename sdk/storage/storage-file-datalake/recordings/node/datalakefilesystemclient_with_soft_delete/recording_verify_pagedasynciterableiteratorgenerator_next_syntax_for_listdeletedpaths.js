let nock = require('nock');

module.exports.hash = "045a55a24d0bd5854dec18b1a3d30aef";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162061903782303498","file0":"file0162061903813203520","file1":"file1162061903844005257"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061903782303498')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:18 GMT',
  'ETag',
  '"0x8D91367B4A129CB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d050-801e-0045-1450-459843000000',
  'x-ms-client-request-id',
  '4e1cbfbb-bba8-4191-8af3-0027db7fa39a',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:17 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061903782303498/file0162061903813203520')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:18 GMT',
  'ETag',
  '"0x8D91367B4D24F47"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93db-201f-0073-7150-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '7aa2800d-19fa-4f5d-be66-793b00ea8745',
  'Date',
  'Mon, 10 May 2021 03:57:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061903782303498/file1162061903844005257')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:18 GMT',
  'ETag',
  '"0x8D91367B5005FDD"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93dc-201f-0073-7250-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '07be90f4-86a5-4d6b-a369-21f8c48bbd1e',
  'Date',
  'Mon, 10 May 2021 03:57:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061903782303498/file0162061903813203520')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926392704673',
  'x-ms-request-id',
  '6d9f93dd-201f-0073-7350-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'a0bf8fc0-e64c-4935-8951-e33b2128d99b',
  'Date',
  'Mon, 10 May 2021 03:57:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061903782303498/file1162061903844005257')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926395971091',
  'x-ms-request-id',
  '6d9f93df-201f-0073-7450-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'ed6179ef-4174-4ae1-9fcd-f8bed88de559',
  'Date',
  'Mon, 10 May 2021 03:57:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162061903782303498')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162061903782303498\"><Blobs><Blob><Name>file0162061903813203520</Name><DeletionId>132650926392704673</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:18 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:18 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:19 GMT</Expiry-Time><Etag>0x8D91367B4D24F47</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:19 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162061903844005257</Name><DeletionId>132650926395971091</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Mon, 10 May 2021 03:57:18 GMT</Creation-Time><Last-Modified>Mon, 10 May 2021 03:57:18 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 03:57:19 GMT</Expiry-Time><Etag>0x8D91367B5005FDD</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Mon, 10 May 2021 03:57:19 GMT</DeletedTime><RemainingRetentionDays>2</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d0a3-801e-0045-5350-459843000000',
  'x-ms-client-request-id',
  '18f02b6a-e79f-43dc-814d-40675eb30f5f',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 10 May 2021 03:57:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061903782303498')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d0b6-801e-0045-5f50-459843000000',
  'x-ms-client-request-id',
  'e4cb6a87-5f38-45d2-993e-501d6feb590f',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:19 GMT'
]);
