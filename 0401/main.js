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
        const btimestamp =
          [
            b.timestamp.year,
            b.timestamp.month,
            b.timestamp.day,
            b.timestamp.hour,
            b.timestamp.minute
          ].join("") * 1;
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
        if (!timetable[`${timestamp.month}${timestamp.day}-${guard}`]) {
          timetable[`${timestamp.month}${timestamp.day}-${guard}`] = [];
        }
        for (let x = sleepStart; x < timestamp.minute * 1; x++) {
          timetable[`${timestamp.month}${timestamp.day}-${guard}`][x] = "x";
        }
      }
    }
    let guardRanks = Object.entries(timetable).reduce((acc, [key, value]) => {
      let [_date, guard] = key.split("-");
      value = value.join("");
      acc[guard] = acc[guard] ? value.length + acc[guard] : value.length;
      return acc;
    }, {});
    let [sleepyGuard] = Object.entries(guardRanks).sort(
      (a, b) => b[1] - a[1]
    )[0];
    let highestTime = { minute: 0, times: 0 };
    Object.entries(timetable)
      .filter(([dateGuard]) => {
        return dateGuard.split("-")[1] === sleepyGuard;
      })
      .reduce((acc, [_, times]) => {
        times.forEach((_, index) => {
          if (!acc[index]) {
            acc[index] = 0;
          }
          acc[index]++;
        });
        return acc;
      }, [])
      .forEach((value, index) => {
        if (value >= highestTime.times) {
          highestTime = { times: value, minute: index };
        }
      });
    return highestTime.minute * sleepyGuard;
  },
  parseTimestamp
};
