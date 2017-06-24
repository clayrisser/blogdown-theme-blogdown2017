import gulp from 'gulp';

export default async function copy() {
  await new Promise((resolve, reject) => {
    gulp.src('./bower.json')
      .pipe(gulp.dest('./dist/'))
      .on('error', reject).on('end', resolve);
  });
}
