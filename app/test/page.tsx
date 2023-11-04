"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { set } from 'animejs'
import { useSearchParams } from 'next/navigation';
import NavBar from '../components/navBar';


interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;
}

export default function Home() {
    const [events, setEvents] = useState([
        { title: 'event 1', id: '1' },
        { title: 'event 2', id: '2' },
        { title: 'event 3', id: '3' },
        { title: 'event 4', id: '4' },
        { title: 'event 5', id: '5' },
    ])
    const [allEvents, setAllEvents] = useState<Event[]>([])
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState<number | null>(null)
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: '',
        allDay: false,
        id: 0
    })
    const searchParams = useSearchParams();
    const idEmployee = searchParams.get('idEmployee');

    if (idEmployee == null) {
        window.location.href = "/login";
    }

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [pause, setBreak] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();
    const [data, setData] = useState({ isStart: false, isEnd: false });
    const [loading, setLoading] = useState(true);




    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const buttonValue = event.currentTarget.value;
        console.log('Clicked button value: ' + buttonValue);
        var time = (typeof newEvent.start === 'string' ? newEvent.start : newEvent.start.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }));
        if (buttonValue == "start") {
            setStartTime(time);
        } else if (buttonValue == "end") {
            setEndTime(time);
        } else if (buttonValue == "pause") {
            setBreak(time);
        }
    };


    useEffect(() => {


        let draggableEl = document.getElementById('draggable-el')
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function (eventEl) {
                    let title = eventEl.getAttribute("title")
                    let id = eventEl.getAttribute("data")
                    let start = eventEl.getAttribute("start")
                    return { title, id, start }
                }
            })
        }
    }, [])

    //GET REQUEST TO THE SERVER :
    useEffect(() => {
        const apiUrl = "http://localhost:8080/GestionTempsTravail_war_exploded/Servlets.workTimeServlet?idEmployee=" + idEmployee;
        axios
            .get(apiUrl)
            .then((response) => {
                setData(response.data);
                console.log(response.data.isStart);
                console.log(response.data.isEnd);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    router.push("/login");
                } else {
                    setError(err);
                }
            });
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setAllEvents([...allEvents, newEvent])
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id: 0
        })


        try {
            const response = await axios.post(
                'http://localhost:8080/GestionTempsTravail_war_exploded/Servlets.workTimeServlet',
                `start_time=${startTime}&end_time=${endTime}&pause=${pause}&idEmployee=${idEmployee}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );


            if (response.status === 200) {
                console.log("ouliaa");
                // window.location.href = '/test?idEmployee=' + idEmployee;
                router.push('/test?idEmployee=' + idEmployee);
            } else if (response.status === 401) {
                // router.push('/login');
            } else {

                setError(true);
            }
        } catch (err) {
            console.error(error);

            setError(true);
        }
    }


    function handleDateClick(arg: { date: Date, allDay: boolean }) {
        setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() })

        console.log("Date Click Data:", arg.date);
        console.log("All Day:", arg.allDay);
        console.log("New Event Data:", newEvent);

        setShowModal(true)
    }

    function addEvent(data: DropArg) {
        const event = {
            ...newEvent,
            start: data.date.toISOString(),
            title: data.draggedEl.innerText,
            allDay: data.allDay,
            id: new Date().getTime()
        }
        setAllEvents([...allEvents, event])

        setStartTime("00:00:00");
        setEndTime("00:00:00")

        console.log("Dropped Event Data:", event);
    }

    function handleDeleteModal(data: { event: { id: string } }) {
        setShowDeleteModal(true)
        setIdToDelete(Number(data.event.id))

        console.log("Event to Delete:", data.event);
    }

    function handleDelete() {
        setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
        setShowDeleteModal(false)
        setIdToDelete(null)


        console.log("Deleted Event ID:", idToDelete);
    }

    function handleCloseModal() {
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id: 0
        })
        setShowDeleteModal(false)
        setIdToDelete(null)

        console.log("Modal Closed");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewEvent({
            ...newEvent,
            title: e.target.value
        })
    }


    return (
        <>
            <NavBar />
            <main className="bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] flex min-h-screen flex-col items-center justify-between p-24">
                <div className="grid grid-cols">
                    <div className="col-span-8">
                        <FullCalendar
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                            ]}
                            initialView={"timeGridWeek"}
                            headerToolbar={{
                                left: '',
                                center: 'title',
                                right: ''
                            }}
                            firstDay={6}
                            height={"auto"}
                            events={allEvents as EventSourceInput}
                            nowIndicator={true}
                            editable={true}
                            droppable={true}
                            selectable={true}
                            selectMirror={true}

                            slotMinTime={"08:00:00"}
                            slotMaxTime={"32:00:00"}
                            dateClick={handleDateClick}
                            drop={(data) => addEvent(data)}
                            eventClick={(data) => handleDeleteModal(data)}
                        />
                    </div>
                </div>

                <Transition.Root show={showDeleteModal} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"

                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                                    >
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center
                      justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600"
                                                        aria-hidden="true" />
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title as="h3"
                                                        className="text-base font-semibold leading-6 text-gray-900">
                                                        Delete Event
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Are you sure you want to delete this event?
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handleDelete}>
                                                Delete
                                            </button>
                                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={handleCloseModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
                <Transition.Root show={showModal} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setShowModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div
                                className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel
                                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                        <div>
                                            <div
                                                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3"
                                                    className="text-base font-semibold leading-6 text-gray-900">
                                                    Add Event
                                                </Dialog.Title>
                                                <form action="submit" onSubmit={handleSubmit} method="post">
                                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-3 sm:gap-3">
                                                        <button
                                                            name="start"
                                                            value="start"
                                                            type="submit"
                                                            className="inline-flex bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 items-center justify-between w-full p-5 text-white-500 border border-gray-200 rounded-lg cursor-pointer dark:hover:text-black-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-20"
                                                            // disabled={data.isStart}
                                                            onClick={handleButtonClick}>
                                                            Start of Work
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            name="pause"
                                                            value="pause"
                                                            className="inline-flex bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 items-center justify-between w-full p-5 text-white-500 border border-gray-200 rounded-lg cursor-pointer dark:hover:text-black-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-20"
                                                            //disabled={!data.isStart}
                                                            onClick={handleButtonClick}
                                                        >
                                                            Pause
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            name="end"
                                                            value="end"
                                                            className="inline-flex bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 items-center justify-between w-full p-5 text-black-500 border border-gray-200 rounded-lg cursor-pointer dark:hover:text-black-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-20"
                                                            //disabled={data.isEnd || (!data.isEnd && !data.isStart)}
                                                            onClick={handleButtonClick}
                                                        >
                                                            End of Work
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </main>
        </>
    )
}