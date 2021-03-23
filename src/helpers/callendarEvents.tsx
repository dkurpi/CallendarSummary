import { CalendarEvent } from "../api-client";

export interface SingleDay {
  date: string;
  numberOfEvents: number;
  totalDuration: number;
  longestEvent: string;
  longestEventTime: number;
}

export interface Summary {
  totalDuration: number;
  longestEvent: string;
  numbersOfEvents: number;
}

export const getDateObjects = (counter: number): Date[] => {
  const currentDate = new Date();
  const dates = new Array(counter)
    .fill(null)
    .map(
      (date, index) =>
        new Date(new Date().setDate(currentDate.getDate() + index))
    );

  return dates;
};

export const getSingleDayObject = (
  dateObject: Date,
  events: CalendarEvent[]
): SingleDay => {
  const numberOfEvents = events.length;

  const date = dateObject.toISOString().slice(0, 10);
  let totalDuration = 0;
  let longestEvent = "";
  let longestEventTime = 0;

  for (let event of events) {
    totalDuration += event.durationInMinutes;

    if (longestEventTime < event.durationInMinutes) {
      longestEventTime = event.durationInMinutes;
      longestEvent = event.title;
    }
  }

  return {
    date,
    numberOfEvents,
    totalDuration,
    longestEvent,
    longestEventTime,
  };
};

export const convertToList = (
  dates: Date[],
  callendarList: CalendarEvent[][]
) => {
  return dates.map((date, index) =>
    getSingleDayObject(date, callendarList[index])
  );
};

export const getSummaryInfo = (list: SingleDay[]) => {
  let totalDuration = 0;
  let numbersOfEvents = 0;
  let longestEvent = "";
  let longesEventTime = 0;

  for (let item of list) {
    totalDuration += item.totalDuration;
    numbersOfEvents += item.numberOfEvents;
    if (longesEventTime < item.longestEventTime) {
      longestEvent = item.longestEvent;
      longesEventTime = item.longestEventTime;
    }
  }

  return { totalDuration, longestEvent, numbersOfEvents };
};
