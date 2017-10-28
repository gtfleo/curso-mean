/*
    Arquivo responsável por ler e interpretar todo o código da aplicação 
*/

const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')

// task com outras 4 tasks como pre-requisitos (nome definidos por opção do desenvolvedor):
gulp.task('app', ['app.html', 'app.css', 'app.js', 'app.assets'])
//por padrão, essas tasks dentro do [] são rodadas em paralelo, mas por conta do run-sequence do arquivo package.json essas tasks serão colocadas em sequencia


// criando uma função sempre que a task app.html for chamada:
//tudo que estiver dentro da pasta app (e suas subpastas) será interceptado pelo método src
//retira todos os espaços em branco do html
gulp.task('app.html', () => {
    return gulp.src('app/**/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('public'))
})

// criando uma função sempre que a task app.css for chamada:
gulp.task('app.css', () => {
    return gulp.src('app/**/*.css')
      .pipe(uglifycss({ "uglyComments": true }))
      .pipe(concat('app.min.css'))
      .pipe(gulp.dest('public/assets/css'))
})

// criando uma função sempre que a task app.js for chamada:
//env é um preset mais novo com vário presets diferentes
gulp.task('app.js', () => {
    return gulp.src('app/**/*.js')
      .pipe(babel({ presets: ['env'] }))
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('public/assets/js'))
})

// criando uma função sempre que a task app.assets for chamada:
//em assets estarão imagens, fontes, etc.
//tudo que estiver nessa pasta, não importando a extensão
gulp.task('app.assets', () => {
    return gulp.src('assets/**/*.*')
      .pipe(gulp.dest('public/assets'))
})