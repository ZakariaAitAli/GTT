'use client';

import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import Link from 'next/link'

Chart.register(...registerables);

const Admin: React.FC = () => {
    const [data, setData] = useState({
        bonneCount: 0,
        mauvaiseCount: 0,
        stableCount: 0,
        matinaleCount: 0,
        apresMidiCount: 0,
        dejeunerCount: 0,
        employees: []
    });

    const [error, setError] = useState(false);

    useEffect(() => {
        const apiUrl = "http://localhost:8080/GestionTempsTravail_war_exploded/Servlets.EmployeeServlet";

        axios.get(apiUrl)
            .then((response) => {
                setData({
                    bonneCount: response.data.bonneCount,
                    mauvaiseCount: response.data.mauvaiseCount,
                    stableCount: response.data.stableCount,
                    matinaleCount: response.data.matinaleCount,
                    apresMidiCount: response.data.apresMidiCount,
                    dejeunerCount: response.data.dejeunerCount,
                    employees: JSON.parse(response.data.employees)
                });
            })
            .catch((err) => {
                setError(err);
            });
    }, []);

    useEffect(() => {
        const pauseChartCanvas = document.getElementById('pauseChart') as HTMLCanvasElement;
        const moodChartCanvas = document.getElementById('moodChart') as HTMLCanvasElement;

        if (pauseChartCanvas && moodChartCanvas) {
            const pauseChart = new Chart(pauseChartCanvas, {
                type: 'bar',
                data: {
                    labels: ['Matinale', 'Après midi', 'Déjeuner'],
                    datasets: [
                        {
                            label: 'Graphique de pause',
                            data: [data.matinaleCount, data.apresMidiCount, data.dejeunerCount],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            const moodChart = new Chart(moodChartCanvas, {
                type: 'bar',
                data: {
                    labels: ['Bonne', 'Mauvaise', 'Stable'],
                    datasets: [
                        {
                            label: 'Graphique d\'humeur',
                            data: [data.bonneCount, data.mauvaiseCount, data.stableCount],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            return () => {
                pauseChart.destroy();
                moodChart.destroy();
            };
        }
    }, [data]);

    return (
        <section className="bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Dashboard</h2>
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                    <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <canvas id="pauseChart" width="auto" height="200"></canvas>
                    </div>
                    <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <canvas id="moodChart" width="auto" height="200"></canvas>
                    </div>
                </div>
                <h3 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Liste des employées</h3>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nom
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Prénom
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Rapport</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(data.employees) &&
                                data.employees.map((employee: string, index) => {
                                    const employeeParts: string[] = employee.split('/');

                                    return (
                                        <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{employeeParts[1]}</th> {/* Display Nom here */}
                                            <td className="px-6 py-4">{employeeParts[1]}</td> {/* Display Prénom here */}
                                            <td className="px-6 py-4">{employeeParts[0]}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/report?id=${employeeParts[2]}&fullName=${employeeParts[1]}`} passHref>
                                                    <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                        Weekly Reports
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section >
    );
};

export default Admin;
