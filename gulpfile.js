//run sequence: executa as tasks em sequencia para evitar bugs
const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')

// com esses 3 arquivos importados, tem-se acesso as tasks app, deps e server
require('./gulpTasks/app')
require('./gulpTasks/deps')
require('./gulpTasks/server')

//task default é convenção, pois essa task iniciará o processo de construção
//quando ambiente for desenvolvimento (dev), usar o servidor 
gulp.task('default', () => {
    if(util.env.production) {
      sequence('deps', 'app')
    } else {
      sequence('deps', 'app', 'server')
    }
})