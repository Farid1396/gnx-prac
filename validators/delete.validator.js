const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const {Department} = require('../models/departments');
const {Employee} = require('../models/employee');
const { model } = require('mongoose');

const CantDelete = {
    validate: async function(typeName, originalObject, materializedObject) {
        const employeeFind = await Employee.findOne({id: materializedObject.empID});
        if (employeeFind) {
            throw new CantDeleteDataEmploError(typeName);
        }
        const deptFind = await Department.findOne({id: materializedObject.depID});
        if (deptFind) {
            throw new CantDeleteDataDeptError(typeName);
        }
    }
};

const CantDeleteData = {
    validate: async function(typeName, originalObject, materializedObject) {
        const emplo = await Employee.findOne({id: materializedObject.empID});
        if (emplo) {
            throw new CantDeleteDataEmploError(typeName);
        }
    }
};

class CantDeleteDataEmploError extends GNXError {
    constructor(typeName) {
        super(typeName, 'Cant delete information of Employee', 'CantDeleteDataEmploError');
    }
}

class CantDeleteDataDeptError extends GNXError {
    constructor(typeName) {
        super(typeName, 'Cant delete information of Department', 'CantDeleteDataDeptError');
    }
}

module.exports = {CantDelete, CantDeleteData}