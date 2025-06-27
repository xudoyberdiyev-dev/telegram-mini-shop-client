import Category from "@/components/category";
import Search from "@/components/search";
import Products from "@/components/products";
import Navbar from "@/components/navbar";

export default function Page() {
    return (
        <div className={'bg-[#FAFAF5] h-[100vh]'}>
            <>
                <Navbar/>
                <Search/>
                <Category/>
                <Products/>
            </>
        </div>
    )
}