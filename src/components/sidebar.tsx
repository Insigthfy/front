import { Database, LineChart, List } from "lucide-react";
import Link from "next/link";

function Sidebar() {
    const tab = [
        {
            title: "Banco de dados",
            path: "database",
            icon: <Database size={25} />,
        },
        {
            title: "Dashboard",
            path: "dashboard",
            icon: <LineChart size={25} />,
        },
        {
            title: "Formulários",
            path: "forms",
            icon: <List size={25} />,
        },
    ];

    return (
        <aside className="w-[325px] h-screen shadow">

            {tab.map((item) => (
                <Link key={item.path} href={`/home?tab=${item.path}`}>
                    <div className="h-[70px] flex items-center gap-4 p-4 cursor-pointer border-b">
                        <span className="ml-4 flex justify-center items-center text-insightfy-blue">
                            {item.icon}
                        </span>
                        <p>{item.title}</p>
                    </div>
                </Link>
            ))}
    
        </aside>
    );
}

export default Sidebar;