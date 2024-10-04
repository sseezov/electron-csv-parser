const lineEndings = process.platform === 'win32' ? '\r\n' : '\n';
const shedule = {};

const mapLessonToShedule = (lesson) => {
  const startTimeIndex = 4;
  const endTimeIndex = 5;
  const partisipantsIndex = 15;

  const lessonRows = lesson.split(lineEndings).slice(2).map((row) => row.split(','));
  let [date, startTime] = lessonRows[0][startTimeIndex].split(' ');
  date = date.slice(1);
  startTime = startTime.slice(0, startTime.length - 1);
  let endTime = lessonRows[0][endTimeIndex].split(' ')[1];
  endTime = endTime.slice(0, endTime.length - 1);
  const participants = lessonRows.map((row) => `${row[partisipantsIndex]}`).reduce((acc, elem) => acc.includes(elem) ? acc : acc.concat(elem), [])
  const table = [`ПЕРИОД ПАРЫ: ${startTime} - ${endTime}`, "УЧАСТНИКИ:", ...participants].join(lineEndings);
  shedule[date] ? shedule[date] = shedule[date].concat(`${lineEndings}${table}`) : shedule[date] = [`${lineEndings}${table}`];
};

const parseCsvToTxt = (csv) => {
  const lessons = csv.split(lineEndings.repeat(2)).filter((lesson) => lesson.split(lineEndings).length > 3);
  lessons.forEach((lesson) => mapLessonToShedule(lesson));
  return Object.keys(shedule).map((date) => `ДАТА: ${date}${lineEndings}${shedule[date].reverse().join(lineEndings)}`).join(lineEndings.repeat(2))
};

export { parseCsvToTxt };