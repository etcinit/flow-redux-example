// flow-typed signature: bee55fb2dce57dafae61510300c5ad74
// flow-typed version: <<STUB>>/react-tap-event-plugin_v^2.0.1/flow_v0.37.4

/**
 * This is an autogenerated libdef stub for:
 *
 *   'react-tap-event-plugin'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare type injectTapEventPlugin = (strategyOverrides?: Object) => void;
declare type TouchesObject = { pageX: number, pageY: number };
declare type EventType = {
  phasedRegistrationNames: {
    bubbled: { [key: string]: string },
    captured: { [key: string]: string },
  },

  dependencies: Array<string>,
};
declare type TapEventPlugin = {
  tapMoveThreshold: number,

  ignoreMouseThreshold: number,

  eventTypes: { [key: string]: EventType },

  extractEvents: (
    topLevelType: string,
    targetInst: EventTarget,
    nativeEvent: Object
  ) => mixed
};

declare module 'react-tap-event-plugin' {
  declare module.exports: injectTapEventPlugin;
}

/**
 * We include stubs for each file inside this npm package in case you need to
 * require those files directly. Feel free to delete any files that aren't
 * needed.
 */
declare module 'react-tap-event-plugin/src/defaultClickRejectionStrategy' {
  declare module.exports: (
    lastTouchEvent: ?number,
    clickTimestamp: number
  ) => ?boolean;
}

declare module 'react-tap-event-plugin/src/injectTapEventPlugin' {
  declare module.exports: injectTapEventPlugin;
}

declare module 'react-tap-event-plugin/src/TapEventPlugin' {
  declare module.exports: (shouldRejectClick: bool) => TapEventPlugin;
}

declare module 'react-tap-event-plugin/src/TouchEventUtils' {
  declare function extractSingleTouch(nativeEvent: Event): ?TouchesObject;

  declare module.exports: {
    extractSingleTouch: typeof extractSingleTouch,
  };
}

// Filename aliases
declare module 'react-tap-event-plugin/src/defaultClickRejectionStrategy.js' {
  declare module.exports: $Exports<'react-tap-event-plugin/src/defaultClickRejectionStrategy'>;
}
declare module 'react-tap-event-plugin/src/injectTapEventPlugin.js' {
  declare module.exports: $Exports<'react-tap-event-plugin/src/injectTapEventPlugin'>;
}
declare module 'react-tap-event-plugin/src/TapEventPlugin.js' {
  declare module.exports: $Exports<'react-tap-event-plugin/src/TapEventPlugin'>;
}
declare module 'react-tap-event-plugin/src/TouchEventUtils.js' {
  declare module.exports: $Exports<'react-tap-event-plugin/src/TouchEventUtils'>;
}
