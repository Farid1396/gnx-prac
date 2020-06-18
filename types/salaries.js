const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const Employee = require('../models/employee').Employee;
const SalaryModel = require('../models/salaries').Salary;

const {DateSmall} = require('../validators/time.validator');
const {CantDeleteData} = require('../validators/delete.validator');

const {GraphQLString, GraphQLObjectType, GraphQLID, GraphQLFloat} = graphql;

  const SalaryType = new GraphQLObjectType({
    name: 'SalaryType',
    description: 'Represent Salaries',
    extensions: {
      validations: {
        'CREATE': [DateSmall],
        'UPDATE': [DateSmall],
        'DELETE': [CantDeleteData],
      }
    },
    fields: () => ({
        id: {type: GraphQLID},
        salary: {type: GraphQLFloat},
        from_date: {type: GraphQLString},
        to_date: {type: GraphQLString},
        emp: {
          type: EmployeeType,
          extensions: {
            relation: {
              embedded: false,
              connectionField: 'empID',
            }
          },
          resolve (parent, args) {
            return Employee.findById(parent.empID)
          }
      },
    }),
});

gnx.connect(SalaryModel, SalaryType, 'Salary', 'Salaries');

module.exports = SalaryType;

const EmployeeType = require('./employee');