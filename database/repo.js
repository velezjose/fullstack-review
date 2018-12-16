const mongoose = require('mongoose');

// Defining the Repo Schema and Model
const repoSchema = mongoose.Schema({
  repo_github_id: {
    type: Number,
    unique: true
  },
  name: String,
  forks: Number,
  owner_id: Number,
  url: String,
  created_at: Date,
  updated_at: Date
});

module.exports = {
  repoSchema
};