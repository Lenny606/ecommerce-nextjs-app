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

    const [userCount, order] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: {
                price: true
            },
        })
    ])

    return {
        amountAvgPerUser: userCount === 0 ? 0 : (order._sum.price || 0) / userCount / 100,
        numberOfCustomers: userCount
    }
}
async function getProductData() {

    const [available, notAvailable] = await Promise.all([
        db.product.count({
            where: {
                isAvailable: true
            }
        }),
        db.product.count({
            where: {
                isAvailable: false
            }
        }),
    ])

    return {
        available,
        notAvailable
    }
}


export default async function AdminDashboard() {

    const [data, userData, productData] = await Promise.all([
        getOrderData(),
        getUserData(),
        getProductData()
    ])

    return (

        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
            <DashboardCard title={"Sales"} subtitle={data.numberOfSales} content={data.amount}/>
            <DashboardCard title={"Customer"} subtitle={userData.numberOfCustomers} content={userData.numberOfCustomers}/>
            <DashboardCard title={"Active Products"} subtitle={`${productData.available} Available`} content={`${productData.notAvailable} Not Available`}/>
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