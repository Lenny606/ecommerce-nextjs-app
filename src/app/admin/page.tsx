import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {string} from "postcss-selector-parser";
import db from "@/db/db";

async function getSalesData() {

    const data = await db.order.aggregate({
        _sum: {
            price: true
        },
        _count: true
    })

    return {
        amount: data._sum.price || 0,
        numberOfSales: data._count
    }
}


export default async function AdminDashboard() {

    const data = await getSalesData()

    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
            <DashboardCard title={"Sales"} subtitle={data.numberOfSales} content={data.amount}/>
        </div>
    );
};

type DashboardCardProps = {
    title: string
    subtitle: string | number
    content: string | number
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