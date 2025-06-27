import Image from "next/image";
import Pagination from "@/components/pagination";

export default function Page() {
    return (
        <div className="relative w-full min-h-screen bg-gray-100 p-3">
            {/* Header */}
            <div className="w-full h-14 px-4 rounded-xl shadow-md flex items-center justify-between bg-white">
                <h1 className="text-3xl font-semibold text-yellow-600 text-center">
                    Maxsulotlar
                </h1>
                <button
                    className="bg-white border border-yellow-800 rounded px-3 py-2"
                >
                    <p className="text-md text-yellow-700 font-semibold">Qo‘shish</p>
                </button>
            </div>
            <div className="mt-6 mb-3 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                    <tr className="bg-yellow-100 text-left text-gray-700 text-sm font-semibold">
                        <th className="p-3 border-b">#</th>
                        <th className="p-3 border-b">Rasm</th>
                        <th className="p-3 border-b">Mahsulot nomi</th>
                        <th className="p-3 border-b">Kategoriya</th>
                        <th className="p-3 border-b text-center">Amallar</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr
                            className="hover:bg-yellow-50 transition text-sm text-gray-800"
                        >
                            <td className="p-3 border-b">1</td>
                            <td className="p-3 border-b">
                                <div className="w-16 h-12 rounded overflow-hidden border">
                                    <Image
                                        src={''}
                                        alt={''}
                                        width={64}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </td>
                            <td className="p-3 border-b">sas</td>
                            <td className="p-3 border-b">sas</td>
                            <td className="p-3 border-b">
                                <div className="flex gap-2 justify-center">
                                    <button
                                        className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition"
                                    >
                                        Tahrirlash
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                                    >
                                        O‘chirish
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <Pagination/>
            </div>
        </div>
    )
}