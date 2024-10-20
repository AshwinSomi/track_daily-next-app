"use client";

import React, { useState } from "react";
import { Fugaz_One } from "next/font/google";
import { gradients, baseRating } from "@/utils/index";

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Calendar(props) {
  const { demo, completeData, handleSetMood } = props;
  const now = new Date();
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(
    Object.keys(months)[currMonth]
  );
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  //const [selectJournal, setSelectJournal] = useState(" ");
  const [click, setClick] = useState(false);
  const [dayIdx, setDayIdx] = useState(null);

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};
  // console.log(
  //   "THIS MONTH DATA: ",
  //   data,
  //   completeData?.[selectedYear]?.[selectedMonth]
  // );
  function handleIncrementMonth(val) {
    //value +1 -1
    //if we it bounce of the month we adjust the year can display the month
    if (numericMonth + val < 0) {
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  }

  function handleClick(dayIndex) {
    setClick(true);
    setDayIdx(dayIndex);
  }

  const monthNow = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth),
    1
  );
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    selectedYear,
    Object.keys(selectedMonth).indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="grid grid-cols-5 gap-4">
        <button
          onClick={() => {
            handleIncrementMonth(-1);
          }}
          className="mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p
          className={
            "text-center col-span-3 capitalized whitespace-nowrap textGradient " +
            fugaz.className
          }
        >
          {selectedMonth}, {selectedYear}
        </p>
        <button
          onClick={() => {
            handleIncrementMonth(+1);
          }}
          className="ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10 ">
        {[...Array(numRows)].map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-7 gap-1 ">
            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
              let dayIndex =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

              let dayDisplay =
                dayIndex > daysInMonth
                  ? false
                  : row === 0 && dayOfWeekIndex < firstDayOfMonth
                  ? false
                  : true;

              let isToday = dayIndex === now.getDate();

              if (!dayDisplay) {
                return <div className="bg-white" key={dayOfWeekIndex} />;
              }

              let color = demo
                ? gradients.indigo[baseRating[dayIndex]]
                : dayIndex in data
                ? gradients.indigo[data[dayIndex].mood]
                : "white";

              return (
                <div
                  style={{ background: color }}
                  className={
                    "text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " +
                    (isToday ? " border-indigo-400" : " border-indigo-100") +
                    (color === "white" ? " text-indigo-400" : " text-white") +
                    " hover:cursor-pointer hover:opacity-60 "
                  }
                  key={dayOfWeekIndex}
                  onClick={() => handleClick(dayIndex)}
                >
                  <p>{dayIndex}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div>
        {click && data[dayIdx] && (
          <div
            className={
              "flex justify-center items-center bg-stone-200 rounded-lg p-6 md:p-8 lg:p-10 w-full "
            }
          >
            <p
              className={
                "text-black-opacity-70 text-sm md:text-base lg:text-lg leading-relaxed " +
                fugaz.className
              }
            >
              {" "}
              {data[dayIdx].journal}
            </p>
          </div>
        )}
      </div>
      {/* <div>{click && data[dayIdx] && <div>{click}, this is journal</div>}</div> */}
    </div>
  );
}
