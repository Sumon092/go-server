export const serviceSearchableFields: string[] = [
  'title',
  'address',
  'city',
  'type',
];

export const serviceFilterableFields = [
  'searchTerm',
  'minRent',
  'maxRent',
  'category',
  'city',
];

export function generateNumericFilterCondition(
  key: string,
  filterValue: string,
  operator: 'gte' | 'lte'
): { [key: string]: { [x: string]: number } } | null {
  const numericValue = parseFloat(filterValue);
  if (!isNaN(numericValue)) {
    const condition: { [key: string]: { [x: string]: number } } = {};
    condition[key] = {
      [operator]: numericValue,
    };
    return condition;
  }
  return null;
}
