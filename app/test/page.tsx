'use client'
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");

    const handleDateClick = (info: { date: Date; allDay: boolean }) => {
        const calendarApi = calendarRef.current?.getApi();

        if (calendarApi) {
            setModalOpen(true);
        }
    };

    const saveTask = () => {
        const calendarApi = calendarRef.current?.getApi();

        if (calendarApi && taskTitle.trim() !== "") {
            // Add task to the calendar
            calendarApi.addEvent({
                title: taskTitle,
                start: new Date( Date.now() ),
                allDay: false, // Set to false or true based on your requirement
            });

            // Close the modal and reset taskTitle
            setModalOpen(false);
            setTaskTitle("");
        }
    };

    return (
        <>
            <FullCalendar
                ref={calendarRef}
                plugins={[timeGridPlugin, interactionPlugin]}
                editable
                selectable
                selectMirror
                dateClick={handleDateClick}
            />

            {/* Render your custom modal element */}
            {isModalOpen && (

                <div className="custom-modal-overlay">
                    <div className="custom-modal">
                        <label>Task Title:</label>
                        <input
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                        <button onClick={saveTask}>Save</button>
                        <button onClick={() => setModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Calendar;
