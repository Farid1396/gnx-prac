const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const {Employee} = require('../models/employee');

const CantRepeatDNI = {
    validate: async function(typeName, originalObject, materializedObject) {
        const EmployeeFinded = await Employee.findOne({dni: materializedObject.dni});
        if (EmployeeFinded) {
            throw new CantUpdateEmployeeWithDNIUsedError(typeName);
        }
    }};
  class CantUpdateEmployeeWithDNIUsedError extends GNXError {
    constructor(typeName) {
      super(typeName,'DNI cant be repeated', 'CantUpdateEmployeeWithDNIUsedError');
    }
  };

  const EmployeeMay18 = {
    validate: async function(typeName, originalObject, materializedObject) {
        const employee = await moment().year() - moment(materializedObject.birth_date).year();
        
        if (employee < 18) {
            throw new CantRegisterEmployee(typeName);
        }
    }};
  class CantRegisterEmployee extends GNXError {
    constructor(typeName) {
      super(typeName,'Employee cant under 18', 'CantRegisterEmployee');
    }
  };

  module.exports = {CantRepeatDNI, EmployeeMay18};