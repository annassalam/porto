import { NextResponse } from "next/server";

const experienceData = [
    {
        icon: "/images/icon/school-pen-icon.svg",
        role: "Android Developer, Native (Kotlin)",
        location: "SD Plus Sunan Ampel, Kediri",
        startYear: "2024",
        endYear: "2025",
        bulletPoints: [
            "Mengembangkan aplikasi mobile android (Buku Pantau) sebagai sistem rekapitulasi data kegiatan siswa",
            "Bertugas sebagai UX designer, Programmer, dan Database Designer",
            "Menggunakan bahasa pemrograman Kotlin Native, Android Studio, dan MySQL untuk membangun aplikasi",
        ]
    },
    {
        icon: "/images/icon/classic-column-icon.svg",
        role: "Web Developer, PHP (Laravel)",
        location: "PT. Lantur Jaya Group, Kediri",
        startYear: "2024",
        endYear: "2025",
        bulletPoints: [
            "Mengembangkan website company profile untuk klien perusahaan kontruksi menggunakan PHP (Laravel) dan MySQL",
            "Bertugas sebagai Backend Developer, dan Database Designer",
            "Menggunakan bahasa pemrograman PHP (Laravel), dan database MySQL",
        ]
    },
]

const educationData = [
    {
        date: "Sep 2022 - Nov 2025",
        title: "D3 Manajemen Informatika",
        subtitle: "PSDKU POLINEMA KOTA KEDIRI — Kediri, Jawa Timur"
    }
];


const projectOverview = {
    caseStudies: [
        { name: "Tugas Akhir", url: "#" },
        { name: "Proyek Pengabdian", url: "#" },
        { name: "Proyek PKL", url: "https://lanturkontraktor.page.gd/" },
    ],
    sideProjects: [
        { name: "Toko Gamis Amiaisye", url: "https://amiaisye.vercel.app/home" },
        { name: "Viralin Mimpi", comingSoon: true },
        { name: "Rekber Anti Ribet", comingSoon: true },
    ]
};


export const GET = async () => {
    return NextResponse.json({
        experienceData,
        educationData,
        projectOverview
    });
};