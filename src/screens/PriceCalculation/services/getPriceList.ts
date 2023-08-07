export default function getPriceList(list: PriceCalculation.PriceFields[]) {
  let numSum = 0;
  list.forEach(v => {
    if (v.type === 'numeric') numSum += v.value;
  });

  return list
    .sort((a, b) => {
      if (a.type === 'numeric' && b.type === 'numeric') {
        return a.position - b.position;
      } else if (a.type === 'numeric' && b.type === 'percentage') {
        return -1;
      } else if (a.type === 'percentage' && b.type === 'numeric') {
        return 1;
      }
      return -1;
    })
    .map(v => {
      let value = '';
      if (v.type === 'numeric') value = v.value.toFixed(1) + ' Rs';
      else
        value =
          v.value.toString() +
          '% (' +
          ((v.value * numSum) / 100).toFixed(1) +
          ' Rs)';
      return {
        key: v.name,
        value,
      };
    });
}
