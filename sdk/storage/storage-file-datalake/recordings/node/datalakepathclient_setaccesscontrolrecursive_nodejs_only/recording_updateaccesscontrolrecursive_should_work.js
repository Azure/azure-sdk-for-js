let nock = require('nock');

module.exports.hash = "222a2d6b7912cbe80f9ec029e8d0c729";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159298729707709749","file":"file159298729740807310","directory":"directory159298729835108089","subdirectory1":"subdirectory1159298729835104792","fileName1":"fileName1159298729835106270","fileName2":"fileName2159298729835102557","subdirectory2":"subdirectory2159298729835103315","fileName3":"fileName3159298729835102659","fileName4":"fileName4159298729835104325"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729707709749')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:13 GMT',
  'ETag',
  '"0x8D818188978E29E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc4038-501e-0079-7101-4ab184000000',
  'x-ms-client-request-id',
  '50be1b19-f680-4b64-b383-53531c7923af',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:28:13 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729707709749/file159298729740807310')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:14 GMT',
  'ETag',
  '"0x8D8181889B4DD96"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85e0-901f-0014-7f01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'adcb5f03-fbcc-4519-ae29-65e7ef79263a',
  'Date',
  'Wed, 24 Jun 2020 08:28:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298729707709749/file159298729740807310', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9b1d85e1-901f-0014-8001-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'bf49058e-0216-44bb-bfe3-545580a7810c',
  'Date',
  'Wed, 24 Jun 2020 08:28:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298729707709749/file159298729740807310')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:14 GMT',
  'ETag',
  '"0x8D818188A0F4AB6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '9b1d85e2-901f-0014-0101-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '333e419e-288a-4899-afb3-87a89cad4541',
  'Date',
  'Wed, 24 Jun 2020 08:28:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729707709749/directory159298729835108089')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:15 GMT',
  'ETag',
  '"0x8D818188A3C3105"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85e4-901f-0014-0301-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'ddcad244-d4e7-4bb0-8aec-62bdec3327de',
  'Date',
  'Wed, 24 Jun 2020 08:28:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729707709749/directory159298729835108089/subdirectory1159298729835104792')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:15 GMT',
  'ETag',
  '"0x8D818188A83CBF4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85e7-901f-0014-0601-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '61601566-0535-4897-93ad-c51ad10ace89',
  'Date',
  'Wed, 24 Jun 2020 08:28:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729707709749/directory159298729835108089/subdirectory2159298729835103315')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:15 GMT',
  'ETag',
  '"0x8D818188AB105F4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85e8-901f-0014-0701-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'd0b94928-54ca-4a65-b5c8-57a062728f76',
  'Date',
  'Wed, 24 Jun 2020 08:28:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729707709749/directory159298729835108089/subdirectory1159298729835104792/fileName1159298729835106270')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:16 GMT',
  'ETag',
  '"0x8D818188AE3790B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85ea-901f-0014-0901-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '63d83b5a-0e49-41e2-8db8-aa8c48bdcbbe',
  'Date',
  'Wed, 24 Jun 2020 08:28:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729707709749/directory159298729835108089/subdirectory1159298729835104792/fileName2159298729835102557')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:16 GMT',
  'ETag',
  '"0x8D818188B102E3C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85eb-901f-0014-0a01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '4804c94c-5422-4011-9f06-263b97119ac6',
  'Date',
  'Wed, 24 Jun 2020 08:28:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729707709749/directory159298729835108089/subdirectory2159298729835103315/fileName3159298729835102659')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:16 GMT',
  'ETag',
  '"0x8D818188B430535"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85ec-901f-0014-0b01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '2926dcc9-97e9-4d69-950b-dd7525994a7f',
  'Date',
  'Wed, 24 Jun 2020 08:28:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298729707709749/directory159298729835108089/subdirectory2159298729835103315/fileName4159298729835104325')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:17 GMT',
  'ETag',
  '"0x8D818188B744126"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85ee-901f-0014-0c01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '8a0321d6-b33c-4d42-a1c0-4fbcf840ef66',
  'Date',
  'Wed, 24 Jun 2020 08:28:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298729707709749/directory159298729835108089')
  .query(true)
  .reply(200, {"directoriesSuccessful":3,"failedEntries":[],"failureCount":0,"filesSuccessful":4}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '9b1d85f0-901f-0014-0e01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '3b3c0805-9a2a-4cc3-9fea-158783ed111b',
  'Date',
  'Wed, 24 Jun 2020 08:28:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159298729707709749')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc4282-501e-0079-7c01-4ab184000000',
  'x-ms-client-request-id',
  '70226394-4ce9-411e-9605-5fb41117f08b',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:28:17 GMT'
]);
