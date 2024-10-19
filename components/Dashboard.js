"use client";
import React, { useEffect, useState } from "react";
import { Fugaz_One } from "next/font/google";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContect";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const { currentUser, userDataObject, setUserDataObject, loading } = useAuth();
  const [data, setData] = useState({});
  const now = new Date();

  function countValues() {
    let total_number_of_days = 0;
    let sum_moods = 0;
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day];
          total_number_of_days += 1;
          sum_moods += days_mood;
        }
      }
    }
    return {
      num_days: total_number_of_days,
      average_mood: sum_moods / total_number_of_days,
    };
  }

  async function handleSetMood(mood) {
    //const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObject };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;
      //update the current state
      setData(newData);
      //update the global state
      setUserDataObject(newData);
      //update firebase
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
      //res();
    } catch (err) {
      console.log("failed to set data", err.message);
    }
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  const moods = {
    Bruhhh: "😭",
    sad: "🥲",
    Existing: "😶",
    Good: "🙂",
    Elated: "😍",
  };

  useEffect(() => {
    if (!currentUser || !userDataObject) {
      return;
    }
    setData(userDataObject);
  }, [currentUser, userDataObject]);

  if (loading) {
    <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div
        className="grid grid-cols-3 bg-indigo-50 text-indigo-500 
      rounded-lg"
      >
        {Object.keys(statuses).map((status, statusIndex) => (
          <div key={statusIndex} className="p-4 flex flex-col gap-1 sm:gap-2">
            <p className="font-medium capitalize text-xs sm:text-sm truncate ">
              {status.replaceAll("_", " ")}
            </p>
            <p className={"text-base sm:text-lg truncate " + fugaz.className}>
              {statuses[status]}
              {status === "num_days" ? "D Streak" : " "}
            </p>
          </div>
        ))}
      </div>
      <h4
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        How do you <span className="textGradient ">feel</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4 ">
        {Object.keys(moods).map((mood, moodIndex) => (
          <button
            onClick={() => {
              const currentMoodValue = moodIndex + 1;
              handleSetMood(currentMoodValue);
            }}
            className={
              "p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1 "
            }
            key={moodIndex}
          >
            <p className="text-4xl sm: 5-xl md:6xl ">{moods[mood]}</p>
            <p
              className={
                "text-indigo-500 text-xs sm:text-sm md:text-base" +
                fugaz.className
              }
            >
              {mood}
            </p>
          </button>
        ))}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
