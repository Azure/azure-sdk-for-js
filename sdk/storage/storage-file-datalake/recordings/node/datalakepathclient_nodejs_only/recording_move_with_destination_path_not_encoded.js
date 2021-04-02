let nock = require('nock');

module.exports.hash = "e36c60ee32a191bc54541d10e09e0c5c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160875819810407040","file":"file160875819820007595","dest file with & and 2/char":"dest file with & and 2/char160875819857802304"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819810407040')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:38 GMT',
  'ETag',
  '"0x8D8A78809065FDB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592876-301e-0070-4f70-d9b64b000000',
  'x-ms-client-request-id',
  '04466ffc-f5ff-46f3-8f2f-e2632c015860',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:38 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819810407040/file160875819820007595')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:38 GMT',
  'ETag',
  '"0x8D8A7880917387A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93e7-c01f-0008-4470-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '75e651e7-b3e1-47d2-9722-ee34f8f85616',
  'Date',
  'Wed, 23 Dec 2020 21:16:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819810407040/file160875819820007595', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'd00c93e8-c01f-0008-4570-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '98f60625-9a1b-494e-802d-a896cb5cbfae',
  'Date',
  'Wed, 23 Dec 2020 21:16:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160875819810407040/file160875819820007595')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:38 GMT',
  'ETag',
  '"0x8D8A78809335CC3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'd00c93e9-c01f-0008-4670-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'a2fff510-cdeb-4c6f-939f-0dd326cb8bc4',
  'Date',
  'Wed, 23 Dec 2020 21:16:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819810407040/dest%20file%20with%20%26%20and%202')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:38 GMT',
  'ETag',
  '"0x8D8A78809410DB5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93ea-c01f-0008-4770-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'cec30400-bec1-40dd-bace-3b53d7ed0f9f',
  'Date',
  'Wed, 23 Dec 2020 21:16:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160875819810407040/dest%20file%20with%20%26%20and%202/char160875819857802304')
  .query(true)
  .reply(201, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd00c93eb-c01f-0008-4870-d9defc000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '64226d28-611e-4dad-a943-59d7ac47f586',
  'Date',
  'Wed, 23 Dec 2020 21:16:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160875819810407040/dest%20file%20with%20%26%20and%202%2Fchar160875819857802304')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 23 Dec 2020 21:16:38 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8A78809335CC3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592947-301e-0070-7870-d9b64b000000',
  'x-ms-client-request-id',
  '9dcbf3cf-70df-4cd8-9e4e-fabc1e7f4728',
  'x-ms-version',
  '2020-02-10',
  'x-ms-creation-time',
  'Wed, 23 Dec 2020 21:16:38 GMT',
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
  'Wed, 23 Dec 2020 21:16:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160875819810407040')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f592962-301e-0070-0d70-d9b64b000000',
  'x-ms-client-request-id',
  'edfe9ad6-93cf-4a4a-8669-470c7f4edcee',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 23 Dec 2020 21:16:38 GMT'
]);
