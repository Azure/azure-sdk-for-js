/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.
*/

import React from "react";
import { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Jumbotron,
  Alert,
  Row,
  Col,
  Container
} from "react-bootstrap";
import { getEnvironmentVariable } from "../utils";
import {
  AppConfigurationClient,
  featureFlagPrefix,
  isFeatureFlag,
  isFeatureFlagClientFilter
} from "@azure/app-configuration";

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
  const feature1 = "react-app-feature-1";
  const feature2 = "react-app-feature-2";
  const [feature1ClassName, setFeature1ClassName] = useState<string>("feature-button-hidden");
  const [feature2ClassName, setFeature2ClassName] = useState<string>("feature-button-hidden");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFeatureFlags = async (keys: string[]): Promise<void> => {
    const [setting1, setting2] = await Promise.all(
      keys.map((key: string) =>
        client.getConfigurationSetting({
          key: featureFlagPrefix + key
        })
      )
    );
    if (isFeatureFlag(setting1)) {
      console.log(`${setting1.key} is enabled : ${setting1.enabled}`, setting1);
      setFeature1ClassName(setting1.enabled ? "feature-button-visible" : "feature-button-hidden");
    }
    if (isFeatureFlag(setting2)) {
      console.log(`${setting2.key} is enabled : ${setting2.enabled}`, setting2);
      const clientFilter = setting2.conditions.clientFilters?.[0];
      if (isFeatureFlagClientFilter("timeWindow", clientFilter)) {
        const now = Date.now();
        const withinRange =
          now - Date.parse(clientFilter.parameters.start) > 0 &&
          Date.parse(clientFilter.parameters.end) - now > 0;
        setFeature2ClassName(withinRange ? "feature-button-visible" : "feature-button-hidden");
      }
    }
  };

  useEffect(() => {
    const connectionString = getEnvironmentVariable("REACT_APP_APPCONFIG_CONNECTION_STRING");
    client = new AppConfigurationClient(connectionString);
    getFeatureFlags([feature1, feature2]);
  }, [getFeatureFlags]);

  return (
    <React.Fragment>
      <Navbar bg="light" expand="xl">
        <Navbar.Brand href="#home">App Config</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link className={feature1ClassName}>Beta Feature (Feature 1) </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item className={feature2ClassName}>
                Another action (Feature 2 - Time Window){" "}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Jumbotron>
        <h1>Feature Flag Sample!</h1>
        <p>This sample expects the following feature flags in the App Config account, please create them using the Azure portal.</p>
        <Alert variant="light">
          <Alert.Heading>Feature Flag 1</Alert.Heading>
          <Container>
            <Row>
              <Col>
                <pre>{JSON.stringify(featureFlag1, null, 2)}</pre>
              </Col>
              <Col>
                <Row>
                  <h4>// Description</h4>
                </Row>
                <Row>
                  <p>
                    "Beta Feature (Feature 1)" button on the header will be disabled based on the
                    enabled flag.
                  </p>
                </Row>
              </Col>
            </Row>
          </Container>
        </Alert>
        <Alert variant="light">
          <Alert.Heading>Feature Flag 2</Alert.Heading>
          <Container>
            <Row>
              <Col>
                <pre>{JSON.stringify(featureFlag2, null, 2)}</pre>
              </Col>
              <Col>
                <Row>
                  <h4>// Description</h4>
                </Row>
                <Row>
                  <p>
                    "Another action (Feature 2 - Time Window)" button in the dropdown will be
                    enabled based on the time window from the client filter.
                  </p>
                </Row>
              </Col>
            </Row>
          </Container>
        </Alert>
        <Nav.Link href="https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/appconfiguration/app-configuration/samples/v1/typescript">
          Link to Samples
        </Nav.Link>
      </Jumbotron>
    </React.Fragment>
  );
}
