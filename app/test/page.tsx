'use client'
import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
const Calendar = () => {
    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"timeGridWeek"}
                headerToolbar={
                    {
                        right: "prev,next today",
                        center: "title",
                        left: "dayGridMonth,timeGridWeek,timeGridDay",
                    }
                }
                height={"auto"}
            />
        </>
    );
};

export default Calendar;
