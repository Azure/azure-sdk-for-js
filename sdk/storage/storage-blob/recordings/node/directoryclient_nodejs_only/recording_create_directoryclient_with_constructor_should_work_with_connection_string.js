let nock = require('nock');

module.exports.testInfo = {"container":"container156929859040805985","directory":"directory156929859156305297"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929859040805985')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:12:08 GMT',
  'ETag',
  '"0x8D740A55DF044C5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41ffa933-001e-0040-0a8e-726c70000000',
  'x-ms-client-request-id',
  'eee6b422-6e63-4c79-b693-347537c30642',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:08 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929859040805985/directory156929859156305297')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:09 GMT',
  'ETag',
  '"0x8D740A55EA1850B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9d6a221c-201f-007e-528e-72da51000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f87b8266-e378-45d5-ad52-d22ae2835207',
  'Date',
  'Tue, 24 Sep 2019 04:12:09 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929859040805985/directory156929859156305297')
  .query(true)
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '60eed63a-101f-0039-088e-72053a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '545b8aee-e31a-4070-a3dd-99be99512731',
  'Date',
  'Tue, 24 Sep 2019 04:12:10 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929859040805985')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a788e44-f01e-007c-798e-72d8ab000000',
  'x-ms-client-request-id',
  'a1c7cab9-a466-48cc-a728-1ffb9e7f39ed',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:11 GMT' ]);
