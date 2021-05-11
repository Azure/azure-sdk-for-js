let nock = require('nock');

module.exports.hash = "053c9321af222eb2783ffa8cc8c69190";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071854735307944","file0":"file0162071854766404055","file1":"file1162071854796700141"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854735307944')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:35:47 GMT',
  'ETag',
  '"0x8D9144F64C51D82"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4be8d-f01e-0012-1f38-463670000000',
  'x-ms-client-request-id',
  '54ebb0a8-461b-4055-a6cf-fc44b49cfd64',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:46 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854735307944/file0162071854766404055')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:47 GMT',
  'ETag',
  '"0x8D9144F64F5F7AE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e610-601f-0000-6338-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'e45cf9c9-09f1-4fdb-8ae1-dbb16a8b2efb',
  'Date',
  'Tue, 11 May 2021 07:35:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071854735307944/file1162071854796700141')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:35:48 GMT',
  'ETag',
  '"0x8D9144F6526DDC3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e622-601f-0000-7538-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '5d5bb7a4-f9ce-4712-895e-83ba802220d9',
  'Date',
  'Tue, 11 May 2021 07:35:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854735307944/file0162071854766404055')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921484752300',
  'x-ms-request-id',
  '1270e626-601f-0000-7838-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'cc177623-df81-4cfe-8eb1-7b9540a50ca6',
  'Date',
  'Tue, 11 May 2021 07:35:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854735307944/file1162071854796700141')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921488015399',
  'x-ms-request-id',
  '1270e627-601f-0000-7938-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'e7b54a0a-82ba-40b5-b08a-d8e5e0f0e236',
  'Date',
  'Tue, 11 May 2021 07:35:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem162071854735307944')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem162071854735307944\"><Blobs><Blob><Name>file0162071854766404055</Name><DeletionId>132651921484752300</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:47 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:47 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:48 GMT</Expiry-Time><Etag>0x8D9144F64F5F7AE</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:48 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1162071854796700141</Name><DeletionId>132651921488015399</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Tue, 11 May 2021 07:35:48 GMT</Creation-Time><Last-Modified>Tue, 11 May 2021 07:35:48 GMT</Last-Modified><Expiry-Time>Thu, 13 May 2021 07:35:48 GMT</Expiry-Time><Etag>0x8D9144F6526DDC3</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 11 May 2021 07:35:48 GMT</DeletedTime><RemainingRetentionDays>1</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bf08-f01e-0012-0338-463670000000',
  'x-ms-client-request-id',
  '868cad66-8206-4ad9-8581-de46a60bc4bf',
  'x-ms-version',
  '2020-06-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:35:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071854735307944')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4bf1d-f01e-0012-1638-463670000000',
  'x-ms-client-request-id',
  '665ec56e-71b5-4a69-b96a-2c371c169753',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:35:48 GMT'
]);
