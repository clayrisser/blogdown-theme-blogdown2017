import { run } from 'do-task';
import clean from './clean';
import copy from './copy';
import vulcanize from './vulcanize';

export default async function build() {
  await run(clean);
  await run(copy);
  await run(vulcanize);
}
