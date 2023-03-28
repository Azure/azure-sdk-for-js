let nock = require('nock');

module.exports.hash = "f0d3797097cfce474fac9b07a548ff04";

module.exports.testInfo = {"uniqueName":{"share":"share167747746466604453","dir":"dir167747746491604407","file":"file167747746517401362","copiedfile":"copiedfile167747746542805624"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746466604453')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:45 GMT',
  'ETag',
  '"0x8DB18878C00C732"',
  'x-ms-request-id',
  'e51cf6ec-601a-0004-6a70-4a0ec4000000',
  'x-ms-client-request-id',
  '64f5d74f-644c-4bea-90ae-26f2ca4e33fa',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746466604453/dir167747746491604407....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:45 GMT',
  'ETag',
  '"0x8DB18878C28C3BB"',
  'x-ms-request-id',
  'e51cf6ee-601a-0004-6b70-4a0ec4000000',
  'x-ms-client-request-id',
  'efb8a71b-af3c-4904-8f4c-a3fcc51fa8f0',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:45.4190523Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:45.4190523Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:45.4190523Z',
  'x-ms-file-permission-key',
  '13895902193744473398*5510371786133343095',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746466604453/dir167747746491604407..../file167747746517401362....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:45 GMT',
  'ETag',
  '"0x8DB18878C4FACA4"',
  'x-ms-request-id',
  'e51cf6ef-601a-0004-6c70-4a0ec4000000',
  'x-ms-client-request-id',
  'c4c2b5da-33fe-423c-a21d-4e43533d232e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:45.6740516Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:45.6740516Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:45.6740516Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747746466604453/dir167747746491604407..../copiedfile167747746542805624...')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:46 GMT',
  'ETag',
  '"0x8DB18878C973D71"',
  'x-ms-request-id',
  'e51cf6f0-601a-0004-6d70-4a0ec4000000',
  'x-ms-client-request-id',
  '72a09050-e9b4-4a76-b1e6-ffad2d0bb24a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-copy-id',
  '94b2d2cc-369c-4756-906b-411c80374e06',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 27 Feb 2023 05:57:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747746466604453/dir167747746491604407....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167747746466604453\" DirectoryPath=\"dir167747746491604407....\"><DirectoryId>13835128424026341376</DirectoryId><Entries><File><Name>copiedfile167747746542805624...</Name><FileId>16140971433240035328</FileId><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>file167747746517401362....</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'e51cf6f1-601a-0004-6e70-4a0ec4000000',
  'x-ms-client-request-id',
  '4535c560-5bfe-432f-87bb-7a20c467267c',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:57:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747746466604453/dir167747746491604407..../file167747746517401362....')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:45 GMT',
  'ETag',
  '"0x8DB18878C4FACA4"',
  'x-ms-request-id',
  'e51cf6f2-601a-0004-6f70-4a0ec4000000',
  'x-ms-client-request-id',
  '949aa007-e05c-4183-aa01-bb7a4bcab3ee',
  'x-ms-version',
  '2022-11-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T05:57:45.6740516Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:45.6740516Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:45.6740516Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:57:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167747746466604453/dir167747746491604407..../copiedfile167747746542805624...')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:46 GMT',
  'ETag',
  '"0x8DB18878C973D71"',
  'x-ms-request-id',
  'e51cf6f3-601a-0004-7070-4a0ec4000000',
  'x-ms-client-request-id',
  '7aa23664-b7e7-41ab-82e0-bc693d9e8d59',
  'x-ms-version',
  '2022-11-02',
  'x-ms-copy-id',
  '94b2d2cc-369c-4756-906b-411c80374e06',
  'x-ms-copy-source',
  'https://fakestorageaccount.file.core.windows.net/share167747746466604453/dir167747746491604407..../file167747746517401362....',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Mon, 27 Feb 2023 05:57:46 GMT',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T05:57:46.1430641Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:46.1430641Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:46.1430641Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:57:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747746466604453')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf6f4-601a-0004-7170-4a0ec4000000',
  'x-ms-client-request-id',
  'ea7b3548-075e-4b71-b3d5-b1440af4621f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:47 GMT'
]);
