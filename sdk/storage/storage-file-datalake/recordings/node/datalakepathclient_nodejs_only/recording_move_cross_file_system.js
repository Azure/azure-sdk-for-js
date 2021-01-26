let nock = require('nock');

module.exports.hash = "c54ace82d6a2a45e00996ff9e1122d9c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160875819522606002","file":"file160875819547601592","destfilesystem":"destfilesystem160875819578708956","destfile":"destfile160875819588108512"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819522606002')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:35 GMT',
  'ETag',
  '"0x8D8A788074F6116"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592465-301e-0070-4770-d9b64b000000',
  'x-ms-client-request-id',
  '47897eff-ad35-49c2-b60c-20f411057437',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:35 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819522606002/file160875819547601592')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:35 GMT',
  'ETag',
  '"0x8D8A7880777DE68"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93d4-c01f-0008-3470-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'f20fbb0a-0368-439e-8fbd-2bcd8991a9bb',
  'Date',
  'Wed, 23 Dec 2020 21:16:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819522606002/file160875819547601592', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd00c93d5-c01f-0008-3570-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '6599f91b-e0aa-427f-9149-5d010d0afd7c',
  'Date',
  'Wed, 23 Dec 2020 21:16:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819522606002/file160875819547601592')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:35 GMT',
  'ETag',
  '"0x8D8A7880797C82E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd00c93d6-c01f-0008-3670-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'bc8af479-8851-468b-9822-3d6602779143',
  'Date',
  'Wed, 23 Dec 2020 21:16:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/destfilesystem160875819578708956')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:35 GMT',
  'ETag',
  '"0x8D8A78807A4E282"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592544-301e-0070-0870-d9b64b000000',
  'x-ms-client-request-id',
  '4688ca6a-621f-4e0e-8585-e08d98c99042',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:35 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/destfilesystem160875819578708956/destfile160875819588108512')
  .query(true)
  .reply(201, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93d9-c01f-0008-3870-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '6c9590f8-de08-40d4-8f0e-7c6b114c758d',
  'Date',
  'Wed, 23 Dec 2020 21:16:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/destfilesystem160875819578708956/destfile160875819588108512')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:35 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8A7880797C82E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592595-301e-0070-4f70-d9b64b000000',
  'x-ms-client-request-id',
  '63c9de85-9a57-40aa-8fa8-ebf27458a784',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Wed, 23 Dec 2020 21:16:35 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Wed, 23 Dec 2020 21:16:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/destfilesystem160875819578708956')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f5925b3-301e-0070-6a70-d9b64b000000',
  'x-ms-client-request-id',
  '545781a4-a1a7-45ec-bb15-f8bbb3224e51',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160875819522606002')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f5925d6-301e-0070-0970-d9b64b000000',
  'x-ms-client-request-id',
  '49055d75-7803-48b7-85fc-4938ac475d9a',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:36 GMT'
]);
