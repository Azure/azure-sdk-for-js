let nock = require('nock');

module.exports.testInfo = {"container":"container156929885488600412","directory":"directory156929885606405160","directory_delete":"directory_delete156929885606505398"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929885488600412')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:16:33 GMT',
  'ETag',
  '"0x8D740A5FB940EA5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a0ef4e15-101e-0098-018e-72cba1000000',
  'x-ms-client-request-id',
  'ad339c74-cabf-4f50-a9b8-0f2403098709',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:32 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929885488600412/directory156929885606405160/directory_delete156929885606505398')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:34 GMT',
  'ETag',
  '"0x8D740A5FC4A6117"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '466553cb-401f-0065-7a8e-72f4c3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'cb464ace-a1c3-4234-a2f4-65486fbf4180',
  'Date',
  'Tue, 24 Sep 2019 04:16:34 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929885488600412/directory156929885606405160/directory_delete156929885606505398')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e916336b-c01f-005d-5c8e-72b59a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '2930058f-f95d-4c21-9803-5b8e4af6cba2',
  'Date',
  'Tue, 24 Sep 2019 04:16:34 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929885488600412')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18de6835-001e-008c-1b8e-7208c5000000',
  'x-ms-client-request-id',
  '92c01f3d-44b4-4af5-8944-06fa190cbd79',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:36 GMT' ]);
