// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Call,
  UserFacingDiagnosticsFeature,
  Features,
  NetworkDiagnosticChangedEventArgs,
  MediaDiagnosticChangedEventArgs,
  DiagnosticQuality,
  NetworkDiagnostic,
  LatestDiagnosticValue
} from '@azure/communication-calling';

interface NetworkStats {
  rtt?: number;
  jitter?: number;
  packetLoss?: number;
  timestamp?: number;
}

interface NetworkMonitorOptions {
  /** How frequently to check network status (ms). Default: 2000ms */
  pollingInterval?: number;
  /** RTT threshold for poor network quality (ms). Default: 300ms */
  poorRttThreshold?: number;
  /** Packet loss threshold for poor network quality (%). Default: 5% */
  poorPacketLossThreshold?: number;
  /** Jitter threshold for poor network quality (ms). Default: 30ms */
  poorJitterThreshold?: number;
  /** Whether to detect browser's online/offline status. Default: true */
  detectBrowserNetworkStatus?: boolean;
}

const DEFAULT_OPTIONS: Required<NetworkMonitorOptions> = {
  pollingInterval: 2000,
  poorRttThreshold: 300,
  poorPacketLossThreshold: 5,
  poorJitterThreshold: 30,
  detectBrowserNetworkStatus: true
};

/**
 * Enhanced version of the UserFacingDiagnostics feature.
 * This class provides improved network diagnostics that properly detect and emit network events
 * when network conditions change.
 */
export class EnhancedUserFacingDiagnostics {
  private _originalDiagnostics: UserFacingDiagnosticsFeature;
  private _networkMonitorInterval?: NodeJS.Timeout;
  private _options: Required<NetworkMonitorOptions>;
  private _previousNetworkState: boolean = true;
  private _networkStats: NetworkStats = {};
  private _latestNetworkDiagnostics: Record<string, LatestDiagnosticValue> = {};
  private _networkEventEmitter: EventTarget = new EventTarget();
  private _networkEventListeners: Map<string, Set<Function>> = new Map();
  private _networkStateCheckTimestamp: number = 0;
  private _isNetworkPoor: boolean = false;
  private _isDisposed: boolean = false;

  /**
   * Creates a new instance of EnhancedUserFacingDiagnostics
   * @param call - The Call object from the Azure Communication Calling SDK
   * @param options - Configuration options for network monitoring
   */
  constructor(call: Call, options?: NetworkMonitorOptions) {
    this._originalDiagnostics = call.feature(Features.UserFacingDiagnostics);
    this._options = { ...DEFAULT_OPTIONS, ...options };
    
    // Setup event forwarders for media diagnostics
    this._originalDiagnostics.media.on('diagnosticChanged', this._forwardMediaEvent.bind(this));
    
    // Setup enhanced network monitoring
    this._startNetworkMonitoring();
  }

  /**
   * Media diagnostics interface, directly using the original implementation
   */
  public get media() {
    return this._originalDiagnostics.media;
  }

  /**
   * Enhanced network diagnostics interface
   */
  public get network() {
    return {
      /**
       * Subscribe to network diagnostic events
       * @param eventName - Event name ('diagnosticChanged')
       * @param listener - Callback function to be called when the event is triggered
       */
      on: (eventName: string, listener: (args: NetworkDiagnosticChangedEventArgs) => void): void => {
        if (!this._networkEventListeners.has(eventName)) {
          this._networkEventListeners.set(eventName, new Set());
        }
        this._networkEventListeners.get(eventName)?.add(listener);
      },

      /**
       * Unsubscribe from network diagnostic events
       * @param eventName - Event name ('diagnosticChanged')
       * @param listener - The listener function to remove
       */
      off: (eventName: string, listener: (args: NetworkDiagnosticChangedEventArgs) => void): void => {
        const listeners = this._networkEventListeners.get(eventName);
        if (listeners) {
          listeners.delete(listener);
        }
      },

      /**
       * Get the latest network diagnostic values
       * @returns Object with the latest network diagnostic values
       */
      getLatest: (): Record<string, LatestDiagnosticValue> => {
        // Merge values from the original implementation (if any) with our enhanced values
        const originalValues = this._originalDiagnostics.network.getLatest();
        
        // Check if the original implementation returns anything useful
        const hasOriginalValues = Object.keys(originalValues).length > 0;
        
        // Return the enhanced network diagnostics if the original implementation
        // returns empty, otherwise combine both
        return hasOriginalValues 
          ? { ...this._latestNetworkDiagnostics, ...originalValues } 
          : this._latestNetworkDiagnostics;
      }
    };
  }

  /**
   * Forces an immediate network diagnostic check
   * This is useful when you want to check the network state outside
   * of the regular polling interval
   */
  public checkNetworkNow(): void {
    if (!this._isDisposed) {
      this._checkNetworkState();
    }
  }

  /**
   * Disposes the enhanced diagnostics and stops network monitoring
   */
  public dispose(): void {
    this._isDisposed = true;
    this._stopNetworkMonitoring();
    // Clear all listeners
    this._networkEventListeners.clear();
    // Unsubscribe from original events
    this._originalDiagnostics.media.off('diagnosticChanged', this._forwardMediaEvent.bind(this));
    this._originalDiagnostics.network.off('diagnosticChanged', this._handleOriginalNetworkEvent.bind(this));
  }

  /**
   * Forwards media events from the original diagnostics to ensure they work correctly
   */
  private _forwardMediaEvent(args: MediaDiagnosticChangedEventArgs): void {
    // No need to do anything special with media events as they work correctly
  }

  /**
   * Handles network events from the original diagnostics implementation
   */
  private _handleOriginalNetworkEvent(args: NetworkDiagnosticChangedEventArgs): void {
    // Forward original events and also update our tracked state
    this._emitNetworkEvent(args);
      
    // Update our latest diagnostics object
    if (args.diagnostic && args.value !== undefined) {
      this._latestNetworkDiagnostics[args.diagnostic] = {
        value: args.value,
        valueType: args.valueType
      };
    }
  }

  /**
   * Starts the network monitoring process
   */
  private _startNetworkMonitoring(): void {
    // First, try to get initial network information from the original implementation
    const originalNetworkDiagnostics = this._originalDiagnostics.network.getLatest();
    
    // Save any existing diagnostic values
    if (Object.keys(originalNetworkDiagnostics).length > 0) {
      Object.entries(originalNetworkDiagnostics).forEach(([diagnostic, value]) => {
        this._latestNetworkDiagnostics[diagnostic] = value;
      });
    }
    
    // Check initial network state - assume network is available initially
    this._checkNetworkState();

    // Start polling for network status changes
    this._networkMonitorInterval = setInterval(() => {
      if (!this._isDisposed) {
        this._checkNetworkState();
      }
    }, this._options.pollingInterval);

    // Also listen to original diagnostics in case they actually work
    this._originalDiagnostics.network.on('diagnosticChanged', this._handleOriginalNetworkEvent.bind(this));
  }

  /**
   * Stops the network monitoring process
   */
  private _stopNetworkMonitoring(): void {
    if (this._networkMonitorInterval) {
      clearInterval(this._networkMonitorInterval);
      this._networkMonitorInterval = undefined;
    }
  }

  /**
   * Checks current network state and emits events on changes
   */
  private _checkNetworkState(): void {
    const now = Date.now();
    // Throttle network state checks to avoid too frequent checks
    if (now - this._networkStateCheckTimestamp < 500) {
      return;
    }
    this._networkStateCheckTimestamp = now;
    
    // Detect network connection status if enabled in options
    if (this._options.detectBrowserNetworkStatus) {
      const isOnline = navigator.onLine;
      
      // Detect network connection changes
      if (isOnline !== this._previousNetworkState) {
        this._previousNetworkState = isOnline;
        
        if (!isOnline) {
          // Emit "noNetwork" event when network connection is lost
          this._emitNetworkEvent({
            diagnostic: NetworkDiagnostic.NoNetwork,
            value: true,
            valueType: 'boolean'
          });
        } else {
          // Emit "networkReconnect" event when network connection is restored
          this._emitNetworkEvent({
            diagnostic: NetworkDiagnostic.NetworkReconnect,
            value: true,
            valueType: 'boolean'
          });
          
          // Clear "noNetwork" state
          this._emitNetworkEvent({
            diagnostic: NetworkDiagnostic.NoNetwork,
            value: false,
            valueType: 'boolean'
          });
        }
      }
    }

    // If we have a connection (or detection is disabled), measure network quality
    if (this._previousNetworkState || !this._options.detectBrowserNetworkStatus) {
      this._measureNetworkQuality();
    }
  }

  /**
   * Measures network quality using available browser APIs and emits relevant events
   */
  private async _measureNetworkQuality(): Promise<void> {
    try {
      // Use RTCPeerConnection stats if available to measure network quality
      // This is just a simple implementation to demonstrate the concept
      const oldStats = this._networkStats;
      const newStats: NetworkStats = await this._getNetworkStats();
      let networkQualityChanged = false;
      let isPoorNetwork = false;
      
      if (newStats.rtt !== undefined && newStats.rtt > this._options.poorRttThreshold) {
        // High RTT indicates poor network quality
        isPoorNetwork = true;
        this._emitNetworkEvent({
          diagnostic: NetworkDiagnostic.NetworkReceiveQuality,
          value: DiagnosticQuality.Poor,
          valueType: 'quality'
        });
        networkQualityChanged = true;
      } else if (newStats.packetLoss !== undefined && newStats.packetLoss > this._options.poorPacketLossThreshold) {
        // High packet loss indicates poor network quality
        isPoorNetwork = true;
        this._emitNetworkEvent({
          diagnostic: NetworkDiagnostic.NetworkSendQuality,
          value: DiagnosticQuality.Poor,
          valueType: 'quality'
        });
        networkQualityChanged = true;
      } else if (isFinite(newStats.rtt || Infinity) && isFinite(oldStats.rtt || Infinity) && this._isNetworkPoor) {
        // Network appears stable now, but we previously had issues
        this._emitNetworkEvent({
          diagnostic: NetworkDiagnostic.NetworkReceiveQuality,
          value: DiagnosticQuality.Good,
          valueType: 'quality'
        });
        this._emitNetworkEvent({
          diagnostic: NetworkDiagnostic.NetworkSendQuality,
          value: DiagnosticQuality.Good,
          valueType: 'quality'
        });
        networkQualityChanged = true;
      }
      
      // Update the stored network quality state if it changed
      if (networkQualityChanged) {
        this._isNetworkPoor = isPoorNetwork;
      }
      
      // Store the stats for comparison on the next check
      this._networkStats = newStats;
    } catch (error) {
      console.warn('Failed to measure network quality:', error);
    }
  }

  /**
   * Gets network statistics using available browser APIs
   */
  private async _getNetworkStats(): Promise<NetworkStats> {
    const stats: NetworkStats = {
      timestamp: Date.now()
    };
    
    try {
      // Try to use the navigator.connection API if available
      const connection = (navigator as any).connection;
      if (connection) {
        // RTT is available in some browsers via the connection API
        if (connection.rtt) {
          stats.rtt = connection.rtt;
        }
        
        // Downlink quality can be an indicator of network quality
        if (connection.downlink) {
          // Low bandwidth can indicate poor network conditions
          // Less than 1 Mbps is considered poor
          if (connection.downlink < 1) {
            stats.packetLoss = 10; // Simulate high packet loss for poor connections
          }
        }
        
        // effectiveType can give us a general idea of connection quality
        if (connection.effectiveType) {
          if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
            stats.packetLoss = 15; // Simulate very high packet loss for poor connections
            stats.rtt = 500; // Simulate high RTT for poor connections
          }
        }
      }
      
      // In a real implementation, we would also use WebRTC stats API 
      // to get better network metrics from the active call
    } catch (error) {
      console.warn('Error getting network stats:', error);
    }
    
    return stats;
  }

  /**
   * Emits a network diagnostic event to all listeners
   */
  private _emitNetworkEvent(args: NetworkDiagnosticChangedEventArgs): void {
    // Update our diagnostics tracking
    if (args.diagnostic) {
      this._latestNetworkDiagnostics[args.diagnostic] = {
        value: args.value,
        valueType: args.valueType
      };
    }
    
    // Notify all listeners
    const listeners = this._networkEventListeners.get('diagnosticChanged');
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(args);
        } catch (error) {
          console.error('Error in network diagnostic listener:', error);
        }
      });
    }
  }
}