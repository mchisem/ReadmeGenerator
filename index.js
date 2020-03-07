const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

inquirer
  .prompt([
    {
      type: "input",
      name: "username",
      message: "Enter your GitHub username"
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
  ])
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;


    axios.get(queryUrl)
    .then(function (response) {
      //map will always return an array//
      const repoNames = response.data.map(function(repo){
        return repo.name;
      });
      console.log(response);

      //slash n means new line//
      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("repos.txt", repoNamesStr, function(err){
        if(err) {
          throw err;
        }
      });
    })
  
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  
  });

  // function generateREADME(answers) {
  //   return ` 
  //   ## GitHub Username
    
  //   ${answers.github}

  //   # Project Name	

  //   ${answers.name}

  //   ## Description

  //   ${answers.description}

  //   ## Table of Contents	
  //   * [Installation](#installation)
  //   * [Usage](#usage)
  //   * [License](#license)
  //   * [Contributing](#contributing)
  //   * [Tests](#tests)
  //   * [Questions](#questions)

  //   ## Installation

  //   ...
  //   ${answers.installation}
  //   ...

  //   ## Usage 

  //   ${answers.usage}

  //   ## License

  //   ${answers.license}
    
  //   ## Contributing

  //   ${answers.contributing}

  //   ## Tests

  //   In order to run tests, input the following command:

  //   ...
  //   ${answers.test}
  //   ...

  //   ## Questions`;
  // }
  
  // async function init() {
  //   // console.log("hi")
  //   try {
  //     const answers = await promptUser();
  
  //     const md = generateREADME(answers);
  
  //     await writeFileAsync("README.md", md);
  
  //     console.log("Successfully wrote to README.md");
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }
  
  // init();
    
//   promptUser()
//     .then(function({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;


//     axios.get(queryUrl)
//       .then(function (response) {
//       const md = generateREADME(answers);
  
//       return writeFileAsync("README.md", md);

//       console.log(response);
//       });

//       console.log(response);
  
//       //slash n means new line//
//       const repoNamesStr = repoNames.join("\n");

//       fs.writeFile("README.md", repoNamesStr, function(err){
//         if(err) {
//           throw err;
//         }
//       });
//     })
    
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .finally(function () {
//       // always executed
//     });
//   ;

