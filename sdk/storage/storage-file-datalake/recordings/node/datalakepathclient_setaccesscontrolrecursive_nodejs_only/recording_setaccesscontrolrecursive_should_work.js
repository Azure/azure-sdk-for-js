let nock = require('nock');

module.exports.hash = "65ce8cbb88ad92985b2e7763931c1281";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159298727332401931","file":"file159298727482908583","directory":"directory159298727693508662","subdirectory1":"subdirectory1159298727693508158","fileName1":"fileName1159298727693502206","fileName2":"fileName2159298727693500429","subdirectory2":"subdirectory2159298727693503813","fileName3":"fileName3159298727693501266","fileName4":"fileName4159298727693506498"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298727332401931')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:51 GMT',
  'ETag',
  '"0x8D818187BF44EA9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc33df-501e-0079-6101-4ab184000000',
  'x-ms-client-request-id',
  'fcf58538-3ad4-4d0e-bb51-a8cfbf351fbb',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:27:50 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298727332401931/file159298727482908583')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:52 GMT',
  'ETag',
  '"0x8D818187CDFA7D5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d859f-901f-0014-4701-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '87e5c53c-0400-4610-9c45-9107bea70a62',
  'Date',
  'Wed, 24 Jun 2020 08:27:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298727332401931/file159298727482908583', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9b1d85a0-901f-0014-4801-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '25fce1dc-f5cd-4a38-9d76-930970f95fd2',
  'Date',
  'Wed, 24 Jun 2020 08:27:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298727332401931/file159298727482908583')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:53 GMT',
  'ETag',
  '"0x8D818187D4AD4F2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '9b1d85a1-901f-0014-4901-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '8bf5a818-9b6b-4611-927c-06ae43414fdb',
  'Date',
  'Wed, 24 Jun 2020 08:27:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298727332401931/directory159298727693508662')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:53 GMT',
  'ETag',
  '"0x8D818187D7CE77E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85a2-901f-0014-4a01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ed793132-62db-43a8-9a0c-dc5810c16acb',
  'Date',
  'Wed, 24 Jun 2020 08:27:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298727332401931/directory159298727693508662/subdirectory1159298727693508158')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:53 GMT',
  'ETag',
  '"0x8D818187DAEFC92"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85a3-901f-0014-4b01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '5791894d-4eb6-4f1f-8b3c-e1d653ce3179',
  'Date',
  'Wed, 24 Jun 2020 08:27:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298727332401931/directory159298727693508662/subdirectory2159298727693503813')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:54 GMT',
  'ETag',
  '"0x8D818187DDD5909"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85a4-901f-0014-4c01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ecf764df-98eb-4115-a023-bc3e245ce68e',
  'Date',
  'Wed, 24 Jun 2020 08:27:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298727332401931/directory159298727693508662/subdirectory1159298727693508158/fileName1159298727693502206')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:54 GMT',
  'ETag',
  '"0x8D818187E0C40B2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85a5-901f-0014-4d01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '1f9f9fd8-3b32-4fad-936a-437eb52c40c0',
  'Date',
  'Wed, 24 Jun 2020 08:27:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298727332401931/directory159298727693508662/subdirectory1159298727693508158/fileName2159298727693500429')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:55 GMT',
  'ETag',
  '"0x8D818187E4E18E9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85a6-901f-0014-4e01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '82ac3ee7-d234-4ba9-9c7c-90cfeb0cda67',
  'Date',
  'Wed, 24 Jun 2020 08:27:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298727332401931/directory159298727693508662/subdirectory2159298727693503813/fileName3159298727693501266')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:55 GMT',
  'ETag',
  '"0x8D818187E80975C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85a7-901f-0014-4f01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '40e28737-3b74-4f11-981c-22c5b54c0547',
  'Date',
  'Wed, 24 Jun 2020 08:27:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298727332401931/directory159298727693508662/subdirectory2159298727693503813/fileName4159298727693506498')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:27:55 GMT',
  'ETag',
  '"0x8D818187EAEDC27"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85a8-901f-0014-5001-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '2015b950-e4cf-48a8-b94b-05a84a8d14e7',
  'Date',
  'Wed, 24 Jun 2020 08:27:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298727332401931/directory159298727693508662')
  .query(true)
  .reply(200, {"directoriesSuccessful":3,"failedEntries":[],"failureCount":0,"filesSuccessful":4}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '9b1d85a9-901f-0014-5101-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '0542daf6-ac14-4d15-a905-e8b143c4146e',
  'Date',
  'Wed, 24 Jun 2020 08:27:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159298727332401931')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc3753-501e-0079-1901-4ab184000000',
  'x-ms-client-request-id',
  '8614675a-fa8d-47da-a7c5-7528bae73d2c',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:27:58 GMT'
]);
