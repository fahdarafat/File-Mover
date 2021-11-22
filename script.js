const fs = require('fs')
const path = require('path')


let filesInDir = []
let oldFilesPaths = []
let newFileNames = []
//Get all files in the current directory and store them in an array
  fs.readdir('./', (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      filesInDir.push(file)
  })
//Replace every dash with a forward slash
  filesInDir.forEach(file => {
    if (file.includes('-')){
      oldFilesPaths.push(path.resolve(`./${file}`))
      let files = file.replace(/-/g, '/')
      files = files.split('_')[1]
      newFileNames.push(files)  
    }
  })
  //Create All the subfolders neccessary to move the file first
  newFileNames.forEach(file => {
    newFilePath = file.slice(0, file.lastIndexOf('/'))
    !fs.existsSync(`${newFilePath}`) && fs.mkdirSync(`${newFilePath}`, { recursive: true })
  })
  //Actually move the file to the new location
  for (let i = 0; i < oldFilesPaths.length; i++) {
    fs.rename(oldFilesPaths[i], `${newFileNames[i]}`, (err) => {
      if (err) throw err;
    })
  }
})
