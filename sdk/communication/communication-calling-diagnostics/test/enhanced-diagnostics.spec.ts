// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EnhancedUserFacingDiagnostics } from '../src/enhanced-diagnostics';
import { NetworkDiagnostic, DiagnosticQuality } from '@azure/communication-calling';

// Mock implementation of Call and UserFacingDiagnosticsFeature for testing
const createMockCall = () => {
  const mockMedia = {
    on: jest.fn(),
    off: jest.fn(),
    getLatest: jest.fn().mockReturnValue({})
  };

  const mockNetwork = {
    on: jest.fn(),
    off: jest.fn(),
    getLatest: jest.fn().mockReturnValue({}) // Return empty object to simulate the issue
  };

  const mockFeature = {
    media: mockMedia,
    network: mockNetwork
  };

  const mockCall = {
    feature: jest.fn().mockReturnValue(mockFeature)
  };

  return {
    call: mockCall,
    media: mockMedia,
    network: mockNetwork
  };
};

// Helper function to create an EnhancedUserFacingDiagnostics with mocks
const createEnhancedDiagnostics = () => {
  const mocks = createMockCall();
  const enhancedDiagnostics = new EnhancedUserFacingDiagnostics(mocks.call as any);
  return { enhancedDiagnostics, mocks };
};

describe('EnhancedUserFacingDiagnostics', () => {
  // Save original navigator.onLine and restore after tests
  const originalOnLine = navigator.onLine;
  
  // Mock navigator.onLine for testing network state changes
  Object.defineProperty(navigator, 'onLine', {
    configurable: true,
    get: jest.fn()
  });

  afterAll(() => {
    // Restore original navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      get: () => originalOnLine
    });
  });
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance with the original diagnostics', () => {
    const { enhancedDiagnostics, mocks } = createEnhancedDiagnostics();
    expect(mocks.call.feature).toHaveBeenCalledWith('userFacingDiagnostics');
    expect(enhancedDiagnostics).toBeDefined();
  });

  it('should properly handle media events by forwarding them', () => {
    const { enhancedDiagnostics, mocks } = createEnhancedDiagnostics();
    const mediaListener = jest.fn();
    
    // Subscribe to media events
    enhancedDiagnostics.media.on('diagnosticChanged', mediaListener);
    
    // Verify the listener was set up on the original diagnostics
    expect(mocks.media.on).toHaveBeenCalledWith('diagnosticChanged', expect.any(Function));
  });

  it('should emit network events when network state changes', () => {
    const { enhancedDiagnostics } = createEnhancedDiagnostics();
    const networkListener = jest.fn();
    
    // Subscribe to network events
    enhancedDiagnostics.network.on('diagnosticChanged', networkListener);
    
    // Mock going offline
    (navigator.onLine as any) = false;
    
    // Trigger a network check
    (enhancedDiagnostics as any)._checkNetworkState();
    
    // Verify a noNetwork event was emitted
    expect(networkListener).toHaveBeenCalledWith(
      expect.objectContaining({
        diagnostic: NetworkDiagnostic.NoNetwork,
        value: true
      })
    );
    
    // Mock coming back online
    (navigator.onLine as any) = true;
    
    // Trigger another network check
    (enhancedDiagnostics as any)._checkNetworkState();
    
    // Verify networkReconnect and noNetwork events were emitted
    expect(networkListener).toHaveBeenCalledWith(
      expect.objectContaining({
        diagnostic: NetworkDiagnostic.NetworkReconnect,
        value: true
      })
    );
    
    expect(networkListener).toHaveBeenCalledWith(
      expect.objectContaining({
        diagnostic: NetworkDiagnostic.NoNetwork,
        value: false
      })
    );
  });

  it('should update and return latest network diagnostics', () => {
    const { enhancedDiagnostics } = createEnhancedDiagnostics();
    
    // Mock some network diagnostic changes
    (enhancedDiagnostics as any)._emitNetworkEvent({
      diagnostic: NetworkDiagnostic.NetworkReceiveQuality,
      value: DiagnosticQuality.Poor,
      valueType: 'quality'
    });
    
    // Get the latest diagnostics
    const latest = enhancedDiagnostics.network.getLatest();
    
    // Verify the diagnostics were updated
    expect(latest).toHaveProperty(NetworkDiagnostic.NetworkReceiveQuality);
    expect(latest[NetworkDiagnostic.NetworkReceiveQuality].value).toBe(DiagnosticQuality.Poor);
  });

  it('should clean up resources on dispose', () => {
    const { enhancedDiagnostics } = createEnhancedDiagnostics();
    
    // Setup a spy on clearInterval
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    
    // Dispose the diagnostics
    enhancedDiagnostics.dispose();
    
    // Verify the interval was cleared
    expect(clearIntervalSpy).toHaveBeenCalled();
    
    clearIntervalSpy.mockRestore();
  });
});