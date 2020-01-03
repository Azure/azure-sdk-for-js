let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534386383909783","file":"file157534386498609868"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534386383909783')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:06 GMT',
  'ETag',
  '"0x8D777A064BF8EE8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '494af90d-d01e-0060-1a89-a900bc000000',
  'x-ms-client-request-id',
  '02fdde7e-3f2e-4318-b61d-29ef60bf2eaa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:06 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534386383909783/file157534386498609868')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:07 GMT',
  'ETag',
  '"0x8D777A0656F03D4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b135ce8-a01f-0046-6a89-a99b08000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4c6bf7b9-0d41-46c5-b8d0-7c4573fddcf3',
  'Date',
  'Tue, 03 Dec 2019 03:25:07 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534386383909783/file157534386498609868', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9b135ce9-a01f-0046-6b89-a99b08000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0a655f00-c57b-45d4-ba9a-1530ae053640',
  'Date',
  'Tue, 03 Dec 2019 03:25:07 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534386383909783/file157534386498609868')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:08 GMT',
  'ETag',
  '"0x8D777A065CBC729"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9b135cea-a01f-0046-6c89-a99b08000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8bc0045a-3a7a-47a4-bc6e-adedd35b0ace',
  'Date',
  'Tue, 03 Dec 2019 03:25:08 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534386383909783/file157534386498609868')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b135ceb-a01f-0046-6d89-a99b08000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '22d190cb-6127-409c-bd6e-e13d30341533',
  'Date',
  'Tue, 03 Dec 2019 03:25:08 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534386383909783')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '494afe65-d01e-0060-7589-a900bc000000',
  'x-ms-client-request-id',
  '63a72f33-9e80-4c8b-86c0-064c0e22d2ec',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:08 GMT' ]);
