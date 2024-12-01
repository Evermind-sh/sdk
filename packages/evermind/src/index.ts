#!/usr/bin/env sdk

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
    .commandDir('commands/keys')
    .commandDir('commands/lock')
    .demandCommand()
    .help()
    .parse();
