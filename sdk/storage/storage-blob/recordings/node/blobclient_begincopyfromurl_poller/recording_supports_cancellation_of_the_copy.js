let nock = require('nock');

module.exports.testInfo = {"container":"container157172179787202293","blob":"blob157172179793508760","dest-container":"dest-container157172179799804425","copiedblob":"copiedblob157172179806407945"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157172179787202293')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:17 GMT',
  'ETag',
  '"0x8D756AFF20C194A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c50a1d0f-001e-00ec-2098-884765000000',
  'x-ms-client-request-id',
  'd3e5ef44-70a4-4aef-92b5-b81432633718',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:16 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157172179787202293/blob157172179793508760', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:17 GMT',
  'ETag',
  '"0x8D756AFF215A7A6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '597d68f3-301e-004e-1b98-887d7c000000',
  'x-ms-client-request-id',
  '2ef4599a-e83b-4ad0-a5d9-1cd7772a29dd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 22 Oct 2019 05:23:17 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157172179799804425')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:17 GMT',
  'ETag',
  '"0x8D756AFF21FAED2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd757bf24-401e-00a0-4498-88d755000000',
  'x-ms-client-request-id',
  '228b0abd-4f89-4929-94ff-c2b616fe354a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:16 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157172179799804425/copiedblob157172179806407945')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:18 GMT',
  'ETag',
  '"0x8D756AFF25F1A40"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'def13613-d01e-00a2-0498-8869ed000000',
  'x-ms-client-request-id',
  '3f8199c2-01cf-45c8-a4dc-af785dfd0cae',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  'c15ab2bb-5f8f-48c7-afbf-0dcbd48230d5',
  'x-ms-copy-status',
  'pending',
  'Date',
  'Tue, 22 Oct 2019 05:23:17 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157172179799804425/copiedblob157172179806407945')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'def13702-d01e-00a2-5698-8869ed000000',
  'x-ms-client-request-id',
  '27fe8904-511f-40f5-8372-60b6431bf421',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:17 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157172179787202293')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c50a1e4e-001e-00ec-3698-884765000000',
  'x-ms-client-request-id',
  'd9cc4702-7bac-4452-b2a6-15d4f4b0028a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:17 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/dest-container157172179799804425')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd757c0ba-401e-00a0-1f98-88d755000000',
  'x-ms-client-request-id',
  '41abbaa5-1489-473c-8de0-af41fa1defc9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:17 GMT'
]);

