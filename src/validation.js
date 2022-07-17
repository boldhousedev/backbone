
/**
 * 
 */
import _ from 'underscore-bd';
import validate from 'validate-bd';

var validation = _.clone(validate);
validation.validateAll = true;
validation.validations = function () { return {}; };

export default validation;