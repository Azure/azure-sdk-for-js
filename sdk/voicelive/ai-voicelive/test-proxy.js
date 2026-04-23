// Quick test to verify proxy environment variable detection works
const { getDefaultProxySettings } = require("@azure/core-rest-pipeline");

console.log("Testing proxy environment variable detection...\n");

// Test 1: No proxy set
console.log("Test 1: No proxy environment variables");
delete process.env.HTTPS_PROXY;
delete process.env.HTTP_PROXY;
delete process.env.https_proxy;
delete process.env.http_proxy;
const noProxy = getDefaultProxySettings();
console.log("Result:", noProxy);
console.log("Expected: undefined");
console.log("Pass:", noProxy === undefined ? "✓" : "✗");
console.log();

// Test 2: HTTPS_PROXY set
console.log("Test 2: HTTPS_PROXY set");
process.env.HTTPS_PROXY = "http://proxy.example.com:8080";
const httpsProxy = getDefaultProxySettings();
console.log("Result:", httpsProxy);
console.log("Expected: ProxySettings object with host and port");
console.log("Pass:", httpsProxy && httpsProxy.host && httpsProxy.port ? "✓" : "✗");
console.log();

// Test 3: Proxy with authentication
console.log("Test 3: Proxy with authentication");
process.env.HTTPS_PROXY = "http://user:pass@proxy.example.com:8080";
const authProxy = getDefaultProxySettings();
console.log("Result:", authProxy);
console.log("Expected: ProxySettings object with username and password");
console.log("Pass:", authProxy && authProxy.username && authProxy.password ? "✓" : "✗");
console.log();

console.log("Proxy detection tests complete!");
