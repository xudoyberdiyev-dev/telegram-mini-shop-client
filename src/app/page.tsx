import Category from "@/components/category";
import Search from "@/components/search";

export default function Page() {
    return (
        <div className={'bg-[#FAFAF5]'}>
            <>
                <Search/>
                <Category/>
            </>
        </div>
    )
}