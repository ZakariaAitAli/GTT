"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import NavBar from '../components/navBar';

interface Employee {
    id: number;
    ReportDate: String;

}

const History: React.FC = () => {

    const searchParams = useSearchParams();
    //const id = searchParams.get('id');
    const id = sessionStorage.getItem("idEmployee");

    if (id == null) {
        window.location.href = "/login";
    }

    const [data, setData] = useState<{ employees: Employee[] }>({
        employees: [],
    });
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const apiUrl = `http://localhost:8080/GestionTempsTravail-1.0-SNAPSHOT/Servlets.RapportServlet?id=${id}`;

        axios
            .get(apiUrl)
            .then((response) => {
                setData({
                    employees: JSON.parse(response.data.reports),
                });
                console.log(response.data.reports);
            })
            .catch((err) => {
                setError(err);
            });
    }, [id]);

    const handleDownload = (reportId: any) => {

        window.open(`http://localhost:8080/GestionTempsTravail-1.0-SNAPSHOT/Servlets.PdfDownloadServlet?id=` + id, '_blank');


    };

    return (
        <>
            <NavBar />
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <h3 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Liste des rapports
                    </h3>
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
                                        <span className="sr-only">Télécharger</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.employees.map((report) => (
                                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={report.id}>
                                        <td className="px-6 py-4">{report.id}</td>
                                        <td className="px-6 py-4">{report.ReportDate}</td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                onClick={() => handleDownload(report.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Download
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default History;

