import React, { useEffect, useState } from "react";
import "./style.css";
import { CalendarEvent, getCalendarEvents } from "../api-client";
import {
  getDateObjects,
  convertToList,
  SingleDay,
  getSummaryInfo,
  Summary,
} from "../helpers/callendarEvents";

const NUMBEROFDAYS = 7;

const CalendarSummary: React.FunctionComponent = () => {
  const [datesList, setDatesList] = useState<SingleDay[]>([]);
  const [summaryInfo, setSummaryInfo] = useState<Summary>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dateObjectList = getDateObjects(NUMBEROFDAYS);
    const dateListPromises: Promise<
      CalendarEvent[]
    >[] = dateObjectList.map((date) => getCalendarEvents(date));

    Promise.all(dateListPromises)
      .then((data) => {
        const convertedList = convertToList(dateObjectList, data);
        const summary = getSummaryInfo(convertedList);
        setSummaryInfo(summary);
        setDatesList(convertedList);
      })
      .catch((err) => {
        return alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <h1 className="centered">Loading...</h1>;

  return (
    <div>
      <h1 className="centered">Calendar summary</h1>

      {datesList.length ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Number of events</th>
              <th>Total duration [min]</th>
              <th>Longest event</th>
            </tr>
          </thead>
          <tbody>
            {datesList?.map(
              ({ date, totalDuration, numberOfEvents, longestEvent }) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td className="centered">{numberOfEvents}</td>
                  <td className="centered">{totalDuration}</td>
                  <td>{longestEvent}</td>
                </tr>
              )
            )}
            <tr>
              <td>Total</td>
              <td className="centered">{summaryInfo?.numbersOfEvents}</td>
              <td className="centered">{summaryInfo?.totalDuration}</td>
              <td>{summaryInfo?.longestEvent}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <h1>There is not any events... Try later</h1>
      )}
    </div>
  );
};

export default CalendarSummary;
