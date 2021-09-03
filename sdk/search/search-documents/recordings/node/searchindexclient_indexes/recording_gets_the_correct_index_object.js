let nock = require('nock');

module.exports.hash = "a01fab4c4678e48d6f5bd8c1d901514e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f7efaf4e9a70f1f9c1cec9cdc3bf97d3fa256cb6c91d3d7f3aacdcbedb2b8ccb7d1ed3dfa66969f67ebb27d3dadea6279f1b2aece8b929a2ed76539fae8bcc8cb59f3d1a3effd6203a198d13bedf50abf9fce16e3d72d5ea3cf04ed6c8297cfb3b2c9f176d9e675f0519d53fbfc523e6beb357dd454752b7f6b9bf36c4aa3f13f799b5f9bd64c80e365565eff20af0d9ad277f7d3acf3f7b2aa175959789f34d7cb6a79bdf8225b618cdfff25233bccec2a6faa45becc9be6797e999734406fd04fab35d02300dc7180ab3f684179e398e56f6fc8f2018f5821fe90863ccb9b695dacdaa25ad2c8bcd146a758d0f407abd86e1cadb6f186ab9ffc9c8cb7cd8ab2a17179633da916ab327ff7069f109e3df62729f3de38a9ca329f82625b7859087587be176c65844283ffef51caa7d5bc98cdf2e577f3e262ded2f074f818f3d9b2bdb7471f49af01a6370d593ffb7fd598e9a34011f2c7a38fe8b3e64b160dfa405f5d5f5c900acd6bfa044d4c67faa7eb4b3f68abb7f9b2fbf73326917e42e4ab830ff2e5b4bee65e7f2f1040fb2d164599d550fe8fac55d109f9f12f8a695d35d5793b3efec1bacec7af992ee3275fecdd7fedde2382ee1a7013f9e597fc92ff07c16992eda2060000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D96DD697C80C3C"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '0985ffa5-1019-462b-8eae-92f63cfbc6fd',
  'elapsed-time',
  '21',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Thu, 02 Sep 2021 05:57:52 GMT',
  'Content-Length',
  '656'
]);
