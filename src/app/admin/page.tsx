import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {string} from "postcss-selector-parser";

export default function AdminDashboard() {
    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
            <DashboardCard title={"Sales"} subtitle={"some description "} content={'some description'}/>
        </div>
    );
};

type DashboardCardProps = {
    title: string
    subtitle: string
    content: string
}

export function DashboardCard({title, subtitle, content}: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
        </Card>
    )
}