import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker(props) {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        props.show(date);
        //console.log(JSON.stringify(date));
    });
   
    return (
      <DatePicker selected={date} onChange={date => setDate(date)} />
    );
}