const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const repoSchema = require('./repo').repoSchema;
const Repo = mongoose.model('Repo', repoSchema);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log('Connected to DB!'));


let save = (repos = []) => {  
  let promises = [];

  repos.forEach(repoObj => {
    promises.push(
      Repo.create({
        repo_github_id: repoObj.id,
        name: repoObj.name,
        forks: repoObj.forks,
        owner_id: repoObj.owner.id,
        url: repoObj.clone_url,
        created_at: new Date(repoObj.created_at),
        updated_at: new Date(repoObj.updated_at)
      })
      .catch(() => console.log('Error creating repo: ' + repoObj.id, ' name: ', repoObj.name))
    )
  });

  return Promise.all(promises);
};

let findSpecifiedNumber = (limit, callback) => {
  Repo.find({}, null)
    .sort('-forks')
    .limit(limit)
    .exec((err, repos) => {
      if (err) {
        callback('ERROR IN RETRIEVING 25 REPOS.')
      } else {
        callback(null, repos);
      }
    });
};

module.exports = {
  save,
  findSpecifiedNumber
};