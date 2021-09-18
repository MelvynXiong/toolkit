function formatSize(size, base) {
  let num = parseInt(size, 10);
  if (isNaN(num)) {
    return 0;
  }
  const divisor = base || 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let index = 0;
  while (index < units.length - 1 && num >= divisor) {
    num = parseFloat((num / divisor).toFixed(2));
    index++;
  }
  return `${num}${units[index]}`;
}
