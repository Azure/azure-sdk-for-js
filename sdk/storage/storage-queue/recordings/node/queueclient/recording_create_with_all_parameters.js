let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816834081409591","queue156816834081409591":"queue156816834081409591156816834123508736"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816834081409591')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'de6bb969-5003-0065-4247-68d7a1000000',
  'x-ms-client-request-id',
  'ea00f5c2-595b-4446-8ed0-bc8225d62105',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:00 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816834081409591156816834123508736')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '78a069fb-6003-0044-5647-68ba90000000',
  'x-ms-client-request-id',
  '753c8f3f-7876-493d-b3a6-43c3e62389f3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:01 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156816834081409591156816834123508736')
  .query(true)
  .reply(200, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4532996-6003-000b-2847-687e88000000',
  'x-ms-client-request-id',
  '05eae95d-9e90-42e3-9219-1f383ff1ad00',
  'x-ms-version',
  '2019-02-02',
  'x-ms-approximate-messages-count',
  '0',
  'x-ms-meta-key',
  'value',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-approximate-messages-count,Cache-Control,x-ms-meta-key,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:01 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816834081409591')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31a4ff5d-b003-002b-3647-681244000000',
  'x-ms-client-request-id',
  'f0bb79e8-8adb-4f49-834f-30493a8aac2b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:01 GMT' ]);

