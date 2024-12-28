import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import db from "@/db/db";

async function getOrderData() {

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
async function getUserData() {

    const [user, order] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: {
                price: true
            },
        })
    ])

    return {
        amountAvgPerUser: user._count === 0 ? 0 : (order._sum.price || 0) / user._count / 100,
        numberOfCustomers: user._count
    }
}


export default async function AdminDashboard() {

    const [data, userData] = await Promise.all([
        getOrderData(),
        getUserData()
    ])

    return (

        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
            <DashboardCard title={"Sales"} subtitle={data.numberOfSales} content={data.amount}/>
            <DashboardCard title={"Customer"} subtitle={userData.numberOfCustomers} content={userData.amountAvgPerUser}/>
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