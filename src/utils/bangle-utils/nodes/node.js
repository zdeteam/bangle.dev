import { Extension } from '../extensions/extension';

export class Node extends Extension {
  constructor(options = {}) {
    super(options);
  }

  get type() {
    return 'node';
  }

  get view() {
    return null;
  }

  get schema() {
    return null;
  }

  command() {
    return () => {};
  }
}