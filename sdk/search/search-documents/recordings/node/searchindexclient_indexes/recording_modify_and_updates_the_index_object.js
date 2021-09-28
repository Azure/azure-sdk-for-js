let nock = require('nock');

module.exports.hash = "b245b95d080a6176fe78be0672431373";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eecedee3ddc39d939d83938fe7d3fa256cb6c91d3d7f3aacdcbedb2b8ccb7d1ed3dfa66969f67ebb27d3dadea6279f1b2aece8b929a2ed76539fae8bcc8cb59f3d1a3effd6203a198d13bedf50abf9fce16e3d72d5ea3cf04ed6c8297cfb3b2c9f176d9e675f0519d53fbfc523e6beb357dd454752b7f6b9bf36c4aa3f13f799b5f9bd64c80e365565eff20af0d9ad277f7d3acf3f7b2aa175959789f34d7cb6a79bdf8225b618cdfff25233bccec2a6faa45becc9be6797e999734406fd04fab35d02300dc7180ab3f684179e398e56f6fc8f2018f5821fe90863ccb9b695dacdaa25ad2c8bcd146a758d0f407abd86e1cadb6f186ab9ffc9c8cb7cd8ab2a17179633da916ab327ff7069f109e3df62729f3de38a9ca329f82625b7859087587be176c65844283ffef51caa7d5bc98cdf2e577f3e262ded2f074f818f3d9b2bdb7471f49af01a6370d593ffb7fd598e9a34011f2c7a38fe8b3e64b160dfa405f5d5f5c900acd6bfa044d4c67faa7eb4b3f68abb7f9b2fbf73326917e42e4ab830ff2e5b4bee65e7f2f1040fb2d164599d550fe8fac55d109f9f12f8a695d35d5793b3efec1bacec7af992ee3275fecdd7fedde2382ee1a7013f9e597fc92ff07b6386d4ca2060000"], [
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
  'W/"0x8D9821290C0808A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '1c3142df-486a-46eb-b463-c0b001e59f46',
  'elapsed-time',
  '25',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:57:33 GMT',
  'Content-Length',
  '655'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test3%27)', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"normalizers":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"@odata.etag":"\"0x8D981FCC77591AF\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eecedee3dbcb7bff3e0ded3a7bfef47d46a992d72fa7a5eb579b95d1697f936babd47dfccf2f36c5db6afa7555d2c2f5ed6d5795152d3e5ba2c471f9d1779396b3e7af4bd5f6c2014337aa7bd5ee1f7d3d962fcbac56bf499a09d4df0f279563639de2edbbc0e3eaa736a9f5fca676dbda68f9aaa6ee56f6d739e4d6934fe276ff36bd39a0970bccccaeb1fe4b54153faee7e9a75fe5e56f5222b0bef93e67a592daf175f642b8cf1fbbf646487995de54db5c89779d33ccf2ff39206e80dfa69b5067a04803b0e70f5072d286f1cb3fced0d593ee0112bc41fd290677933ad8b555b544b1a9937dae8140b9afe6015db8da3d536de70f5939f93f1b6595136342e6fac27d56255e6efdee013c2b3c7fe2465de1b275559e653506c0b2f0ba1eed0f782ad8c5068f0ff3d4af9b49a17b359befc6e5e5ccc5b1a9e0e1f633e5bb6f7f6e823e935c0f4a621eb67ff6f1ab31b719935ed572b52adf9eccb8e3c3ca50fdf148bfccbf3f3260739a4f700637fec32b5c1d0e5a3ff378dfcfbf4516002f8e3d147f459f3252b05fa405f5d5f5c90f1c86bfa044d4c67faa7eb4b3f68abb7f9b2fbf73326907e42c4ab830ff2e5b4bee65e7f2f1040fb2d164599d5307b8fac3dd579f9f12f8a695d35d5793b3efec1bacec7af992ee3275fecdd7fedde2382ee1a7013f9e597fc92ff07782a17d79c070000"], [
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
  'W/"0x8D98212934073DD"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '6ac29596-43ab-42cf-8197-d0e8c31e7568',
  'elapsed-time',
  '107',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:57:33 GMT',
  'Content-Length',
  '700'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eecedee3dbcb7bff3e0ded3a7bfef47d46a992d72fa7a5eb579b95d1697f936babd47dfccf2f36c5db6afa7555d2c2f5ed6d5795152d3e5ba2c471f9d1779396b3e7af4bd5f6c2014337aa7bd5ee1f7d3d962fcbac56bf499a09d4df0f279563639de2edbbc0e3eaa736a9f5fca676dbda68f9aaa6ee56f6d739e4d6934fe276ff36bd39a0970bccccaeb1fe4b54153faee7e9a75fe5e56f5222b0bef93e67a592daf175f642b8cf1fbbf646487995de54db5c89779d33ccf2ff39206e80dfa69b5067a04803b0e70f5072d286f1cb3fced0d593ee0112bc41fd290677933ad8b555b544b1a9937dae8140b9afe6015db8da3d536de70f5939f93f1b6595136342e6fac27d56255e6efdee013c2b3c7fe2465de1b275559e653506c0b2f0ba1eed0f782ad8c5068f0ff3d4af9b49a17b359befc6e5e5ccc5b1a9e0e1f633e5bb6f7f6e823e935c0f4a621eb67ff6f1ab31b719935ed572b52adf9eccb8e3c3ca50fdf148bfccbf3f3260739a4f700637fec32b5c1d0e5a3ff378dfcfbf4516002f8e3d147f459f3252b05fa405f5d5f5c90f1c86bfa044d4c67faa7eb4b3f68abb7f9b2fbf73326907e42c4ab830ff2e5b4bee65e7f2f1040fb2d164599d5307b8fac3dd579f9f12f8a695d35d5793b3efec1bacec7af992ee3275fecdd7fedde2382ee1a7013f9e597fc92ff07782a17d79c070000"], [
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
  'W/"0x8D98212934073DD"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '641ee39b-a260-4065-841b-71141697a98c',
  'elapsed-time',
  '16',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:57:33 GMT',
  'Content-Length',
  '700'
]);
