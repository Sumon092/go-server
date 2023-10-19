"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumericFilterCondition = exports.serviceFilterableFields = exports.serviceSearchableFields = void 0;
exports.serviceSearchableFields = [
    'title',
    'address',
    'city',
    'type',
];
exports.serviceFilterableFields = [
    'searchTerm',
    'minRent',
    'maxRent',
    'category',
    'city',
];
function generateNumericFilterCondition(key, filterValue, operator) {
    const numericValue = parseFloat(filterValue);
    if (!isNaN(numericValue)) {
        const condition = {};
        condition[key] = {
            [operator]: numericValue,
        };
        return condition;
    }
    return null;
}
exports.generateNumericFilterCondition = generateNumericFilterCondition;
