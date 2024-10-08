const lineEndings = process.platform === 'win32' ? '\r\n' : '\n';
const shedule = {};

const getPair = (time) => {
  if (time < "09:00:00") return 'первая'
  if (time < "10:45:00") return 'вторая'
  if (time < "12:45:00") return 'третья'
  if (time < "14:30:00") return 'четвертая'
  if (time < "16:15:00") return 'пятая'
  if (time < "19:00:00") return 'шестая'
}

const mapLessonToShedule = (lesson) => {
  const startTimeIndex = 4;
  const endTimeIndex = 5;
  const partisipantsIndex = 15;

  const lessonRows = lesson.split(lineEndings).slice(2).map((row) => row.split(','));
  const [date, startTime] = lessonRows[0][startTimeIndex].replace(/"/ig, '').split(' ');
  const [, endTime] = lessonRows[0][endTimeIndex].replace(/"/ig, '').split(' ');
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