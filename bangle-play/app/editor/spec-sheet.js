import 'bangle-core/style.css';
import { coreSpec } from 'bangle-core/components';
import * as collab from 'bangle-plugins/collab/client/collab-extension';
// import { dino } from 'bangle-plugins/dino/index';
import { emoji, emojiInlineSuggest } from 'bangle-plugins/emoji/index';
import 'bangle-plugins/emoji/emoji.css';

import 'bangle-plugins/inline-menu/inline-menu.css';
import * as floatingMenu from 'bangle-plugins/inline-menu/floating-menu';
import * as linkMenu from 'bangle-plugins/inline-menu/link-menu';

import { config } from './config';
import { trailingNode } from 'bangle-plugins/trailing-node/index';
import { timestamp } from 'bangle-plugins/timestamp/index';
import { SpecSheet } from 'bangle-core/spec-sheet';
import { dino, stopwatch } from 'bangle-react/components/index';

export const specSheet = new SpecSheet([
  ...coreSpec({ heading: { levels: config.headingLevels } }),
  collab.spec(),
  emoji.spec(),
  floatingMenu.spec(),
  linkMenu.spec(),
  emojiInlineSuggest.spec({ markName: 'emoji_inline_suggest', trigger: ':' }),
  stopwatch.spec(),
  trailingNode.spec(),
  timestamp.spec(),
  dino.spec(),
]);