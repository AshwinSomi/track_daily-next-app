import React from "react";

export default function Main(props) {
  const { children } = props;
  return <div className=" flex-1 flex-col p-4 sm:p-8 ">{children}</div>;
}
