let nock = require('nock');

module.exports.hash = "b9e319e034f6ed35a190c49bc59ccc0b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A49.8959106Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-06-04T21:59:49.8959106Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A49.9279334Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-06-04T21:59:49.9279334Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.2371531Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-06-04T21:59:50.2371531Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.2681752Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-06-04T21:59:50.2681752Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.3082041Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-06-04T21:59:50.3082041Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.3402268Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-06-04T21:59:50.3402268Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.3712484Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-06-04T21:59:50.3712484Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.4182823Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-06-04T21:59:50.4182823Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.4493039Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-06-04T21:59:50.4493039Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.480326Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-06-04T21:59:50.480326Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.514351Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-06-04T21:59:50.514351Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.5463733Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-06-04T21:59:50.5463733Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A49.9609569Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-06-04T21:59:49.9609569Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A49.9909782Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-06-04T21:59:49.9909782Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.0220002Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-06-04T21:59:50.0220002Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.0540239Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-06-04T21:59:50.0540239Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.0870465Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-06-04T21:59:50.0870465Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.1170678Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-06-04T21:59:50.1170678Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.1651019Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-06-04T21:59:50.1651019Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A50.2031294Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-06-04T21:59:50.2031294Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A49.864889Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-06-04T21:59:49.864889Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0ba3-c002-0024-0c8c-5918f1000000',
  'x-ms-client-request-id',
  '5e2a27b1-f251-40f5-ba49-bd0349b8ee49',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:49 GMT' ]);
