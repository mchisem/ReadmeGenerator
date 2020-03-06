const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const writeFileAsync = util.promisify(fs.writeFile);

promptUser => {
    return inquirer.prompt([
      {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
      },
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
        name: "license",
        message: "What license should your project have?"
      },
      {
        type: "input",
        name: "installation",
        message: "What command should be installed to run dependencies?"
      },
      {
        type: "input",
        name: "test",
        message: "What command runs tests?"
      },
      {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repo?"
      },
      {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about adding to the repo?"
      }
    ]);
  }
  
  function generateREADME(answers) {
    return ` 
    ## GitHub Username
    
    ${answers.github}

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
    ${answers.installation}
    ...

    ## Usage 

    ${answers.usage}

    ## License

    ${answers.license}
    
    ## Contributing

    ${answers.contributing}

    ## Tests

    In order to run tests, input the following command:

    ...
    ${answers.test}
    ...

    ## Questions

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
  