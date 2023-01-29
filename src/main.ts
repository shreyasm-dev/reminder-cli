#!/usr/bin/env node

import sourceMapSupport from 'source-map-support';
import { join } from 'path';
import { readFileSync } from 'fs';
import { program } from 'commander';
import Conf from 'conf';
import chalk from 'chalk';

sourceMapSupport.install();

const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));
const config = new Conf();

program
  .name('reminder')
  .version(pkg.version)
  .description(pkg.description);

program
  .command('list')
  .alias('ls')
  .description('list all reminders')
  .option('-j, --json', 'output as JSON')
  .action(({ json = false }) => {
    const reminders = config.store;
    console.log(
      json
        ? JSON.stringify(reminders)
        : Object.entries(reminders).map(([text, done]) => `${done ? chalk.red('[x]') : chalk.green('[ ]')} ${text}`).join('\n'),
    );
  });

program
  .command('add <text>')
  .alias('a')
  .description('add a reminder')
  .option('-d, --done', 'mark as done')
  .action((text, { done = false }) => {
    config.set(text, done);
  });

program
  .command('remove <text>')
  .alias('rm')
  .description('remove a reminder')
  .action((text) => {
    config.delete(text);
  });

program
  .command('toggle <text>')
  .alias('t')
  .description('toggle a reminder')
  .action((text) => {
    config.set(text, !config.get(text));
  });

program
  .command('clear')
  .alias('c')
  .description('clear all reminders')
  .action(() => {
    config.clear();
  });

program.parse(process.argv);
