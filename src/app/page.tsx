import Category from "@/components/category";
import Search from "@/components/search";
import Products from "@/components/products";

export default function Page() {
    return (
        <div className={'bg-[#FAFAF5]'}>
            <>
                <Search/>
                <Category/>
                <Products/>
            </>
        </div>
    )
}