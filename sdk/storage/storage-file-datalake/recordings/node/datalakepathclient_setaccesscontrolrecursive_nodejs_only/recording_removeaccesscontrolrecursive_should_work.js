let nock = require('nock');

module.exports.hash = "794dc378a98569ef8810d38bbf041355";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem159298730157907087","file":"file159298730189400395","directory":"directory159298730306704482","subdirectory1":"subdirectory1159298730306701246","fileName1":"fileName1159298730306700694","fileName2":"fileName2159298730306701485","subdirectory2":"subdirectory2159298730306709620","fileName3":"fileName3159298730306707588","fileName4":"fileName4159298730306701561"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298730157907087')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:18 GMT',
  'ETag',
  '"0x8D818188C287B26"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc42ba-501e-0079-2d01-4ab184000000',
  'x-ms-client-request-id',
  '9d418198-1e04-45fe-853e-ddb31ca250ea',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:28:17 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298730157907087/file159298730189400395')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:18 GMT',
  'ETag',
  '"0x8D818188C71A7F4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85f1-901f-0014-0f01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '01f38910-2e96-44af-a092-347e30c1b8c2',
  'Date',
  'Wed, 24 Jun 2020 08:28:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298730157907087/file159298730189400395', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9b1d85f2-901f-0014-1001-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '29465c8a-5597-4860-9bf9-8b3ba527897e',
  'Date',
  'Wed, 24 Jun 2020 08:28:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298730157907087/file159298730189400395')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:19 GMT',
  'ETag',
  '"0x8D818188CDF5869"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '9b1d85f3-901f-0014-1101-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'c0e29451-9df0-411b-8ff7-fb2fcac742e2',
  'Date',
  'Wed, 24 Jun 2020 08:28:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298730157907087/directory159298730306704482')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:19 GMT',
  'ETag',
  '"0x8D818188D0BE01A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85f4-901f-0014-1201-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '6b6c8161-f7a1-4e11-bc09-90deebf9e32d',
  'Date',
  'Wed, 24 Jun 2020 08:28:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298730157907087/directory159298730306704482/subdirectory1159298730306701246')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:20 GMT',
  'ETag',
  '"0x8D818188D83994A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85f5-901f-0014-1301-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '35b79adc-845f-4f75-973e-7b5bde337234',
  'Date',
  'Wed, 24 Jun 2020 08:28:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298730157907087/directory159298730306704482/subdirectory2159298730306709620')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:20 GMT',
  'ETag',
  '"0x8D818188DB01549"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85f7-901f-0014-1401-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '826dff5d-433b-4d09-a0db-5dec7b59e297',
  'Date',
  'Wed, 24 Jun 2020 08:28:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298730157907087/directory159298730306704482/subdirectory1159298730306701246/fileName1159298730306700694')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:21 GMT',
  'ETag',
  '"0x8D818188DE23993"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85f8-901f-0014-1501-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'd5ac4fd3-e8a6-4b2a-9ca0-0f06b8529d54',
  'Date',
  'Wed, 24 Jun 2020 08:28:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298730157907087/directory159298730306704482/subdirectory1159298730306701246/fileName2159298730306701485')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:21 GMT',
  'ETag',
  '"0x8D818188E0F870D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85f9-901f-0014-1601-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '2261878b-4339-421d-8d9f-e562c54231af',
  'Date',
  'Wed, 24 Jun 2020 08:28:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298730157907087/directory159298730306704482/subdirectory2159298730306709620/fileName3159298730306707588')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:21 GMT',
  'ETag',
  '"0x8D818188E3C967D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85fa-901f-0014-1701-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'eeb59d96-b715-4575-be93-954b654a4850',
  'Date',
  'Wed, 24 Jun 2020 08:28:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem159298730157907087/directory159298730306704482/subdirectory2159298730306709620/fileName4159298730306701561')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 24 Jun 2020 08:28:22 GMT',
  'ETag',
  '"0x8D818188E6965E9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b1d85fd-901f-0014-1801-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'defd284e-5cd0-4143-b363-427196467d6f',
  'Date',
  'Wed, 24 Jun 2020 08:28:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298730157907087/directory159298730306704482')
  .query(true)
  .reply(200, {"directoriesSuccessful":3,"failedEntries":[],"failureCount":0,"filesSuccessful":4}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '9b1d85fe-901f-0014-1901-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'b8ec8a1e-51f4-491c-9b0c-d88bfaf0e916',
  'Date',
  'Wed, 24 Jun 2020 08:28:22 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem159298730157907087/directory159298730306704482')
  .query(true)
  .reply(200, {"directoriesSuccessful":3,"failedEntries":[],"failureCount":0,"filesSuccessful":4}, [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '9b1d85ff-901f-0014-1a01-4a05cf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '0223764a-0951-4b51-9f91-97c2567aa784',
  'Date',
  'Wed, 24 Jun 2020 08:28:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem159298730157907087')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e9cc4525-501e-0079-4701-4ab184000000',
  'x-ms-client-request-id',
  '2bf7f73e-d835-4423-8323-d04284ae08f9',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Wed, 24 Jun 2020 08:28:22 GMT'
]);
