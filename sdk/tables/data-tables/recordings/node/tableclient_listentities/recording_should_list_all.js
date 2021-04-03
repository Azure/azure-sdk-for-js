let nock = require('nock');

module.exports.hash = "8e15d2dac179f224c38789d565ffc6e6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode","value":[{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A54.9664808Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-02-01T20:58:54.9664808Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.0905677Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-02-01T20:58:55.0905677Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.4898469Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-02-01T20:58:55.4898469Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.5829129Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-02-01T20:58:55.5829129Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.6279441Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-02-01T20:58:55.6279441Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.7630387Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-02-01T20:58:55.7630387Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.8310859Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-02-01T20:58:55.8310859Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.8651106Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-02-01T20:58:55.8651106Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A56.0122132Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-02-01T20:58:56.0122132Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A56.1022759Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-02-01T20:58:56.1022759Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A56.1322973Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-02-01T20:58:56.1322973Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A56.1663212Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-02-01T20:58:56.1663212Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.1205887Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-02-01T20:58:55.1205887Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.1876357Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-02-01T20:58:55.1876357Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.2176567Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-02-01T20:58:55.2176567Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.2616875Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-02-01T20:58:55.2616875Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.318727Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-02-01T20:58:55.318727Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.3697637Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-02-01T20:58:55.3697637Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.400785Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-02-01T20:58:55.400785Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A55.4358095Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-02-01T20:58:55.4358095Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A54.9254524Z'\"","PartitionKey":"listEntitiesTest","RowKey":"binary1","Timestamp":"2021-02-01T20:58:54.9254524Z","foo@odata.type":"Edm.Binary","foo":"QmFy"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa565-2002-00b8-1fdd-f8a3cb000000',
  'x-ms-client-request-id',
  'a68e3d3d-2918-4f7e-89f0-479b261f2b23',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 01 Feb 2021 20:58:55 GMT'
]);
