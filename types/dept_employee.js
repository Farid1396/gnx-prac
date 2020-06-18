const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const Employee = require('../models/employee').Employee;
const DeptEmploModel = require('../models/dept_employee').DeptEmplo;
const Departments = require('../models/departments').Department;

const {OneEmployeeCant2Titles} = require('../validators/dept_employee.validator');
const {DateSmall} = require('../validators/time.validator');
const {CantDelete} = require('../validators/delete.validator');

const {GraphQLString, GraphQLID, GraphQLObjectType} = graphql;

  const DepartmentEmployeeType = new GraphQLObjectType({
    name: 'DepartmentEmployeeType',
    description: 'Represent Department of Employee',
    extensions: {
      validations: {
        'CREATE': [OneEmployeeCant2Titles, DateSmall],
        'UPDATE': [OneEmployeeCant2Titles, DateSmall],
        'DELETE': [CantDelete],
      }
    },
    fields: () => ({
        depID: {type: GraphQLID},
        from_date: {type: GraphQLString},
        to_date: {type: GraphQLString},
        emp: {
          type: EmployeeType,
          extensions: {
            relation: {
              connectionField: 'empID',
            }
          },
          resolve (parent, args) {
            return Employee.findById(parent.empID);
          }
      },
      dept: {
        type: DepartmentType,
        extensions: {
          relation: {
            connectionField: 'depID',
          }
        },
        resolve (parent, args) {
          return Departments.findById(parent.depID);
        }
      }
    }),
});

gnx.connect(DeptEmploModel, DepartmentEmployeeType, 'departmentOfEmployee', 'deparmentsOfEmployees');

module.exports = DepartmentEmployeeType;

const EmployeeType = require('./employee');
const DepartmentType = require('./departments');