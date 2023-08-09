let nock = require('nock');

module.exports.hash = "f9b1a9690cb42ecfdb0424a9300df0db";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154752632003418","file0":"file0169154752644909833","file1":"file1169154752658108438","file2":"file2169154752671407879","file3":"file3169154752685101470"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752632003418')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:45 GMT',
  'ETag',
  '"0x8DB987EF5AB13A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26fa9-101e-002e-3e67-caab16000000',
  'x-ms-client-request-id',
  'c092a249-f35f-4dec-8aa7-d4dda2df80ec',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:44 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752632003418/file0169154752644909833')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:45 GMT',
  'ETag',
  '"0x8DB987EF5C05025"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f16741e7-f01f-0054-7667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '1c8af37c-62ba-4c30-949f-a7d612a574bf',
  'Date',
  'Wed, 09 Aug 2023 02:18:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752632003418/file1169154752658108438')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:46 GMT',
  'ETag',
  '"0x8DB987EF5D3E3B7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f16741f9-f01f-0054-0867-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '292507dd-e1eb-48a3-b99a-b6753e28dace',
  'Date',
  'Wed, 09 Aug 2023 02:18:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752632003418/file2169154752671407879')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:46 GMT',
  'ETag',
  '"0x8DB987EF5E7DB9E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674212-f01f-0054-2167-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'be6ee7b1-c30d-429a-901e-58df00a8e9e3',
  'Date',
  'Wed, 09 Aug 2023 02:18:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752632003418/file3169154752685101470')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:46 GMT',
  'ETag',
  '"0x8DB987EF5FCE21D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167422d-f01f-0054-3c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '3522dfd8-d321-4a69-b3ee-24637f6057f6',
  'Date',
  'Wed, 09 Aug 2023 02:18:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752632003418/file0169154752644909833')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211264763750',
  'x-ms-request-id',
  'f1674243-f01f-0054-5267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '804dfb19-5899-4401-a3d7-df5d0e573f46',
  'Date',
  'Wed, 09 Aug 2023 02:18:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752632003418/file1169154752658108438')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211266318009',
  'x-ms-request-id',
  'f1674265-f01f-0054-7367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'ea40a777-c6f1-4bcb-bf51-8d7004c6d6c5',
  'Date',
  'Wed, 09 Aug 2023 02:18:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752632003418/file2169154752671407879')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211267806901',
  'x-ms-request-id',
  'f1674279-f01f-0054-0767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '4314148c-8481-47e7-821a-bad6b83694ca',
  'Date',
  'Wed, 09 Aug 2023 02:18:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752632003418/file3169154752685101470')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211269478663',
  'x-ms-request-id',
  'f1674297-f01f-0054-2567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '0c3eeee7-1c9c-47f2-8e1a-6516c17497b1',
  'Date',
  'Wed, 09 Aug 2023 02:18:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154752632003418')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem169154752632003418\"><MaxResults>2</MaxResults><Blobs><Blob><Name>file0169154752644909833</Name><DeletionId>133360211264763750</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:45 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:45 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:46 GMT</Expiry-Time><Etag>0x8DB987EF5C05025</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:46 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file1169154752658108438</Name><DeletionId>133360211266318009</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:46 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:46 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:46 GMT</Expiry-Time><Etag>0x8DB987EF5D3E3B7</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:46 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!344!MDAwMjEyIVZCYUhuSnZVdFBQS2pXa1lqd0VZaVFFdlpXMXRZV1JoZEdGc1lXdGxBVEF4UkRaR1FUQXdNREU1TVRZMU16Y3ZKSFJ5WVhOb0wyWnBiR1Z6ZVhOMFpXMHhOamt4TlRRM05USTJNekl3TURNME1UZ0JNREZFT1VOQk5qZEVNek0wTmpZeU5nSXZabWxzWlRJeE5qa3hOVFEzTlRJMk56RTBNRGM0TnprQk1qQXlNeTB3T0Mwd09WUXdNam94T0RvME5pNDNPREEyT1RBeFdoWUFBQUE9ITAwMDAyOCEyMDIzLTA4LTA5VDAyOjE4OjQ3LjExMzA0NDlaIQ--</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27036-101e-002e-4267-caab16000000',
  'x-ms-client-request-id',
  'a4ad4473-b292-4559-9d0e-d695d76e2827',
  'x-ms-version',
  '2023-08-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154752632003418')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem169154752632003418\"><Marker>2!344!MDAwMjEyIVZCYUhuSnZVdFBQS2pXa1lqd0VZaVFFdlpXMXRZV1JoZEdGc1lXdGxBVEF4UkRaR1FUQXdNREU1TVRZMU16Y3ZKSFJ5WVhOb0wyWnBiR1Z6ZVhOMFpXMHhOamt4TlRRM05USTJNekl3TURNME1UZ0JNREZFT1VOQk5qZEVNek0wTmpZeU5nSXZabWxzWlRJeE5qa3hOVFEzTlRJMk56RTBNRGM0TnprQk1qQXlNeTB3T0Mwd09WUXdNam94T0RvME5pNDNPREEyT1RBeFdoWUFBQUE9ITAwMDAyOCEyMDIzLTA4LTA5VDAyOjE4OjQ3LjExMzA0NDlaIQ--</Marker><MaxResults>2</MaxResults><Blobs><Blob><Name>file2169154752671407879</Name><DeletionId>133360211267806901</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:46 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:46 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:46 GMT</Expiry-Time><Etag>0x8DB987EF5E7DB9E</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:46 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob><Blob><Name>file3169154752685101470</Name><DeletionId>133360211269478663</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:46 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:46 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:46 GMT</Expiry-Time><Etag>0x8DB987EF5FCE21D</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:46 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27055-101e-002e-5c67-caab16000000',
  'x-ms-client-request-id',
  '9f0898d5-e263-4ceb-9330-f7ec879ef544',
  'x-ms-version',
  '2023-08-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752632003418')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27066-101e-002e-6a67-caab16000000',
  'x-ms-client-request-id',
  '0d87e5a4-466a-4616-adfc-6656709cae90',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:46 GMT'
]);
