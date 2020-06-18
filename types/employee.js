const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const Employee = require('../models/employee').Employee;
const GenderTypeEnum = require('./genders/gender');

const {CantRepeatDNI, EmployeeMay18} = require('../validators/employee.validator');

const {GraphQLString, GraphQLID, GraphQLObjectType, GraphQLInt} = graphql;

  const EmployeeType = new GraphQLObjectType({
    name: 'EmployeeType',
    description: 'Represent Employees',
    extensions: {
      validations: {
        'CREATE': [CantRepeatDNI, EmployeeMay18],
        'UPDATE': [CantRepeatDNI, EmployeeMay18]
      },
    },
    fields: () => ({
        id: {type: GraphQLID},
        dni: {type: GraphQLInt},
        birth_date: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        gender: {type: GenderTypeEnum},
        hire_date: {type: GraphQLString},
    }),
});

gnx.connect(Employee, EmployeeType, 'Employee', 'Employees');

module.exports = EmployeeType;