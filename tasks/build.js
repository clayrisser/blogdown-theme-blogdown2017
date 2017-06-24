import { run } from 'do-task';
import clean from './clean';
import vulcanize from './vulcanize';

export default async function build() {
  await run(clean);
  await run(vulcanize);
}
