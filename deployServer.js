const {exec} = require('pkg')

const execAsync = async () => { 
    await exec(['package.json', '--out-path', 'dist', '-t', 'node10-win-x64'])
    .then(() => console.log('Success'))
    .catch(err => console.error(err))
}

execAsync();