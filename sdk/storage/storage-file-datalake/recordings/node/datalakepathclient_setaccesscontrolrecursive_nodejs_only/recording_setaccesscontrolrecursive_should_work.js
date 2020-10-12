let nock = require('nock');

module.exports.hash = "a1335e4f0e821d02462b93ec230af493";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160242183831705700","file":"file160242183972906255","directory":"directory160242184177807351","subdirectory1":"subdirectory1160242184177902176","fileName1":"fileName1160242184177901069","fileName2":"fileName2160242184177902649","subdirectory2":"subdirectory2160242184177903211","fileName3":"fileName3160242184177909160","fileName4":"fileName4160242184177900935"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242183831705700')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:41 GMT',
  'ETag',
  '"0x8D86DE6C68E9FFA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '761862e2-601e-006a-5fcf-9ffd81000000',
  'x-ms-client-request-id',
  '6e817839-47f4-4f2d-8d4f-c82ee86a6ece',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:08:41 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242183831705700/file160242183972906255')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:42 GMT',
  'ETag',
  '"0x8D86DE6C770BA68"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a5a3-a01f-0017-1acf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '6f257ce2-1703-41ad-a67a-827f672646af',
  'Date',
  'Sun, 11 Oct 2020 13:08:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242183831705700/file160242183972906255', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '66c1a5a7-a01f-0017-1ecf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '291836a1-9dff-474d-97ee-6008227c1e19',
  'Date',
  'Sun, 11 Oct 2020 13:08:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242183831705700/file160242183972906255')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:43 GMT',
  'ETag',
  '"0x8D86DE6C7CCBD50"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '66c1a5af-a01f-0017-25cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'ee2392ca-a5b0-4f21-a8d7-b976125e36b5',
  'Date',
  'Sun, 11 Oct 2020 13:08:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242183831705700/directory160242184177807351')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:43 GMT',
  'ETag',
  '"0x8D86DE6C7FB742C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a5b5-a01f-0017-2bcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '7b839343-6813-459f-819a-6ea726583e9a',
  'Date',
  'Sun, 11 Oct 2020 13:08:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242183831705700/directory160242184177807351/subdirectory1160242184177902176')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:44 GMT',
  'ETag',
  '"0x8D86DE6C828B970"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a5b6-a01f-0017-2ccf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '429ce099-4f38-4e2c-9be2-42a55a20d110',
  'Date',
  'Sun, 11 Oct 2020 13:08:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242183831705700/directory160242184177807351/subdirectory2160242184177903211')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:44 GMT',
  'ETag',
  '"0x8D86DE6C8553529"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a5bc-a01f-0017-32cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'c319d4c2-c2b5-4db8-81f9-9bd929af429e',
  'Date',
  'Sun, 11 Oct 2020 13:08:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242183831705700/directory160242184177807351/subdirectory1160242184177902176/fileName1160242184177901069')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:44 GMT',
  'ETag',
  '"0x8D86DE6C88364DA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a5c4-a01f-0017-3acf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '5bed7025-d0f2-4dfe-a52d-d5dc7de85d3d',
  'Date',
  'Sun, 11 Oct 2020 13:08:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242183831705700/directory160242184177807351/subdirectory1160242184177902176/fileName2160242184177902649')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:44 GMT',
  'ETag',
  '"0x8D86DE6C8B1C81E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a5cc-a01f-0017-42cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'b383b4cd-c48d-4101-9778-97fd2099bc29',
  'Date',
  'Sun, 11 Oct 2020 13:08:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242183831705700/directory160242184177807351/subdirectory2160242184177903211/fileName3160242184177909160')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:45 GMT',
  'ETag',
  '"0x8D86DE6C8DF5BD6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a5db-a01f-0017-51cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '24e3548b-6f81-4ec2-8b1f-bbfd9547f745',
  'Date',
  'Sun, 11 Oct 2020 13:08:44 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160242183831705700/directory160242184177807351/subdirectory2160242184177903211/fileName4160242184177900935')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 11 Oct 2020 13:08:45 GMT',
  'ETag',
  '"0x8D86DE6C90C4C69"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66c1a5e6-a01f-0017-5bcf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '0b69dbba-bf62-4462-8d3f-2530afa2f678',
  'Date',
  'Sun, 11 Oct 2020 13:08:45 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160242183831705700/directory160242184177807351')
  .query(true)
  .reply(200, {"directoriesSuccessful":3,"failedEntries":[],"failureCount":0,"filesSuccessful":4}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '66c1a5f0-a01f-0017-65cf-9f8ca2000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '42d4c62c-6b3e-4415-9f1e-9d6c0ee95424',
  'Date',
  'Sun, 11 Oct 2020 13:08:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160242183831705700')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76186488-601e-006a-35cf-9ffd81000000',
  'x-ms-client-request-id',
  'a9b3cda8-046c-4053-ad2b-0a0843550d42',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 13:08:45 GMT'
]);
