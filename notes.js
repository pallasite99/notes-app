const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    // chrome://inspect
    // debugger

    if (!duplicateNote){
        notes.push ({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('new note added!'))
    } else{
        console.log(chalk.yellow.inverse('note title is duplicate. cannot store!'))
    }
}

const removeNote = (name) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== name)

    if (notes.length === notesToKeep.length){
        console.log(chalk.red.inverse('note could not be removed!'))
        return
    }
    console.log(chalk.green.inverse('note removed :)'))
    // now this contains array of all notes except one to be removed
    saveNotes(notesToKeep)
}

const loadNotes = () => {
    try {
        const dataBuf = fs.readFileSync('notes.json')
        const dataJSON = dataBuf.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const saveNotes = (notes) => {
    const newNoteJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', newNoteJSON)
}

const listNotes = () => {
    console.log(chalk.blue.inverse('Your notes'))
    const notes = loadNotes()
    notes.forEach((noteElem) => {
        console.log(noteElem.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const readNote = notes.find((note) => note.title === title)
    if(readNote) {
        console.log(chalk.blue.inverse(title + ':'))
        console.log(chalk.inverse(readNote.body))
    } else {  
        console.log(chalk.red.inverse('could not find note titled: ' + title)) 
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}