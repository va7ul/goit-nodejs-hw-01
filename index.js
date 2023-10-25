// Метод за допомогою yargs (треба перевизначити id на строку: newId = String(id))
// const argv = require('yargs').argv;

// Метод за допомогою commander
const { program } = require('commander');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const contacts = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const findingContact = await contacts.getContactById(id);
      console.log(findingContact);
      break;

    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case 'remove':
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

// const actionIndex = process.argv.indexOf('--action');
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }

invokeAction(argv);
