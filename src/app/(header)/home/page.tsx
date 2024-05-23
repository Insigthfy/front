import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";

interface HomePageProps {
    searchParams?: { [key: string]: string | string[] | undefined }
}

function HomePage({ searchParams }: HomePageProps) {
    const tab = searchParams?.tab;

    if(!tab) {
        redirect("/home?tab=database");
    }

    return (
        <div className="flex">
            <Sidebar />
            <h1>{tab}</h1>
        </div>
    );
}

export default HomePage;