const lineEndings = process.platform === 'win32' ? '\r\n' : '\n';
const shedule = {};

const mapLessonToShedule = (lesson) => {
  const lessonRows = lesson.split(lineEndings).slice(2).map((row) => row.split(','));
  const [date, startTime] = lessonRows.map((row) => `${row[4]}`)[0].split(' ');
  const endTime = lessonRows.map((row) => `${row[5]}`)[0];
  const participants = lessonRows.map((row) => `${row[15]}`).reduce((acc, elem) => acc.includes(elem) ? acc : acc.concat(elem), [])
  const table = [`ПЕРИОД ПАРЫ: "${startTime} - "${endTime.split(' ')[1]}`, "УЧАСТНИКИ:", ...participants].join(lineEndings);
  shedule[date] ? shedule[date] = shedule[date].concat(`${lineEndings}${table}`) : shedule[date] = [table];
}

// const sheduleToString = () => {
//   return Object.keys(shedule).map((date) => `ДАТА: ${date}${lineEndings}${shedule[date]}`).join(lineEndings.repeat(2))
// }

const parseCsvToTxt = (csv) => {
  const lessons = csv.split(lineEndings.repeat(2)).filter((lesson) => lesson.split(lineEndings).length > 3);
  lessons.forEach((lesson) => mapLessonToShedule(lesson));
  return Object.keys(shedule).map((date) => `ДАТА: ${date}${lineEndings}${shedule[date].reverse().join(lineEndings)}`).join(lineEndings.repeat(2))
}

export { parseCsvToTxt };
