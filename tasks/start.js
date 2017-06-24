import childProcess from 'child_process';
import projPath from 'proj-path';
import delay from 'delay';

export default async function start() {
  new Promise(async (resolve, reject) => {
    await delay(1000);
    childProcess.spawn(`docker cp ${projPath()}/settings.json \
      some-blogdown:/app/content/settings.json`, {
        stdio: 'inherit',
        shell: true
      }).on('close', resolve).on('error', reject);
  }).then(() => {
    console.log('Ready :)');
  });
  await new Promise((resolve, reject) => {
    childProcess.spawn(`docker run --name some-blogdown --rm -p 8081:8081 \
-v ${projPath()}/src/:/app/content/themes/some-theme \
      thingdown/blogdown:latest`, {
        stdio: 'inherit',
        shell: true
      }).on('close', resolve).on('error', reject);
  });
}
