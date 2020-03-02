const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const writeFileAsync = util.promisify(fs.writeFile);

promptUser => {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your project's name?"
      },
      {
        type: "input",
        name: "description",
        message: "How would you describe your project?"
      },
      {
        type: "input",
        name: "table",
        message: "How would you describe your project?"
      },
      {
        type: "input",
        name: "installation",
        message: "How would you describe your project?"
      },
      {
        type: "input",
        name: "usage",
        message: "What is your project used for?"
      },
      {
        type: "input",
        name: "licence",
        message: "What is your user license?"
      },
      {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your GitHub user email?"
      }
    ]);
  }
  
  function generateREADME(answers) {
    return ` 
    # Project Name	
    ${answers.name}

    ## Description
    ${answers.description}

    ## Table of Contents	
    * [Installation](#installation)
    * [Usage](#usage)
    * [License](#license)
    * [Contributing](#contributing)
    * [Tests](#tests)
    * [Questions](#questions)

    ## Installation

    ...
    npm inquirer/
    npm axios/
    ...

    ## Usage 
    ${answers.usage}

    ## License
    ${answers.license}
    
    ## Contributing

    ## Tests

    In order to run tests, input the following command:

    ...
    npm test
    ...

    ## Questions

    ## GitHub Username
    ${answers.github}

    `;
  }
  
  promptUser()
    .then(function(answers) {
      const md = generateREADME(answers);
  
      return writeFileAsync("README.md", md);
    })
    .then(function() {
      console.log("You did it!");
    })
    .catch(function(err) {
      console.log(err);
    });
  