const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const DeptModel = require('../models/departments').Department;

const {CantRepeatName} = require('../validators/departments.validator');

const {GraphQLString, GraphQLObjectType, GraphQLID} = graphql;

  const DepartmentType = new GraphQLObjectType({
    name: 'DepartmentType',
    description: 'Represent Departments',
    extensions: {
      validations: {
        'CREATE': [CantRepeatName],
        'UPDATE': [CantRepeatName],
      }
    },
    fields: () => ({
        id: {type: GraphQLID},
        dept_name: {type: GraphQLString},
    }),
});

gnx.connect(DeptModel, DepartmentType, 'department', 'deparments');

module.exports = DepartmentType;