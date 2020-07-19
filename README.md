# gajira-get-issue
Finds a Jira Issue from string

![](https://github.com/cybervoid/gajira-get-issue/workflows/main/badge.svg)
## Usage
To easily find Jira issue from commits or branch, I recommend [Jira Find issue key](https://github.com/marketplace/actions/jira-find-issue-key), the official Jira's release action. What's different with this action,
if you still need to find an issue when a PR is opened or even when the PR is merged, this action will receive any string and try to find it there and if it's not found, then it will go to the github object and try to find
it from messages created by github.

> ##### Note: this action is compatible with the official Jira actions [Jira Login Action](https://github.com/marketplace/actions/jira-login)

To find an issue key inside commit messages:
```yaml
- name: Find in commit messages
  uses: cybervoid/gajira-get-issue@v1.0
  with:
    input-text: ${{ github.ref }}
```

----
## Action Spec:

### Environment variables
- None

### Inputs
- `input-text` - Provide any string to extract issue from

### Outputs
- `issue` - Key of the found issue

### Reads fields from config file at $HOME/jira/config.yml
- None

### Writes fields to config file at $HOME/jira/config.yml
- `issue` - a key of a found issue

### Writes fields to CLI config file at $HOME/.jira.d/config.yml
- `issue` - a key of a found issue