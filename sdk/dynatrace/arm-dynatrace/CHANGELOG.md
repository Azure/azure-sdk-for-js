# Release History
    
## 2.0.0 (2023-08-15)
    
### Features Added

  - Added operation Monitors.getMarketplaceSaaSResourceDetails
  - Added operation Monitors.getMetricStatus
  - Added Interface MarketplaceSaaSResourceDetailsRequest
  - Added Interface MarketplaceSaaSResourceDetailsResponse
  - Added Interface MetricsStatusResponse
  - Added Interface MonitorsGetMarketplaceSaaSResourceDetailsOptionalParams
  - Added Interface MonitorsGetMetricStatusOptionalParams
  - Added Type Alias MonitorsGetMarketplaceSaaSResourceDetailsResponse
  - Added Type Alias MonitorsGetMetricStatusResponse
  - Interface MetricRules has a new optional parameter sendingMetrics

### Breaking Changes

  - Removed operation Monitors.getAccountCredentials
  - Removed operation TagRules.update
  - Interface MonitorResourceUpdate no longer has parameter dynatraceEnvironmentProperties
  - Interface MonitorResourceUpdate no longer has parameter marketplaceSubscriptionStatus
  - Interface MonitorResourceUpdate no longer has parameter monitoringStatus
  - Interface MonitorResourceUpdate no longer has parameter planData
  - Interface MonitorResourceUpdate no longer has parameter userInfo
  - Parameter region of interface LinkableEnvironmentRequest is now required
  - Parameter tenantId of interface LinkableEnvironmentRequest is now required
  - Parameter userPrincipal of interface LinkableEnvironmentRequest is now required
  - Parameter userPrincipal of interface SSODetailsRequest is now required
    
## 1.0.1 (2023-01-09)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 1.0.0 (2022-09-19)

The package of @azure/arm-dynatrace is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
