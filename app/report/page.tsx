'use client'

import React from "react";

export  default function ReportPage() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
            <h3 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Liste des rapports</h3>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Numéro du rapport
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date de génération
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Heures de travail
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Télécharger</span>
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
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Télécharger</a>
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
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Télécharger</a>
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
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Télécharger</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </section>
    );
}