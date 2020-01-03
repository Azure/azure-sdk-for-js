let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534386731605637","file":"file157534386845209076"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534386731605637')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:09 GMT',
  'ETag',
  '"0x8D777A066D12F72"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45732115-601e-0036-4989-a9e8cc000000',
  'x-ms-client-request-id',
  'a3c49785-771a-4c68-bf74-3590b4b91b4b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:09 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534386731605637/file157534386845209076')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:11 GMT',
  'ETag',
  '"0x8D777A0677F7B65"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '081a0a95-401f-006e-4989-a9ecb7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4ba8782a-b8f5-4d0f-8c62-d3869dc5778c',
  'Date',
  'Tue, 03 Dec 2019 03:25:10 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534386731605637/file157534386845209076', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '081a0a96-401f-006e-4a89-a9ecb7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'fafd73ac-a9de-4254-8355-3105f4150e40',
  'Date',
  'Tue, 03 Dec 2019 03:25:10 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534386731605637/file157534386845209076')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:11 GMT',
  'ETag',
  '"0x8D777A067DE3B62"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '081a0a97-401f-006e-4b89-a9ecb7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '664aa212-389d-42d5-b2a0-923872bbfbd6',
  'Date',
  'Tue, 03 Dec 2019 03:25:11 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534386731605637/file157534386845209076')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:11 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A067DE3B62"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61673566-201e-0075-6089-a9c225000000',
  'x-ms-client-request-id',
  '590b372a-aeff-43a8-bade-fe0490267c39',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:25:11 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:25:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534386731605637')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '457326e2-601e-0036-2989-a9e8cc000000',
  'x-ms-client-request-id',
  '9568dc51-e376-49dc-b7fe-e80b817bb0d1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:12 GMT' ]);
