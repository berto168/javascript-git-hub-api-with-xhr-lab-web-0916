function getRepositories() {
  let username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoLinks = repos.reduce(function(a, b) {
    return a + `<li><a href="${b.html_url}">${b.name}</a> <a href="#" data-repository="${b.name}" data-username="${b.owner.login}" onclick="getCommits(this)">Get Commits</a> <a href="#" data-repository="${b.name}" data-username="${b.owner.login}" onclick="getBranches(this)">Get Branches</a></li>`;
  }, "");
  const repoList = `<ul>${repoLinks}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/'+ username + '/'+ name + '/commits')
  req.send()
}

function displayCommits() {
  var commits = JSON.parse(this.responseText)
  const commitChunk = commits.reduce(function(a, b) {
    return a + `<li>${b.author.login} - ${b.commit.author.name} - ${b.commit.message}</li>`;
  }, "");
  const commitList = `<ul>${commitChunk}</ul>`
  document.getElementById('details').innerHTML = commitList
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/'+ username + '/'+ name + '/branches')
  req.send()
}

function displayBranches() {
  var branches = JSON.parse(this.responseText)
  const branchChunk = branches.reduce(function(a, b) {
    return a + `<li>${b.name}</li>`;
  }, "");
  const branchList = `<ul>${branchChunk}</ul>`
  document.getElementById('details').innerHTML = branchList
}
