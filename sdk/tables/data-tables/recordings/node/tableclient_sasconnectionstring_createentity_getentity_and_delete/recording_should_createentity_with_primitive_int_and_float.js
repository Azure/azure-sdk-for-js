let nock = require('nock');

module.exports.hash = "b49793bd1dd08ef55a2ddc4aa2808065";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P8_node","RowKey":"R8","integerNumber":3,"floatingPointNumber":3.14})
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  'W/"datetime\'2021-06-04T21%3A59%3A51.7392221Z\'"',
  'Location',
  'https://fakestorageaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey=\'P8_node\',RowKey=\'R8\')',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c82-c002-0024-5d8c-5918f1000000',
  'x-ms-client-request-id',
  '9aa72cf3-e72a-4630-80c5-057dd931b748',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  'https://fakestorageaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey=\'P8_node\',RowKey=\'R8\')',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A51.7392221Z'\"","PartitionKey":"P8_node","RowKey":"R8","Timestamp":"2021-06-04T21:59:51.7392221Z","integerNumber":3,"floatingPointNumber":3.14}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  'W/"datetime\'2021-06-04T21%3A59%3A51.7392221Z\'"',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c86-c002-0024-618c-5918f1000000',
  'x-ms-client-request-id',
  '87e5abeb-48ac-42dc-ba56-574007d0d57c',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')`)
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c89-c002-0024-648c-5918f1000000',
  'x-ms-client-request-id',
  '2f6c20ef-8a4a-413f-9406-48141ff1029b',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);
