let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534366009804406","file0":"file0157534366124101570","file1":"file1157534366237605107"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534366009804406')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:42 GMT',
  'ETag',
  '"0x8D7779FEB4E6847"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7452e27d-401e-00a9-7388-a99076000000',
  'x-ms-client-request-id',
  '4e81ca2c-5a59-4528-b710-f9716dad6ab9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:42 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534366009804406/file0157534366124101570')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:43 GMT',
  'ETag',
  '"0x8D7779FEBFE8D54"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7bdec814-901f-0067-7c88-a9f639000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b97a0f35-51b9-4f60-b264-0f094713af91',
  'Date',
  'Tue, 03 Dec 2019 03:21:43 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534366009804406/file1157534366237605107')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:45 GMT',
  'ETag',
  '"0x8D7779FECA9FC79"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb9d845f-b01f-0052-3c88-a9586c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6dd0c258-be8f-4dbe-b2e7-66a787573535',
  'Date',
  'Tue, 03 Dec 2019 03:21:44 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534366009804406')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D7779FEBFE8D54","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:43 GMT","name":"file0157534366124101570","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FECA9FC79","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:45 GMT","name":"file1157534366237605107","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '965a7883-401f-0003-1288-a94699000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a0bb7e88-0c45-49bc-874e-5b894603a670',
  'Date',
  'Tue, 03 Dec 2019 03:21:45 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534366009804406/file0157534366124101570')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7bdec816-901f-0067-7e88-a9f639000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '70ef272e-acce-40c1-8d49-c90dff5ce8a1',
  'Date',
  'Tue, 03 Dec 2019 03:21:45 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534366009804406/file1157534366237605107')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb9d8460-b01f-0052-3d88-a9586c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'db579c2d-59b6-4e1f-b340-4d14a0fd1128',
  'Date',
  'Tue, 03 Dec 2019 03:21:45 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534366009804406')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7452eac5-401e-00a9-6588-a99076000000',
  'x-ms-client-request-id',
  'fade9e5d-5bc8-493d-a469-2852bfd71daf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:47 GMT' ]);
