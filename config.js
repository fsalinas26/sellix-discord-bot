const inquirer = require('inquirer')
const fs = require('fs');

var questions = [
  {
    type: 'input',
    name: 'token',
    message: "What's your Discord Bot Token?"
  },
  {
    type: 'input',
    name: 'sellix_auth',
    message: "What's your Sellix API Key?"
  },
  {
    type: 'input',
    name: 'prefix',
    message: "What command prefix do you want to use?"
  },
  {
    type: 'input',
    name: 'admins',
    message: "Comma-Seperated List of Admin Discord ID's: "
  }
]

inquirer.prompt(questions).then(answers => {
  answers['admins'] = answers['admins'].split(',');
  answers['nicknames'] = {'example':'6abc74103id'};
  fs.writeFile('./config.json',JSON.stringify(answers),function(err,data){
      console.log(data);
  });
  console.log('config.json created successfully');
})
