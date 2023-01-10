let nock = require('nock');

module.exports.hash = "ab8c80a9e76a7783069554765c4f3833";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167333426924204069","file":"file167333426936500406","tempfile2":"tempfile2167333426973503560"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333426924204069')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:29 GMT',
  'ETag',
  '"0x8DAF2D8EB03AB89"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6b0f1-701e-0017-10c1-24500a000000',
  'x-ms-client-request-id',
  '664fb059-9114-40f0-92cc-4341cc2c2209',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 10 Jan 2023 07:04:29 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333426924204069/file167333426936500406')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:29 GMT',
  'ETag',
  '"0x8DAF2D8EB190192"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5cfd-801f-002c-60c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '057b0d2d-88d5-4ac5-833b-2c24ed090024',
  'Date',
  'Tue, 10 Jan 2023 07:04:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333426924204069/file167333426936500406', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5cfe-801f-002c-61c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'a1d2686a-bea4-47b3-9031-41debd4e4ec6',
  'Date',
  'Tue, 10 Jan 2023 07:04:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333426924204069/file167333426936500406')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:29 GMT',
  'ETag',
  '"0x8DAF2D8EB3DFA9E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '153e5cff-801f-002c-62c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '7a725f1c-8813-4271-8732-3911b5427533',
  'Date',
  'Tue, 10 Jan 2023 07:04:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167333426924204069/tempfile2167333426973503560')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:30 GMT',
  'ETag',
  '"0x8DAF2D8EB50A7E2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d00-801f-002c-63c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'ee4ac37d-a48f-42cd-ae4b-6ea135b08e87',
  'Date',
  'Tue, 10 Jan 2023 07:04:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333426924204069/tempfile2167333426973503560', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d01-801f-002c-64c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'dd8041bb-f94c-4451-b98d-f442ebe79f95',
  'Date',
  'Tue, 10 Jan 2023 07:04:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167333426924204069/tempfile2167333426973503560', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:30 GMT',
  'ETag',
  '"0x8DAF2D8EB7516AD"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '153e5d02-801f-002c-65c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '38cd2a9f-7fb9-45b7-8a43-0e5b0e67b8c5',
  'Date',
  'Tue, 10 Jan 2023 07:04:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem167333426924204069/tempfile2167333426973503560')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/json',
  'Last-Modified',
  'Tue, 10 Jan 2023 07:04:30 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAF2D8EB7516AD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6b17b-701e-0017-07c1-24500a000000',
  'x-ms-client-request-id',
  '195c11a1-0974-4aa5-bbf0-807aabe7674d',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 10 Jan 2023 07:04:30 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 10 Jan 2023 07:04:30 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333426924204069/tempfile2167333426973503560')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133178078705842609',
  'x-ms-request-id',
  '153e5d04-801f-002c-67c1-2415ae000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '9c26b0cd-f636-4fe1-acec-8340d4686a54',
  'Date',
  'Tue, 10 Jan 2023 07:04:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167333426924204069')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '51e6b1a1-701e-0017-27c1-24500a000000',
  'x-ms-client-request-id',
  '203c88a6-bc2a-482c-b5d8-2d5cc799067a',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 10 Jan 2023 07:04:30 GMT'
]);
