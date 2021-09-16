"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
class FakeCacheProvider {
  constructor() {
    this.cache = {};
  }

  async save(key, value) {
    this.cache[key] = JSON.stringify(value);
  }

  async recover(key) {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);
    return parsedData;
  }

  async invalidate(key) {
    delete this.cache[key];
  }

  async invalidatePrefix(prefix) {
    // try placing a forEach instead of filter, and a conditional to test and remove the items
    // to-do [testing]
    const keys = Object.keys(this.cache).filter(key => key.startsWith(`${prefix}:`));
    keys.forEach(key => {
      delete this.cache[key];
    });
  }

}

exports.default = FakeCacheProvider;