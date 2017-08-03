#!/usr/bin/env node
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as meow from 'meow';
import * as updateNotifier from 'update-notifier';
import {init} from './init';
import {lint} from './lint';

export class Options {
  dryRun: boolean;
  targetRootDir: string;
  yes: boolean;
}

const cli = meow(`
	Usage
	  $ gts <verb> [options]

    Verb can be:
      init        Adds default npm scripts to your package.json.
      lint        Runs the lint tool against all *.ts files in the cwd.

  Options
    --help        Prints this help message.
    -y, --yes     Assume a yes answer for every prompt.
    --dry-run     Don't make any acutal changes.

	Examples
    $ gts init
    $ gts lint
`);

function usage(msg?: string): void {
  if (msg) {
    console.error(msg);
  }
  cli.showHelp(1);
}

updateNotifier({pkg: cli.pkg}).notify();

if (cli.input.length !== 1) {
  usage();
}

const verb = cli.input[0];
const options: Options = {
  dryRun: cli.flags.dryRun || false,
  targetRootDir: process.cwd(),
  yes: cli.flags.yes || cli.flags.y || false
};

switch (verb) {
  case 'init':
    init(options);
    break;
  case 'lint':
    lint(options);
    break;
  default:
    usage(`Unknown verb: ${verb}`);
    break;
}