import React, { useEffect, useState } from "react";
import { CalendarEvent, getCalendarEvents } from "../api-client";
import { getDatesObjectFromCurrentDay, convertTolist } from "../helpers/dates";

const CalendarSummary: React.FunctionComponent = () => {
  const [datesList, setDatesList] = useState<SingleDayObject[]>([]);

  useEffect(() => {
    const dateObjectList = getDatesObjectFromCurrentDay(7);
    const dateListPromises: Promise<CalendarEvent[]>[] = dateObjectList.map((date) =>
      getCalendarEvents(date)
    );

    Promise.all(dateListPromises).then((data) => {
      const convertedList = convertTolist(dateObjectList, data);
      setDatesList(convertedList);
    });
  }, []);

  return (
    <div>
      <h2>Calendar summary</h2>

      <table>
        <tr>
          <th>Date</th>
          <th>Number of events</th>
          <th>Total duration [min]</th>
          <th>Longest event</th>
        </tr>

        {datesList.map(
          ({ date, totalDuration, numberOfEvents, longestEvent }) => (
            <tr>
              <td>{date}</td>
              <td>{numberOfEvents}</td>
              <td>{totalDuration}</td>
              <td>{longestEvent}</td>
            </tr>
          )
        )}
      </table>
    </div>
  );
};

export default CalendarSummary;
