/**
 */
const supportsEvent = (() => {
  if (typeof Event !== 'undefined') {
    try {
      // eslint-disable-next-line no-unused-expressions
      new Event('emit-init');
    } catch (e) {
      return false;
    }
  }
  return true;
})();

/**
 * Build an event object in a cross-browser manner
 *
 * Usage:
 *    const event = createEvent('paste', options);
 */
export const createEvent = (name: string, options: EventInit = {}) => {
  let event;
  if (options.bubbles === undefined) {
    options.bubbles = true;
  }
  if (options.cancelable === undefined) {
    options.cancelable = true;
  }
  if (options.composed === undefined) {
    options.composed = true;
  }
  if (supportsEvent) {
    event = new Event(name, options);
  } else {
    event = document.createEvent('Event');
    event.initEvent(name, options.bubbles, options.cancelable);
  }
  return event;
};
