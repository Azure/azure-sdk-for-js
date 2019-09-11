let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816837689009687"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816837689009687')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '78a09858-6003-0044-0c47-68ba90000000',
  'x-ms-client-request-id',
  '321d0caf-d6cb-4e07-bee3-290880bd3a9a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:36 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816837689009687')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4535330-6003-000b-2247-687e88000000',
  'x-ms-client-request-id',
  '8951110e-c4d5-490b-a54b-ddb22ec87bb2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:41 GMT' ]);

