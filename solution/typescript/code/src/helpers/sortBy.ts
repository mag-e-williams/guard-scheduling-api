type SortByProps<T> = {
  field: keyof T;
  reverse?: boolean;
  primer?: (x: any) => any;
};

export const sortBy = <T>(list: T[], { field, reverse, primer }: SortByProps<T>): T[] => {
  const key = primer
    ? (x: T) => primer(x[field])
    : (x: T) => x[field];

  const sortedList = [...list];
  sortedList.sort((a: T, b: T) => {
    const aValue = key(a);
    const bValue = key(b);
    return (aValue > bValue) ? 1 : (aValue < bValue) ? -1 : 0;
  });

  if (reverse) {
    sortedList.reverse();
  }

  return sortedList;
};