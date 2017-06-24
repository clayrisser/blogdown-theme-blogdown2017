import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { run } from 'do-task';
import clean from './clean';

const $ = gulpLoadPlugins();

export default async function babel() {
  await new Promise((resolve, reject) => {
    gulp.src([
      './src/**/*.{js,html}',
      '!./bower_components/**/*'
    ]).pipe($.if('*.html', $.crisper({})))
    // .pipe($.if('*.js', $.eslint()))
    // .pipe($.if('*.js', $.eslint.format()))
    // .pipe($.if('*.js', $.eslint.failAfterError()))
      .pipe($.if('*.js', $.babel({
        presets: [
          ['es2015', { modules: false }],
          'stage-2'
        ],
        plugins: ['babel-plugin-transform-async-to-generator']
      })))
      .pipe(gulp.dest('./.tmp/'))
      .on('end', resolve);
  });
}
