const parseLesson = (lesson) => {
  const lessonRows = lesson.split('\r\n').slice(2).map((row) => row.split(','));
  const startTime = lessonRows.map((row) => `${row[4]}`)[0];
  const endTime = lessonRows.map((row) => `${row[5]}`)[0];
  const participants = lessonRows.map((row) => `${row[15]}`).reduce((acc, elem) => acc.includes(elem) ? acc : acc.concat(elem), [])
  const table = [`ДАТА: ${startTime.split(' ')[0]}"`, `ПЕРИОД ПАРЫ: "${startTime.split(' ')[1]} - "${endTime.split(' ')[1]}`, "УЧАСТНИКИ:", ...participants];
  return table.join('\r\n');
}

const parseCsvToTxt = (csv) => {
  const lessons = csv.split('\r\n\r\n').filter((lesson) => lesson.split('\r\n').length > 3);
  return lessons.map((lesson) => parseLesson(lesson)).join('\r\n\r\n');
}


export { parseCsvToTxt };
