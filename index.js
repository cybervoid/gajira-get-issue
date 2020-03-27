const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

// Get the JSON webhook payload for the event that triggered the workflow
// const payload = JSON.stringify(github.context.payload, undefined, 2)
// console.log(`The event payload: ${payload}`);
// console.log('Element is ', github.context.payload.commits.head.ref);

const inputText = core.getInput('input-text');
try {
    const issue = findIssue(inputText);
    if (issue) {
        issueFound(issue[1]);
    } else {
        console.log("Issue not found on provided input: " + inputText);
        //try to search in github object
        const commitMessages = github.context.payload.commits;
        let res = commitMessages.some( function (element) {
            const issue = findIssue(element.message);
            if (issue){
                issueFound(issue[1]);
                return true;
            }
        });
        console.log("Pepe", res);
    }
} catch (error) {
    core.setFailed(error.message);
}

function findIssue(text) {
    let regex = new RegExp('.+\\/(.*-\\d+)', 'gim');
    return  regex.exec(text);
}

function issueFound(issue) {
    console.log("Issue found, Jira number: " + issue);
    core.setOutput("issue", issue);
    const filePath = require('os').homedir() + '/jira/';
    const fileName = 'config.yml';
    try {
        fs.mkdirSync(filePath, {recursive: true});
        fs.appendFileSync(filePath + fileName, 'issue: ' + issue[1] + '\r\n')
    } catch (e) {
        core.setFailed('Error trying to create the file ' + fileName);
    }
}