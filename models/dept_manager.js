const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptManFields = {
    depID: mongoose.Schema.Types.ObjectId,
    from_date: String,
    to_date: String,
    empID: mongoose.Schema.Types.ObjectId,
    };
  
  const deptManSchema = new Schema(deptManFields);
  
  const DeptMan = mongoose.model('DeptMan', deptManSchema);
  if (!DeptMan.collection.collection) {
    DeptMan.createCollection();
  }
  
  module.exports = {DeptMan, deptManFields};