"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownVersions = exports.KnownActionType = exports.KnownOrigin = exports.KnownCreatedByType = exports.KnownManagedServiceIdentityType = exports.KnownSingleSignOnStates = exports.KnownSingleSignOnType = exports.KnownRegion = exports.KnownResourceProvisioningState = exports.KnownMarketplaceSubscriptionStatus = void 0;
exports.instanceResourceSerializer = instanceResourceSerializer;
exports.instanceResourceDeserializer = instanceResourceDeserializer;
exports.instancePropertiesSerializer = instancePropertiesSerializer;
exports.instancePropertiesDeserializer = instancePropertiesDeserializer;
exports.marketplaceDetailsSerializer = marketplaceDetailsSerializer;
exports.marketplaceDetailsDeserializer = marketplaceDetailsDeserializer;
exports.offerDetailsSerializer = offerDetailsSerializer;
exports.offerDetailsDeserializer = offerDetailsDeserializer;
exports.userDetailsSerializer = userDetailsSerializer;
exports.userDetailsDeserializer = userDetailsDeserializer;
exports.partnerPropertiesSerializer = partnerPropertiesSerializer;
exports.partnerPropertiesDeserializer = partnerPropertiesDeserializer;
exports.singleSignOnPropertiesV2Serializer = singleSignOnPropertiesV2Serializer;
exports.singleSignOnPropertiesV2Deserializer = singleSignOnPropertiesV2Deserializer;
exports.managedServiceIdentitySerializer = managedServiceIdentitySerializer;
exports.managedServiceIdentityDeserializer = managedServiceIdentityDeserializer;
exports.userAssignedIdentitySerializer = userAssignedIdentitySerializer;
exports.userAssignedIdentityDeserializer = userAssignedIdentityDeserializer;
exports.trackedResourceSerializer = trackedResourceSerializer;
exports.trackedResourceDeserializer = trackedResourceDeserializer;
exports.resourceSerializer = resourceSerializer;
exports.resourceDeserializer = resourceDeserializer;
exports.systemDataDeserializer = systemDataDeserializer;
exports.errorResponseDeserializer = errorResponseDeserializer;
exports.errorDetailDeserializer = errorDetailDeserializer;
exports.errorDetailArrayDeserializer = errorDetailArrayDeserializer;
exports.errorAdditionalInfoArrayDeserializer = errorAdditionalInfoArrayDeserializer;
exports.errorAdditionalInfoDeserializer = errorAdditionalInfoDeserializer;
exports._errorAdditionalInfoInfoDeserializer = _errorAdditionalInfoInfoDeserializer;
exports.instanceResourceUpdateSerializer = instanceResourceUpdateSerializer;
exports._instanceResourceListResultDeserializer = _instanceResourceListResultDeserializer;
exports.instanceResourceArraySerializer = instanceResourceArraySerializer;
exports.instanceResourceArrayDeserializer = instanceResourceArrayDeserializer;
exports._operationListResultDeserializer = _operationListResultDeserializer;
exports.operationArrayDeserializer = operationArrayDeserializer;
exports.operationDeserializer = operationDeserializer;
exports.operationDisplayDeserializer = operationDisplayDeserializer;
function instanceResourceSerializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        properties: !item["properties"]
            ? item["properties"]
            : instancePropertiesSerializer(item["properties"]),
        identity: !item["identity"]
            ? item["identity"]
            : managedServiceIdentitySerializer(item["identity"]),
    };
}
function instanceResourceDeserializer(item) {
    return {
        tags: item["tags"],
        location: item["location"],
        id: item["id"],
        name: item["name"],
        type: item["type"],
        systemData: !item["systemData"]
            ? item["systemData"]
            : systemDataDeserializer(item["systemData"]),
        properties: !item["properties"]
            ? item["properties"]
            : instancePropertiesDeserializer(item["properties"]),
        identity: !item["identity"]
            ? item["identity"]
            : managedServiceIdentityDeserializer(item["identity"]),
    };
}
function instancePropertiesSerializer(item) {
    return {
        marketplace: marketplaceDetailsSerializer(item["marketplace"]),
        user: userDetailsSerializer(item["user"]),
        partnerProperties: !item["partnerProperties"]
            ? item["partnerProperties"]
            : partnerPropertiesSerializer(item["partnerProperties"]),
        singleSignOnProperties: !item["singleSignOnProperties"]
            ? item["singleSignOnProperties"]
            : singleSignOnPropertiesV2Serializer(item["singleSignOnProperties"]),
    };
}
function instancePropertiesDeserializer(item) {
    return {
        marketplace: marketplaceDetailsDeserializer(item["marketplace"]),
        user: userDetailsDeserializer(item["user"]),
        provisioningState: item["provisioningState"],
        partnerProperties: !item["partnerProperties"]
            ? item["partnerProperties"]
            : partnerPropertiesDeserializer(item["partnerProperties"]),
        singleSignOnProperties: !item["singleSignOnProperties"]
            ? item["singleSignOnProperties"]
            : singleSignOnPropertiesV2Deserializer(item["singleSignOnProperties"]),
    };
}
function marketplaceDetailsSerializer(item) {
    return {
        subscriptionId: item["subscriptionId"],
        offerDetails: offerDetailsSerializer(item["offerDetails"]),
    };
}
function marketplaceDetailsDeserializer(item) {
    return {
        subscriptionId: item["subscriptionId"],
        subscriptionStatus: item["subscriptionStatus"],
        offerDetails: offerDetailsDeserializer(item["offerDetails"]),
    };
}
/** Marketplace subscription status of a resource. */
var KnownMarketplaceSubscriptionStatus;
(function (KnownMarketplaceSubscriptionStatus) {
    /** Purchased but not yet activated */
    KnownMarketplaceSubscriptionStatus["PendingFulfillmentStart"] = "PendingFulfillmentStart";
    /** Marketplace subscription is activated */
    KnownMarketplaceSubscriptionStatus["Subscribed"] = "Subscribed";
    /** This state indicates that a customer's payment for the Marketplace service was not received */
    KnownMarketplaceSubscriptionStatus["Suspended"] = "Suspended";
    /** Customer has cancelled the subscription */
    KnownMarketplaceSubscriptionStatus["Unsubscribed"] = "Unsubscribed";
})(KnownMarketplaceSubscriptionStatus || (exports.KnownMarketplaceSubscriptionStatus = KnownMarketplaceSubscriptionStatus = {}));
function offerDetailsSerializer(item) {
    return {
        publisherId: item["publisherId"],
        offerId: item["offerId"],
        planId: item["planId"],
        planName: item["planName"],
        termUnit: item["termUnit"],
        termId: item["termId"],
    };
}
function offerDetailsDeserializer(item) {
    return {
        publisherId: item["publisherId"],
        offerId: item["offerId"],
        planId: item["planId"],
        planName: item["planName"],
        termUnit: item["termUnit"],
        termId: item["termId"],
    };
}
function userDetailsSerializer(item) {
    return {
        firstName: item["firstName"],
        lastName: item["lastName"],
        emailAddress: item["emailAddress"],
        upn: item["upn"],
        phoneNumber: item["phoneNumber"],
    };
}
function userDetailsDeserializer(item) {
    return {
        firstName: item["firstName"],
        lastName: item["lastName"],
        emailAddress: item["emailAddress"],
        upn: item["upn"],
        phoneNumber: item["phoneNumber"],
    };
}
/** The provisioning state of a resource type. */
var KnownResourceProvisioningState;
(function (KnownResourceProvisioningState) {
    /** Resource has been created. */
    KnownResourceProvisioningState["Succeeded"] = "Succeeded";
    /** Resource creation failed. */
    KnownResourceProvisioningState["Failed"] = "Failed";
    /** Resource creation was canceled. */
    KnownResourceProvisioningState["Canceled"] = "Canceled";
})(KnownResourceProvisioningState || (exports.KnownResourceProvisioningState = KnownResourceProvisioningState = {}));
function partnerPropertiesSerializer(item) {
    return { region: item["region"], subdomain: item["subdomain"] };
}
function partnerPropertiesDeserializer(item) {
    return {
        region: item["region"],
        subdomain: item["subdomain"],
    };
}
/** The available regions */
var KnownRegion;
(function (KnownRegion) {
    /** Region: East US */
    KnownRegion["Eastus"] = "eastus";
    /** Region: Central US */
    KnownRegion["Centralus"] = "centralus";
    /** Region: West US */
    KnownRegion["Westus"] = "westus";
    /** Region: West Europe */
    KnownRegion["Westeurope"] = "westeurope";
    /** Region: Japan East */
    KnownRegion["Japaneast"] = "japaneast";
    /** Region: Korea Central */
    KnownRegion["Koreacentral"] = "koreacentral";
})(KnownRegion || (exports.KnownRegion = KnownRegion = {}));
function singleSignOnPropertiesV2Serializer(item) {
    return {
        type: item["type"],
        state: item["state"],
        enterpriseAppId: item["enterpriseAppId"],
        url: item["url"],
        aadDomains: !item["aadDomains"]
            ? item["aadDomains"]
            : item["aadDomains"].map((p) => {
                return p;
            }),
    };
}
function singleSignOnPropertiesV2Deserializer(item) {
    return {
        type: item["type"],
        state: item["state"],
        enterpriseAppId: item["enterpriseAppId"],
        url: item["url"],
        aadDomains: !item["aadDomains"]
            ? item["aadDomains"]
            : item["aadDomains"].map((p) => {
                return p;
            }),
    };
}
/** Defines the type of Single Sign-On (SSO) mechanism being used */
var KnownSingleSignOnType;
(function (KnownSingleSignOnType) {
    /** Security Assertion Markup Language (SAML) based Single Sign-On */
    KnownSingleSignOnType["Saml"] = "Saml";
    /** OpenID Connect based Single Sign-On. */
    KnownSingleSignOnType["OpenId"] = "OpenId";
})(KnownSingleSignOnType || (exports.KnownSingleSignOnType = KnownSingleSignOnType = {}));
/** Various states of the SSO resource */
var KnownSingleSignOnStates;
(function (KnownSingleSignOnStates) {
    /** Initial state of the SSO resource */
    KnownSingleSignOnStates["Initial"] = "Initial";
    /** State of the SSO resource when it is enabled */
    KnownSingleSignOnStates["Enable"] = "Enable";
    /** State of the SSO resource when it is disabled */
    KnownSingleSignOnStates["Disable"] = "Disable";
})(KnownSingleSignOnStates || (exports.KnownSingleSignOnStates = KnownSingleSignOnStates = {}));
function managedServiceIdentitySerializer(item) {
    return {
        type: item["type"],
        userAssignedIdentities: item["userAssignedIdentities"],
    };
}
function managedServiceIdentityDeserializer(item) {
    return {
        principalId: item["principalId"],
        tenantId: item["tenantId"],
        type: item["type"],
        userAssignedIdentities: item["userAssignedIdentities"],
    };
}
/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
var KnownManagedServiceIdentityType;
(function (KnownManagedServiceIdentityType) {
    /** No managed identity. */
    KnownManagedServiceIdentityType["None"] = "None";
    /** System assigned managed identity. */
    KnownManagedServiceIdentityType["SystemAssigned"] = "SystemAssigned";
    /** User assigned managed identity. */
    KnownManagedServiceIdentityType["UserAssigned"] = "UserAssigned";
    /** System and user assigned managed identity. */
    KnownManagedServiceIdentityType["SystemAssignedUserAssigned"] = "SystemAssigned,UserAssigned";
})(KnownManagedServiceIdentityType || (exports.KnownManagedServiceIdentityType = KnownManagedServiceIdentityType = {}));
function userAssignedIdentitySerializer(item) {
    return item;
}
function userAssignedIdentityDeserializer(item) {
    return {
        clientId: item["clientId"],
        principalId: item["principalId"],
    };
}
function trackedResourceSerializer(item) {
    return { tags: item["tags"], location: item["location"] };
}
function trackedResourceDeserializer(item) {
    return {
        id: item["id"],
        name: item["name"],
        type: item["type"],
        systemData: !item["systemData"]
            ? item["systemData"]
            : systemDataDeserializer(item["systemData"]),
        tags: item["tags"],
        location: item["location"],
    };
}
function resourceSerializer(item) {
    return item;
}
function resourceDeserializer(item) {
    return {
        id: item["id"],
        name: item["name"],
        type: item["type"],
        systemData: !item["systemData"]
            ? item["systemData"]
            : systemDataDeserializer(item["systemData"]),
    };
}
function systemDataDeserializer(item) {
    return {
        createdBy: item["createdBy"],
        createdByType: item["createdByType"],
        createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
        lastModifiedBy: item["lastModifiedBy"],
        lastModifiedByType: item["lastModifiedByType"],
        lastModifiedAt: !item["lastModifiedAt"]
            ? item["lastModifiedAt"]
            : new Date(item["lastModifiedAt"]),
    };
}
/** The kind of entity that created the resource. */
var KnownCreatedByType;
(function (KnownCreatedByType) {
    /** The entity was created by a user. */
    KnownCreatedByType["User"] = "User";
    /** The entity was created by an application. */
    KnownCreatedByType["Application"] = "Application";
    /** The entity was created by a managed identity. */
    KnownCreatedByType["ManagedIdentity"] = "ManagedIdentity";
    /** The entity was created by a key. */
    KnownCreatedByType["Key"] = "Key";
})(KnownCreatedByType || (exports.KnownCreatedByType = KnownCreatedByType = {}));
function errorResponseDeserializer(item) {
    return {
        error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    };
}
function errorDetailDeserializer(item) {
    return {
        code: item["code"],
        message: item["message"],
        target: item["target"],
        details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
        additionalInfo: !item["additionalInfo"]
            ? item["additionalInfo"]
            : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
    };
}
function errorDetailArrayDeserializer(result) {
    return result.map((item) => {
        return errorDetailDeserializer(item);
    });
}
function errorAdditionalInfoArrayDeserializer(result) {
    return result.map((item) => {
        return errorAdditionalInfoDeserializer(item);
    });
}
function errorAdditionalInfoDeserializer(item) {
    return {
        type: item["type"],
        info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
    };
}
function _errorAdditionalInfoInfoDeserializer(item) {
    return item;
}
function instanceResourceUpdateSerializer(item) {
    return {
        tags: item["tags"],
        identity: !item["identity"]
            ? item["identity"]
            : managedServiceIdentitySerializer(item["identity"]),
    };
}
function _instanceResourceListResultDeserializer(item) {
    return {
        value: instanceResourceArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
function instanceResourceArraySerializer(result) {
    return result.map((item) => {
        return instanceResourceSerializer(item);
    });
}
function instanceResourceArrayDeserializer(result) {
    return result.map((item) => {
        return instanceResourceDeserializer(item);
    });
}
function _operationListResultDeserializer(item) {
    return {
        value: operationArrayDeserializer(item["value"]),
        nextLink: item["nextLink"],
    };
}
function operationArrayDeserializer(result) {
    return result.map((item) => {
        return operationDeserializer(item);
    });
}
function operationDeserializer(item) {
    return {
        name: item["name"],
        isDataAction: item["isDataAction"],
        display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
        origin: item["origin"],
        actionType: item["actionType"],
    };
}
function operationDisplayDeserializer(item) {
    return {
        provider: item["provider"],
        resource: item["resource"],
        operation: item["operation"],
        description: item["description"],
    };
}
/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
var KnownOrigin;
(function (KnownOrigin) {
    /** Indicates the operation is initiated by a user. */
    KnownOrigin["User"] = "user";
    /** Indicates the operation is initiated by a system. */
    KnownOrigin["System"] = "system";
    /** Indicates the operation is initiated by a user or system. */
    KnownOrigin["UserSystem"] = "user,system";
})(KnownOrigin || (exports.KnownOrigin = KnownOrigin = {}));
/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
var KnownActionType;
(function (KnownActionType) {
    /** Actions are for internal-only APIs. */
    KnownActionType["Internal"] = "Internal";
})(KnownActionType || (exports.KnownActionType = KnownActionType = {}));
/** The available API versions. */
var KnownVersions;
(function (KnownVersions) {
    /** 2024-09-18 version */
    KnownVersions["V20240918Preview"] = "2024-09-18-preview";
})(KnownVersions || (exports.KnownVersions = KnownVersions = {}));
//# sourceMappingURL=models.js.map