const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
    const inputText = core.getInput('input-text');
    let regex = new RegExp('.+\\/(.*-\\d+)', 'gim');
    let issue = regex.exec(inputText);

    if (issue && Array.isArray(issue)) {
        console.log("Issue found, Jira number: " + issue[1]);

        const filePath = require('os').homedir() + '/jira/';
        const fileName = 'config.yml';
        try {
            fs.mkdirSync(filePath, {recursive: true});
            fs.appendFileSync(filePath + fileName, 'issue=' + issue[1] + '\r\n')
        } catch (e) {
            core.setFailed('Error trying to create the file ' + fileName);
        }
    } else {
        core.setFailed("Issue not found on: " + inputText);
    }
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
