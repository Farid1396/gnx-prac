const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const {DeptEmplo} = require('../models/dept_employee');

const OneEmployeeCant2Titles = {
    validate: async function(typeName, originalObject, materializedObject) {
        const employee = await DeptEmplo.findOne({empID: materializedObject.empID});
        if (employee) {
            if (
            (materializedObject.from_date >= employee.from_date &&
                employee.to_date >= materializedObject.from_date) ||
            (materializedObject.to_date >= employee.from_date &&
                employee.to_date >= materializedObject.to_date)
            ) {
                throw new EmployeeError(typeName);
            }
        }
    }};
    
    class EmployeeError extends GNXError {
        constructor(typeName) {
            super(typeName, 'Cant employee in a Department in the same time', 'EmployeeError');
        }
    }

module.exports = {OneEmployeeCant2Titles};