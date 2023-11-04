'use client'

import { Card, CardBody, CardFooter } from "@nextui-org/card";
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




export default function MoodPage() {


    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [pause, setBreak] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();
    const [data, setData] = useState({ isSubmit: false, isHours: false });
    const [loading, setLoading] = useState(true);
    const [idEmployee, setIdEmployee] = useState("");
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [selectedMood, setMood] = useState("");


    useEffect(() => {


        const apiUrl = "http://localhost:8080/GestionTempsTravail_war_exploded/Servlets.Mood?id=" + id;

        axios
            .get(apiUrl)
            .then((response) => {
                setData(response.data);
                console.log(response.data.isSubmit);
                console.log(response.data.isHours);

            })
            .catch((err) => {
                setError(err);

            });
    }, []);




    const handleSubmit = () => {
        if (selectedMood) {
            console.log(id);
            axios
                .post('http://localhost:8080/GestionTempsTravail_war_exploded/Servlets.Mood',
                    `id=${id}&humeur=${selectedMood}`)
                .then((response) => {
                    if (response.status == 200) {
                        console.log("reussit");
                    }
                })
                .catch((err) => {
                    // Handle error
                });
        }
    };










    return (
        <div className="bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
            <div className='flex flex-col items-center justify-center pt-10'>
                <h1 className='text-6xl font-bold'>Humeur</h1>
                <h4 className='text-2xl pt-10 font-bold'>Alors, comment vous sentez-vous aujourd&apos;hui?</h4>
            </div>
            <form onSubmit={handleSubmit} method="post" >
                <section className='py-36'>
                    <div className='container flex items-center justify-center'>

                        <Card className='py-4 lg:w-3/4 xl:w-1/2'>
                            <CardBody className='overflow-visible py-2'>

                                {data.isSubmit ? (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-9 rounded relative" role="alert">
                                        <strong className="font-bold">Error! </strong>
                                        <span className="block sm:inline">Vous avez déjà soumis le formulaire.</span>
                                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                        </span>
                                    </div>
                                ) : data.isHours ? (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-9 rounded relative" role="alert">
                                        <strong className="font-bold">Error! </strong>
                                        <span className="block sm:inline">La limite de temps est écoulée.</span>
                                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                        </span>
                                    </div>
                                ) : null}

                                <div className='flex gap-6'>
                                    <ul className="grid w-full gap-6 md:grid-cols-3">
                                        <li>
                                            <input type="radio" id="happy" name="mood" value="1" className="hidden peer" onChange={(e) => setMood(e.target.value)} required />
                                            <label htmlFor="happy" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">Heureux</div>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                                </svg>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="radio" id="neutral" name="mood" value="2" className="hidden peer" onChange={(e) => setMood(e.target.value)} />
                                            <label htmlFor="neutral" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover-bg-gray-700">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">Neutre</div>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 37 37" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path d="M10.75 13a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM22 12.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-6 19.11C7.53 31.36.64 24.47.64 16S7.53.64 16 .64 31.36 7.53 31.36 16 24.47 31.36 16 31.36zm0-30C7.927 1.36 1.36 7.927 1.36 16c0 8.072 6.567 14.64 14.64 14.64 8.072 0 14.64-6.567 14.64-14.64S24.072 1.36 16 1.36zm6 20H10v-.72h12v.72z" />
                                                </svg>
                                            </label>
                                        </li>
                                        <li>
                                            <input type="radio" id="sad" name="mood" value="3" className="hidden peer" onChange={(e) => setMood(e.target.value)} />
                                            <label htmlFor="sad" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover-bg-gray-700">
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">Triste</div>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                                </svg>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </CardBody>
                            <CardFooter className='flex justify-center'>
                                <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover-bg-gradient-to-br focus-ring-4 focus-outline-none focus-ring-blue-300 dark:focus-ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                    Envoyer
                                </button>
                            </CardFooter>

                        </Card>
                    </div>
                </section>
            </form>
        </div>
    );
}