const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const Employee = require('../models/employee').Employee;
const TitleModel = require('../models/titles').Title;

const {DateSmall} = require('../validators/time.validator');
const {CantDeleteData} = require('../validators/delete.validator');

const {GraphQLString, GraphQLObjectType, GraphQLID} = graphql;

  const TitleType = new GraphQLObjectType({
    name: 'TitleType',
    description: 'Represent Titles',
    extensions: {
      validations: {
        'CREATE': [DateSmall],
        'UPDATE': [DateSmall],
        'DELETE': [CantDeleteData],
      }
    },
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        from_date: {type: GraphQLString},
        to_date: {type: GraphQLString},
        empID: {
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
    }),
});

gnx.connect(TitleModel, TitleType, 'Title', 'Titles');

module.exports = TitleType;

const EmployeeType = require('./employee');