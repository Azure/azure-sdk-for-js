# Release History

## 3.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 3.0.0 (2023-11-09)
    
**Features**

  - Added Interface NginxDeploymentScalingProperties
  - Added Interface NginxDeploymentUserProfile
  - Interface NginxConfigurationPackage has a new optional parameter protectedFiles
  - Interface NginxDeploymentProperties has a new optional parameter scalingProperties
  - Interface NginxDeploymentProperties has a new optional parameter userProfile
  - Interface NginxDeploymentUpdateProperties has a new optional parameter scalingProperties
  - Interface NginxDeploymentUpdateProperties has a new optional parameter userProfile

**Breaking Changes**

  - Interface NginxCertificate no longer has parameter tags
  - Interface NginxConfiguration no longer has parameter tags
    
## 2.0.1 (2023-01-30)

**Features**

  - Exposes `getContinuationToken` helper function to extract continuation token

**Bugs Fixed**

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 2.0.0 (2022-10-21)
    
**Features**

  - Added operation Certificates.beginCreateOrUpdate
  - Added operation Certificates.beginCreateOrUpdateAndWait
  - Added operation Deployments.beginCreateOrUpdate
  - Added operation Deployments.beginCreateOrUpdateAndWait
  - Added Interface CertificatesCreateOrUpdateOptionalParams
  - Added Interface DeploymentsCreateOrUpdateOptionalParams
  - Added Type Alias CertificatesCreateOrUpdateResponse
  - Added Type Alias DeploymentsCreateOrUpdateResponse
  - Interface NginxConfigurationProperties has a new optional parameter protectedFiles

**Breaking Changes**

  - Removed operation Certificates.beginCreate
  - Removed operation Certificates.beginCreateAndWait
  - Removed operation Deployments.beginCreate
  - Removed operation Deployments.beginCreateAndWait
    
    
## 1.0.0 (2022-08-23)

The package of @azure/arm-nginx is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
