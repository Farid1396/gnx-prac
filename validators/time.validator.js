const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const DateSmall = {
    validate: async function(typeName, originalObject, materializedObject) {
        if (materializedObject.from_date >= materializedObject.to_date) {
            throw new TimeError(typeName);
        }
    }};
    
    class TimeError extends GNXError {
        constructor(typeName) {
            super(typeName, 'from_date strictly to_date', 'TimeError');
        }
    }

module.exports = {DateSmall};