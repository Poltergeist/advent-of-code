const parseTimestamp = function(string) {
  const [_, year, month, day, hour, minute] = string.match(
    /\[(\d{4})-(\d{2})-(\d{2})\ (\d{2})\:(\d{2})/
  );
  return { year, month, day, minute, hour };
};
let currentGuard = false;
const parseGuard = function(string) {
  const [_, guard] = string.match(/Guard\ \#(\d+)/) || ["", false];
  currentGuard = guard ? guard : currentGuard;
  return currentGuard;
};

module.exports = {
  parseInput(input) {
    let timetable = {};
    input = input
      .map(event => ({
        text: event,
        timestamp: parseTimestamp(event)
      }))
      .sort((a, b) => {
        const atimestamp = parseInt(
          [
            a.timestamp.year,
            a.timestamp.month,
            a.timestamp.day,
            a.timestamp.hour,
            a.timestamp.minute
          ].join("")
        );
        const btimestamp = parseInt(
          [
            b.timestamp.year,
            b.timestamp.month,
            b.timestamp.day,
            b.timestamp.hour,
            b.timestamp.minute
          ].join("")
        );
        return atimestamp - btimestamp;
      })
      .map(item => ({ ...item, guard: parseGuard(item.text) }));

    let sleepStart = 0;
    for (let i = 0; i < input.length; i++) {
      const { text, guard, timestamp } = input[i];
      if (/falls asleep/.test(text)) {
        sleepStart = timestamp.minute * 1;
      }
      if (/wakes up/.test(text)) {
        if (!timetable[`${guard}`]) {
          timetable[`${guard}`] = [];
        }
        for (let x = sleepStart; x < timestamp.minute * 1; x++) {
          timetable[`${guard}`][x] = !timetable[`${guard}`][x]
            ? 1
            : timetable[`${guard}`][x] + 1;
        }
      }
    }
    let highestFrequent = { guard: 0, minute: 0, frequency: 0 };
    Object.entries(timetable).forEach(([guard, times]) => {
      times.forEach((f, i) => {
        if (f > highestFrequent.frequency) {
          highestFrequent = { guard, minute: i, frequency: f };
        }
      });
    });

    return highestFrequent.guard * highestFrequent.minute;
  },
  parseTimestamp
};
