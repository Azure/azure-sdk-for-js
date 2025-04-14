/* eslint-disable jsx-a11y/anchor-is-valid */
/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.
*/

import { useEffect, useState } from "react";
import { getEnvironmentVariable, isTimeWindowClientFilter } from "../utils";
import {
  AppConfigurationClient,
  featureFlagPrefix,
  isFeatureFlag,
  parseFeatureFlag
} from "@azure/app-configuration";
import { InteractiveBrowserCredential } from "@azure/identity";

let client: AppConfigurationClient;

const featureFlag1 = {
  id: "react-app-feature-1",
  description: "",
  enabled: false,
  conditions: {
    client_filters: []
  }
};
const featureFlag2 = {
  id: "react-app-feature-2",
  description: "",
  enabled: true,
  conditions: {
    client_filters: [
      {
        name: "Microsoft.TimeWindow",
        parameters: {
          Start: "Mon, 12 Apr 2021 07:00:00 GMT",
          End: "Wed, 14 Apr 2021 07:00:00 GMT"
        }
      }
    ]
  }
};

export default function Page(): JSX.Element {
  const feature1Name = "react-app-feature-1";
  const feature2Name = "react-app-feature-2";
  const [feature1, setFeature1] = useState<{ enabled: boolean }>({ enabled: false });
  const [feature2, setFeature2] = useState<{ enabled: boolean }>({ enabled: false });

  const getFeatureFlags = async (keys: string[]): Promise<void> => {
    const [setting1, setting2] = await Promise.all(
      keys.map((key: string) =>
        client.getConfigurationSetting({
          key: featureFlagPrefix + key
        })
      )
    );
    if (isFeatureFlag(setting1)) {
      const parsedFeatureFlag1 = parseFeatureFlag(setting1);
      // console.log(`${parsedFeatureFlag1.key} is enabled : ${parsedFeatureFlag1.enabled}`, parsedFeatureFlag1);
      setFeature1({ enabled: parsedFeatureFlag1.value.enabled });
    }
    if (isFeatureFlag(setting2)) {
      const parsedFeatureFlag2 = parseFeatureFlag(setting2);
      // console.log(`${parsedFeatureFlag2.key} is enabled : ${parsedFeatureFlag2.value.enabled}`, parsedFeatureFlag2);
      const clientFilter = parsedFeatureFlag2.value.conditions.clientFilters?.[0];
      if (isTimeWindowClientFilter(clientFilter)) {
        const now = Date.now();
        const withinRange =
          now - Date.parse(clientFilter.parameters.Start) > 0 &&
          Date.parse(clientFilter.parameters.End) - now > 0;
        setFeature2({ enabled: withinRange });
      } else {
        setFeature2({ enabled: false });
      }
    }
  };

  useEffect(() => {
    const endpoint = getEnvironmentVariable("REACT_APP_APPCONFIG_ENDPOINT");
    const clientId = getEnvironmentVariable("REACT_APP_AZURE_CLIENT_ID");
    const tenantId = getEnvironmentVariable("REACT_APP_AZURE_TENANT_ID");
    const credential = new InteractiveBrowserCredential({ clientId, tenantId });
    client = new AppConfigurationClient(endpoint, credential);
    getFeatureFlags([feature1Name, feature2Name]);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          App Config
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={(feature1.enabled ? "" : "cursor-disabled").concat(" nav-link")}
                href="#"
              >
                Beta Feature (Feature 1 - Enabled flag)
              </a>
            </li>
            <li className="nav-item">
              <a
                className={(feature2.enabled ? "" : "cursor-disabled").concat(" nav-link")}
                href="#"
              >
                Beta Feature (Feature 2 - Time Window)
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="jumbotron">
        <h1>Feature Flag Sample!</h1>
        <p>
          This sample expects the following feature flags in the App Config account, please create
          them using the Azure portal.
        </p>
        <div className="alert alert-light">
          <h4 className="alert-heading">Feature Flag 1</h4>
          <div className="container">
            <div className="row">
              <div className="col">
                <pre>{JSON.stringify(featureFlag1, null, 2)}</pre>
              </div>
              <div className="col">
                <div>
                  <h4>== Description ==</h4>
                </div>
                <div>
                  <p>
                    "Beta Feature (Feature 1)" button on the header will be disabled based on the
                    enabled flag.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="alert alert-light">
          <h4 className="alert-heading">Feature Flag 2</h4>
          <div className="container">
            <div className="row">
              <div className="col">
                <pre>{JSON.stringify(featureFlag2, null, 2)}</pre>
              </div>
              <div className="col">
                <div className="row">
                  <h4>== Description ==</h4>
                </div>
                <div className="row">
                  <p>
                    "Another action (Feature 2 - Time Window)" button in the dropdown will be
                    enabled based on the time window from the client filter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          className="nav-link"
          href="https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appconfiguration/app-configuration/samples/v1/typescript"
        >
          Link to App Config Samples
        </a>
      </div>
    </>
  );
}
