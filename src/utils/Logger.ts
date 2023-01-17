import debug, { Debugger } from "debug";

const NAMESPACE = "app";

debug.enable(`${NAMESPACE}*`);

export class Logger {
  _debug: Debugger;
  _info: Debugger;
  _warn: Debugger;
  _error: Debugger;
  prefix?: string;

  constructor(prefix?: string) {
    if (prefix) {
      this._debug = debug(`${NAMESPACE}:${prefix}`);
      this._info = debug(`${NAMESPACE}:INFO:${prefix}`);
      this._warn = debug(`${NAMESPACE}:WARN:${prefix}`);
      this._error = debug(`${NAMESPACE}:ERROR:${prefix}`);
    } else {
      this._debug = debug(`${NAMESPACE}`);
      this._info = debug(`${NAMESPACE}:INFO`);
      this._warn = debug(`${NAMESPACE}:WARN`);
      this._error = debug(`${NAMESPACE}:ERROR`);
    }

    this.prefix = prefix;

    this._debug.log = function () {
      console.debug.apply(console, arguments as any);
    };
    this._info.log = function () {
      console.info.apply(console, arguments as any);
    };
    this._warn.log = function () {
      console.warn.apply(console, arguments as any);
    };
    this._error.log = function () {
      console.error.apply(console, arguments as any);
    };
  }

  debug(...args) {
    this.wrapLog(this._debug, "debug", ...args);
  }

  info(...args) {
    this.wrapLog(this._info, "info", ...args);
  }

  warn(...args) {
    this.wrapLog(this._warn, "warn", ...args);
  }

  error(...args) {
    this.wrapLog(this._error, "error", ...args);
  }

  wrapLog = (logFunc, logLevel, ...args) => {
    logFunc(...args);
  };
}
