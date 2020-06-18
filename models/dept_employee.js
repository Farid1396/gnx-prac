const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptEmploFields = {
    depID: mongoose.Schema.Types.ObjectId,
    from_date: String,
    to_date: String,
    empID: mongoose.Schema.Types.ObjectId,
    };
  
  const deptEmploSchema = new Schema(deptEmploFields);
  
  const DeptEmplo = mongoose.model('DeptEmplo', deptEmploSchema);
  if (!DeptEmplo.collection.collection) {
    DeptEmplo.createCollection();
  }
  module.exports = {DeptEmplo, deptEmploFields};