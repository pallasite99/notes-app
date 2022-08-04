const yargs = require('yargs')
const noteUtils = require('./notes.js')

// customise yargs version
yargs.version('1.1.0')

// add, remove, read, list commands
// create add command
yargs.command({
    command: 'add',
    description: 'add a new note',
    builder: {
        title: {
            describe: 'title for the note',
            // To make a flag or option required, uncomment
            //demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'note body text',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        noteUtils.addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: 'remove',
    description: 'remove a note',
    builder: {
        name: {
            describe: 'name of note to be deleted',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        noteUtils.removeNote(argv.name)
    }
})

// create read command
yargs.command({
    command: 'read',
    description: 'read a note',
    builder: {
        name: {
            describe: 'name of note to be read',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        noteUtils.readNote(argv.name)
    }
})

// create list command
yargs.command({
    command: 'list',
    description: 'list notes',
    handler() {
        noteUtils.listNotes()
    }
})

// node app.js add --title="my new note"
// { _: [ 'add' ], title: 'my new note', '$0': 'app.js' }
// console.log(yargs.argv)
yargs.parse()