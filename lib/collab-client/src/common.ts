import { ClientCommunication, CollabFail } from '@bangle.dev/collab-comms';
import { Node, PluginKey, TextSelection } from '@bangle.dev/pm';

import type { CollabBaseState } from './state';

export const MAX_STATES_TO_KEEP = 15;
// If there are STUCK_IN_ERROR_THRESHOLD or more states in the history
// the machine will transition to fatal (terminal) error state to prevent
// infinite loops.
export const STUCK_IN_ERROR_THRESHOLD = 5;

export const collabClientKey = new PluginKey<CollabPluginState>(
  'bangle.dev/collab-client',
);
export interface CollabMonitor {
  serverVersion: undefined | number;
}
export const collabMonitorKey = new PluginKey<CollabMonitor>(
  'bangle.dev/collabMonitorKey',
);

export interface CollabMonitorTrMeta {
  serverVersion: number | undefined;
}

// Events
export type ValidEvents =
  | FatalErrorEvent
  | HardResetEvent
  | InitDocEvent
  | InitErrorEvent
  | PullEvent
  | PushEvent
  | PushPullErrorEvent
  | ReadyEvent
  | RestartEvent;

export enum EventType {
  FatalError = 'FATAL_ERROR_EVENT',
  HardReset = 'HARD_RESET_EVENT',
  InitDoc = 'INIT_DOC_EVENT',
  InitError = 'INIT_ERROR_EVENT',
  Pull = 'PULL_EVENT',
  Push = 'PUSH_EVENT',
  PushPullError = 'PUSH_PULL_ERROR_EVENT',
  Ready = 'READY_EVENT',
  Restart = 'RESTART_EVENT',
}

export interface FatalErrorEvent {
  type: EventType.FatalError;
  payload: {
    message: string;
  };
}

export interface InitDocEvent {
  type: EventType.InitDoc;
  payload: {
    doc: Node;
    version: number;
    managerId: string;
    selection?: TextSelection;
  };
}

export interface InitErrorEvent {
  type: EventType.InitError;
  payload: {
    failure: CollabFail;
  };
}

export interface PushEvent {
  type: EventType.Push;
}

export interface PullEvent {
  type: EventType.Pull;
}

export interface PushPullErrorEvent {
  type: EventType.PushPullError;
  payload: { failure: CollabFail };
}

export interface ReadyEvent {
  type: EventType.Ready;
}

export interface RestartEvent {
  type: EventType.Restart;
}

export interface HardResetEvent {
  type: EventType.HardReset;
}

export enum CollabStateName {
  FatalError = 'FATAL_ERROR_STATE',
  Init = 'INIT_STATE',
  InitDoc = 'INIT_DOC_STATE',
  InitError = 'INIT_ERROR_STATE',
  Pull = 'PULL_STATE',
  Push = 'PUSH_STATE',
  PushPullError = 'PUSH_PULL_ERROR_STATE',
  Ready = 'READY_STATE',
}

export interface CollabPluginState {
  collabState: CollabBaseState;
  previousStates: CollabBaseState[];
  infiniteTransitionGuard: { counter: number; lastChecked: number };
}

export interface ClientInfo {
  readonly clientCom: ClientCommunication;
  readonly clientID: string;
  readonly cooldownTime: number;
  readonly docName: string;
  readonly managerId: string;
  readonly userId: string;
  readonly warmupTime?: number;
}
