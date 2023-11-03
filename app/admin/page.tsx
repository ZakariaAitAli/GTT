'use client';

// pages/admin.tsx
import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chart.js/auto';
import 'react-chartjs-2';

Chart.register(...registerables);

const Admin: React.FC = () => {
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
                            data: [10, 20, 30],
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
                            data: [5, 15, 25],
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
    }, []);

    return (
            <section className="bg-white dark:bg-gray-900">
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
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Apple MacBook Pro 17&quot;
                                </th>
                                <td className="px-6 py-4">
                                    Silver
                                </td>
                                <td className="px-6 py-4">
                                    Laptop
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Rapport</a>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Microsoft Surface Pro
                                </th>
                                <td className="px-6 py-4">
                                    White
                                </td>
                                <td className="px-6 py-4">
                                    Laptop PC
                                </td>
                                
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Rapport</a>
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Magic Mouse 2
                                </th>
                                <td className="px-6 py-4">
                                    Black
                                </td>
                                <td className="px-6 py-4">
                                    Accessories
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Rapport</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
    );
};


export default Admin;
