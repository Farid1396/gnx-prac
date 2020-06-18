const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const Employee = require('../models/employee').Employee;
const DeptManModel = require('../models/dept_manager').DeptMan;
const Departments = require('../models/departments').Department;

const {CantTwoManagersInSameDept} = require('../validators/dept_manager.validator');
const {DateSmall} = require('../validators/time.validator');
const {CantDelete} = require('../validators/delete.validator');

const {GraphQLString, GraphQLID, GraphQLObjectType} = graphql;

  const DepartmentManagerType = new GraphQLObjectType({
    name: 'DepartmentManagerType',
    description: 'Represent Department of Manager',
    extensions: {
      validations: {
        'CREATE': [CantTwoManagersInSameDept, DateSmall],
        'UPDATE': [CantTwoManagersInSameDept, DateSmall],
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
            return Employee.findById(parent.empID)
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

gnx.connect(DeptManModel, DepartmentManagerType, 'departmentOfManager', 'deparmentsOfManagers');

module.exports = DepartmentManagerType;

const EmployeeType = require('./employee');

const EmployeeType = require('./employee');
const DepartmentType = require('./departments');