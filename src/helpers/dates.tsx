import { CalendarEvent  } from "../api-client";


export const getDatesObjectFromCurrentDay = (counter: number): Date[] => {
  const currentDate = new Date();
  const dates = new Array(counter)
    .fill(null)
    .map(
      (date, index) =>
        new Date(new Date().setDate(currentDate.getDate() + index))
    );

  return dates;
};

export const convertTolist = (
  dates: Date[],
  callendarList: CalendarEvent[][]
) => {
  return dates.map((date, index) => {
    console.log(getSingleDayObject(date, callendarList[index]));

    return getSingleDayObject(date, callendarList[index]);
  });
};

export const getSingleDayObject = (
  dateObject: Date,
  events: CalendarEvent[]
): SingleDayObject => {
  const numberOfEvents = events.length;

  const date = dateObject.toISOString().slice(0, 10);
  let totalDuration = 0;
  let longestEvent = "";
  let maxTime = 0;

  for (let event of events) {
    totalDuration += event.durationInMinutes;

    if (maxTime < event.durationInMinutes) {
      maxTime = event.durationInMinutes;
      longestEvent = event.title;
    }
  }

  return {
    date,
    numberOfEvents,
    totalDuration,
    longestEvent,
  };
};
