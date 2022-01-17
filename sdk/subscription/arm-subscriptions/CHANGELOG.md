# Release History
    
## 5.0.0 (2022-01-17)
    
**Features**

  - Added operation group SubscriptionOperations
  - Added operation group Subscriptions
  - Added operation group Tenants
  - Added Interface Location_2
  - Added Interface LocationListResult
  - Added Interface Subscription
  - Added Interface SubscriptionListResult
  - Added Interface SubscriptionPolicies
  - Added Interface SubscriptionsGetOptionalParams
  - Added Interface SubscriptionsListLocationsOptionalParams
  - Added Interface SubscriptionsListNextOptionalParams
  - Added Interface SubscriptionsListOptionalParams
  - Added Interface TenantIdDescription
  - Added Interface TenantListResult
  - Added Interface TenantsListNextOptionalParams
  - Added Interface TenantsListOptionalParams
  - Added Type Alias SpendingLimit
  - Added Type Alias SubscriptionsGetResponse
  - Added Type Alias SubscriptionsListLocationsResponse
  - Added Type Alias SubscriptionsListNextResponse
  - Added Type Alias SubscriptionsListResponse
  - Added Type Alias SubscriptionState
  - Added Type Alias TenantsListNextResponse
  - Added Type Alias TenantsListResponse
  - Interface CanceledSubscriptionId has a new optional parameter subscriptionId
  - Interface EnabledSubscriptionId has a new optional parameter subscriptionId
  - Interface RenamedSubscriptionId has a new optional parameter subscriptionId
  - Interface SubscriptionAliasResponseProperties has a new optional parameter createdTime
  - Class SubscriptionClient has a new parameter subscriptionOperations
  - Class SubscriptionClient has a new parameter subscriptions
  - Class SubscriptionClient has a new parameter tenants

**Breaking Changes**

  - Removed operation group Subscription
  - Interface CanceledSubscriptionId no longer has parameter value
  - Interface EnabledSubscriptionId no longer has parameter value
  - Interface RenamedSubscriptionId no longer has parameter value
  - Interface SubscriptionClientOptionalParams no longer has parameter apiVersion
  - Class SubscriptionClient no longer has parameter apiVersion
  - Class SubscriptionClient no longer has parameter subscription
    
    
## 4.0.0 (2021-12-22)

The package of @azure/arm-subscriptions is using our next generation design principles since version 4.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
