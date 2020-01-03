let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534394349306686","blob empty":"blob empty157534394464904461"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534394349306686')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:26 GMT',
  'ETag',
  '"0x8D777A0943A0DA9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e16bc341-401e-00a2-6189-a98802000000',
  'x-ms-client-request-id',
  '65f36632-21d8-4151-af18-9358fcf7e3a8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:25 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534394349306686/blob%20empty157534394464904461')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:26:27 GMT',
  'ETag',
  '"0x8D777A094EAED4E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93784fdd-601f-0072-5289-a934a0000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '37577c35-2e50-42e8-9224-2f4ac42ed068',
  'Date',
  'Tue, 03 Dec 2019 03:26:26 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534394349306686')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A094EAED4E","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:26:27 GMT","name":"blob empty157534394464904461","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9493129f-d01f-0049-1289-a976fe000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '30173939-e559-44b1-9dfa-561a1f366e6d',
  'Date',
  'Tue, 03 Dec 2019 03:26:27 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534394349306686')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e16bc844-401e-00a2-7389-a98802000000',
  'x-ms-client-request-id',
  '1f4614a0-daf9-40bc-9600-91f8be233995',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:28 GMT' ]);
