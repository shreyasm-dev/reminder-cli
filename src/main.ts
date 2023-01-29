#!/usr/bin/env node

import sourceMapSupport from 'source-map-support';
import { join } from 'path';
import { readFileSync } from 'fs';
import { program } from 'commander';

sourceMapSupport.install();

const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

program
  .name(pkg.name)
  .version(pkg.version)
  .description(pkg.description);

program.parse(process.argv);
