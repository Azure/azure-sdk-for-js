let nock = require('nock');

module.exports.hash = "298ceefc43a5fa4c41e465163b36cda2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P2_node","RowKey":"R1","testField":"testEntity"})
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  'W/"datetime\'2021-06-04T21%3A59%3A50.9846844Z\'"',
  'Location',
  'https://fakestorageaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey=\'P2_node\',RowKey=\'R1\')',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c02-c002-0024-688c-5918f1000000',
  'x-ms-client-request-id',
  '633324f9-f529-4b0b-b1bb-4db70229ff29',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  'https://fakestorageaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey=\'P2_node\',RowKey=\'R1\')',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P2_node',RowKey='R1')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.9846844Z'\"","PartitionKey":"P2_node","RowKey":"R1","Timestamp":"2021-06-04T21:59:50.9846844Z","testField":"testEntity"}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  'W/"datetime\'2021-06-04T21%3A59%3A50.9846844Z\'"',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c0f-c002-0024-758c-5918f1000000',
  'x-ms-client-request-id',
  '0f1891c9-2147-4a51-8f8f-9fe3f641f16f',
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
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P2_node',RowKey='R1')`)
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c13-c002-0024-798c-5918f1000000',
  'x-ms-client-request-id',
  '6c9dca1c-01b8-424f-95ea-b3ea9329cdb4',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);
