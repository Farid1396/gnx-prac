const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const {DeptMan} = require('../models/dept_manager');

const CantTwoManagersInSameDept = {
    validate: async function(typeName, originalObject, materializedObject) {
        const manager = await DeptMan.findOne({empID: materializedObject.empID});
        if (manager) {
            if (
            (materializedObject.from_date >= manager.from_date &&
                manager.to_date >= materializedObject.from_date) ||
            (materializedObject.to_date >= manager.from_date &&
                manager.to_date >= materializedObject.to_date)
            ) {
                throw new ManagerError(typeName);
            }
        }
    }};
    
    class ManagerError extends GNXError {
        constructor(typeName) {
            super(typeName, 'Cant manager in a Department in the same time', 'ManagerError');
        }
    }

module.exports = {CantTwoManagersInSameDept};