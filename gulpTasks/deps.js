/*
    Arquivo responsável por gerar todas as dependencias (angular, jquery, bootstrap, etc.) dentro do build
*/

const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

// criando a task deps e suas dependencias (.js, .css e .fonts):
gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts'])


//o return se faz necessario para que as tasks sejam feitas de forma sequencial
//array com todos os arquivos javascript
//com o pipe é criado uma cadeia de comandos em sequencia
//pipe uglyfi: comprime o código dos arquivos e os transforma no padrao .min.js
//pipe concat: concatena tudo num único arquivo com todas as dependências dentro
//pipe gulp dest: pasta ingorada no gitignore pois será criada na execucao do build
gulp.task('deps.js', () => {
  return gulp.src([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
    'node_modules/admin-lte/plugins/jQuery/jquery-2.2.3.min.js',
    'node_modules/admin-lte/bootstrap/js/bootstrap.min.js',
    'node_modules/admin-lte/plugins/slimScroll/jquery.slimscroll.min.js',
    'node_modules/admin-lte/dist/js/app.min.js',
  ])
  .pipe(uglify())
  .pipe(concat('deps.min.js'))
  .pipe(gulp.dest('public/assets/js'))
})

//array com todos os arquivos css
gulp.task('deps.css', () => {
  return gulp.src([
    'node_modules/angular-toastr/dist/angular-toastr.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/admin-lte/bootstrap/css/bootstrap.min.css',
    'node_modules/admin-lte/dist/css/AdminLTE.min.css',
    'node_modules/admin-lte/dist/css/skins/_all-skins.min.css',
  ])
  .pipe(uglifycss({ "uglyComments": true }))
  .pipe(concat('deps.min.css'))
  .pipe(gulp.dest('public/assets/css'))
})

//array com todos os arquivos fonts
gulp.task('deps.fonts', () => {
  return gulp.src([
    'node_modules/font-awesome/fonts/*.*',
    'node_modules/admin-lte/bootstrap/fonts/*.*'
  ])
  .pipe(gulp.dest('public/assets/fonts'))
})