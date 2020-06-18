const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const titleFields = {
    title: String,
    from_date: String,
    to_date: String,
    empID: mongoose.Schema.Types.ObjectId,
    };
  
  const titleSchema = new Schema(titleFields);
  
  const Title = mongoose.model('Title', titleSchema);
  if (!Title.collection.collection) {
    Title.createCollection();
  }
  module.exports = {Title, titleFields};