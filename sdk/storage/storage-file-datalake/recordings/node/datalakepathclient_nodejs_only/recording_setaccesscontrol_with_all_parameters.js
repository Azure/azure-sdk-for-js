let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534403990502041","file":"file157534404104502060"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534403990502041')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:28:02 GMT',
  'ETag',
  '"0x8D777A0CDB0AAC4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c68580e1-701e-0088-0289-a9fd47000000',
  'x-ms-client-request-id',
  '03adb8b5-b766-44d6-85a6-560b6dfb3d53',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:01 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534403990502041/file157534404104502060')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:03 GMT',
  'ETag',
  '"0x8D777A0CE5F726D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71ea2e9c-d01f-0042-2389-a96e8a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4ff592e3-390b-44cb-9cad-78cbe10d94bf',
  'Date',
  'Tue, 03 Dec 2019 03:28:03 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534403990502041/file157534404104502060', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '71ea2e9d-d01f-0042-2489-a96e8a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '5c1960f4-98fa-48c0-9619-12047684dff5',
  'Date',
  'Tue, 03 Dec 2019 03:28:03 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534403990502041/file157534404104502060')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:04 GMT',
  'ETag',
  '"0x8D777A0CEBF688D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '71ea2e9e-d01f-0042-2589-a96e8a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '327ba6c0-66e7-4bb4-8cc2-3b367da8b6a3',
  'Date',
  'Tue, 03 Dec 2019 03:28:03 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534403990502041/file157534404104502060')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:04 GMT',
  'ETag',
  '"0x8D777A0CEBF688D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '71ea2e9f-d01f-0042-2689-a96e8a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '670c23f0-cf60-4f47-9cd2-7335e22e666e',
  'Date',
  'Tue, 03 Dec 2019 03:28:04 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534403990502041/file157534404104502060')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:04 GMT',
  'ETag',
  '"0x8D777A0CEBF688D"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'x-ms-request-id',
  '71ea2ea0-d01f-0042-2789-a96e8a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6427faf8-a059-4905-9fe5-548dbf2b632f',
  'Date',
  'Tue, 03 Dec 2019 03:28:04 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534403990502041')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c6858706-701e-0088-1789-a9fd47000000',
  'x-ms-client-request-id',
  'e72ca353-5f45-446f-ae30-31b13e3751d5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:04 GMT' ]);
