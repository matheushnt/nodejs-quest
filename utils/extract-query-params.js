//  '?search=Joaquim&page=2'

// ['search=Joaquim', 'page=2']

// ['search', 'Joaquim']
// ['page', '2']

export function extractQueryParams(query) {
  return query
    .substring(1)
    .split('&')
    .reduce((queryParams, param) => {
      const [key, value] = param.split('=');

      queryParams[key] = value;

      return queryParams;
    }, {});
}
