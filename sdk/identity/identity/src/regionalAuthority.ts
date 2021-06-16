// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Helps specify a regional authority, or "autoDiscoverRegion" to auto-detect the region.
 */
export enum RegionalAuthority {
  /** Instructs MSAL to attempt to discover the region */
  AutoDiscoverRegion = "AUTO_DISCOVER",
  /** Uses the {@link RegionalAuthority} for the Azure 'westus' region. */
  USWestValue = "westus",
  /** Uses the {@link RegionalAuthority} for the Azure 'westus2' region. */
  USWest2Value = "westus2",
  /** Uses the {@link RegionalAuthority} for the Azure 'centralus' region. */
  USCentralValue = "centralus",
  /** Uses the {@link RegionalAuthority} for the Azure 'eastus' region. */
  USEastValue = "eastus",
  /** Uses the {@link RegionalAuthority} for the Azure 'eastus2' region. */
  USEast2Value = "eastus2",
  /** Uses the {@link RegionalAuthority} for the Azure 'northcentralus' region. */
  USNorthCentralValue = "northcentralus",
  /** Uses the {@link RegionalAuthority} for the Azure 'southcentralus' region. */
  USSouthCentralValue = "southcentralus",
  /** Uses the {@link RegionalAuthority} for the Azure 'westcentralus' region. */
  USWestCentralValue = "westcentralus",
  /** Uses the {@link RegionalAuthority} for the Azure 'canadacentral' region. */
  CanadaCentralValue = "canadacentral",
  /** Uses the {@link RegionalAuthority} for the Azure 'canadaeast' region. */
  CanadaEastValue = "canadaeast",
  /** Uses the {@link RegionalAuthority} for the Azure 'brazilsouth' region. */
  BrazilSouthValue = "brazilsouth",
  /** Uses the {@link RegionalAuthority} for the Azure 'northeurope' region. */
  EuropeNorthValue = "northeurope",
  /** Uses the {@link RegionalAuthority} for the Azure 'westeurope' region. */
  EuropeWestValue = "westeurope",
  /** Uses the {@link RegionalAuthority} for the Azure 'uksouth' region. */
  UKSouthValue = "uksouth",
  /** Uses the {@link RegionalAuthority} for the Azure 'ukwest' region. */
  UKWestValue = "ukwest",
  /** Uses the {@link RegionalAuthority} for the Azure 'francecentral' region. */
  FranceCentralValue = "francecentral",
  /** Uses the {@link RegionalAuthority} for the Azure 'francesouth' region. */
  FranceSouthValue = "francesouth",
  /** Uses the {@link RegionalAuthority} for the Azure 'switzerlandnorth' region. */
  SwitzerlandNorthValue = "switzerlandnorth",
  /** Uses the {@link RegionalAuthority} for the Azure 'switzerlandwest' region. */
  SwitzerlandWestValue = "switzerlandwest",
  /** Uses the {@link RegionalAuthority} for the Azure 'germanynorth' region. */
  GermanyNorthValue = "germanynorth",
  /** Uses the {@link RegionalAuthority} for the Azure 'germanywestcentral' region. */
  GermanyWestCentralValue = "germanywestcentral",
  /** Uses the {@link RegionalAuthority} for the Azure 'norwaywest' region. */
  NorwayWestValue = "norwaywest",
  /** Uses the {@link RegionalAuthority} for the Azure 'norwayeast' region. */
  NorwayEastValue = "norwayeast",
  /** Uses the {@link RegionalAuthority} for the Azure 'eastasia' region. */
  AsiaEastValue = "eastasia",
  /** Uses the {@link RegionalAuthority} for the Azure 'southeastasia' region. */
  AsiaSouthEastValue = "southeastasia",
  /** Uses the {@link RegionalAuthority} for the Azure 'japaneast' region. */
  JapanEastValue = "japaneast",
  /** Uses the {@link RegionalAuthority} for the Azure 'japanwest' region. */
  JapanWestValue = "japanwest",
  /** Uses the {@link RegionalAuthority} for the Azure 'australiaeast' region. */
  AustraliaEastValue = "australiaeast",
  /** Uses the {@link RegionalAuthority} for the Azure 'australiasoutheast' region. */
  AustraliaSouthEastValue = "australiasoutheast",
  /** Uses the {@link RegionalAuthority} for the Azure 'australiacentral' region. */
  AustraliaCentralValue = "australiacentral",
  /** Uses the {@link RegionalAuthority} for the Azure 'australiacentral2' region. */
  AustraliaCentral2Value = "australiacentral2",
  /** Uses the {@link RegionalAuthority} for the Azure 'centralindia' region. */
  IndiaCentralValue = "centralindia",
  /** Uses the {@link RegionalAuthority} for the Azure 'southindia' region. */
  IndiaSouthValue = "southindia",
  /** Uses the {@link RegionalAuthority} for the Azure 'westindia' region. */
  IndiaWestValue = "westindia",
  /** Uses the {@link RegionalAuthority} for the Azure 'koreasouth' region. */
  KoreaSouthValue = "koreasouth",
  /** Uses the {@link RegionalAuthority} for the Azure 'koreacentral' region. */
  KoreaCentralValue = "koreacentral",
  /** Uses the {@link RegionalAuthority} for the Azure 'uaecentral' region. */
  UAECentralValue = "uaecentral",
  /** Uses the {@link RegionalAuthority} for the Azure 'uaenorth' region. */
  UAENorthValue = "uaenorth",
  /** Uses the {@link RegionalAuthority} for the Azure 'southafricanorth' region. */
  SouthAfricaNorthValue = "southafricanorth",
  /** Uses the {@link RegionalAuthority} for the Azure 'southafricawest' region. */
  SouthAfricaWestValue = "southafricawest",
  /** Uses the {@link RegionalAuthority} for the Azure 'chinanorth' region. */
  ChinaNorthValue = "chinanorth",
  /** Uses the {@link RegionalAuthority} for the Azure 'chinaeast' region. */
  ChinaEastValue = "chinaeast",
  /** Uses the {@link RegionalAuthority} for the Azure 'chinanorth2' region. */
  ChinaNorth2Value = "chinanorth2",
  /** Uses the {@link RegionalAuthority} for the Azure 'chinaeast2' region. */
  ChinaEast2Value = "chinaeast2",
  /** Uses the {@link RegionalAuthority} for the Azure 'germanycentral' region. */
  GermanyCentralValue = "germanycentral",
  /** Uses the {@link RegionalAuthority} for the Azure 'germanynortheast' region. */
  GermanyNorthEastValue = "germanynortheast",
  /** Uses the {@link RegionalAuthority} for the Azure 'usgovvirginia' region. */
  GovernmentUSVirginiaValue = "usgovvirginia",
  /** Uses the {@link RegionalAuthority} for the Azure 'usgoviowa' region. */
  GovernmentUSIowaValue = "usgoviowa",
  /** Uses the {@link RegionalAuthority} for the Azure 'usgovarizona' region. */
  GovernmentUSArizonaValue = "usgovarizona",
  /** Uses the {@link RegionalAuthority} for the Azure 'usgovtexas' region. */
  GovernmentUSTexasValue = "usgovtexas",
  /** Uses the {@link RegionalAuthority} for the Azure 'usdodeast' region. */
  GovernmentUSDodEastValue = "usdodeast",
  /** Uses the {@link RegionalAuthority} for the Azure 'usdodcentral' region. */
  GovernmentUSDodCentralValue = "usdodcentral"
}
