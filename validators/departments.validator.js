const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const {Department} = require('../models/departments');

const CantRepeatName = {
    validate: async function(typeName, originalObject, materializedObject) {
        const DeptFinded = await Department.findOne({name: materializedObject.name});
        if (DeptFinded && DeptFinded.id != materializedObject.id) {
            throw new CantTwoDepartmentsError(typeName);
        }
    }};
  class CantTwoDepartmentsError extends GNXError {
    constructor(typeName) {
      super(typeName,'Name cant be repeated', 'CantTwoDepartmentsError');
    }
  };

module.exports = {CantRepeatName}