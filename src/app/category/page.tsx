
export default function Page() {
    return(
        <div className={'w-full h-[100vh] py-3 p-2'}>
            <div className="w-full h-14 rounded-xl shadow-md flex items-center justify-center bg-white">
                <h1 className="text-3xl font-semibold text-yellow-600 text-center">
                    Bo'limlar
                </h1>
            </div>
            <div className="grid mt-5 grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-md p-1 pb-1 flex flex-col items-center">
                    {/* Rasm */}
                    <img
                        className="w-full bg-red-300 h-32 object-cover rounded-lg"
                    />

                    {/* Nomi */}
                    <h2 className="text-lg font-semibold text-yellow-900 mt-1 text-center">
                        salom
                    </h2>

                    {/* Tugmalar */}
                    <div className="flex gap-2 mt-2">
                        <button
                            className="px-3 py-1.5 text-sm font-semibold  shadow-md shadow-black-200 text-yellow-900 rounded hover:bg-yellow-500-600"
                        >
                            Tahrirlash
                        </button>
                        <button
                            className="px-3 py-1.5 text-sm font-semibold  shadow-md shadow-black-200 text-yellow-900 rounded hover:bg-yellow-500-600"
                        >
                            O‘chirish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}