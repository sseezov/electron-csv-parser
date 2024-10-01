const parseCsvToTxt = (csv) => {
  const data = csv.split('\n').map((row) => row.split(','));
  const date = ''
  const heading = `      Имя      ||  Время на уроке  `;
  return heading;
}

export { parseCsvToTxt };