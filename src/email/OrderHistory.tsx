import {Body, Container, Head, Heading, Html, Preview, Tailwind} from "@react-email/components";
import OrderInformations from "@/email/_components/OrderInformations";

type OrderHistoryProps = {
    orders: {
        id: string, price: number, createdAt: string
    },
    product: {
        name: string, imagePath: string, description: string
    },
    downloadId: string
}[]

// PuchaseReceiptEmailProps.PreviewProps = {
//     product: {
//         name: "Sample Product"
//     },
//     order: {
//         id: crypto.randomUUID(),
//         createdAt: new Date(),
//         price: 100
//     },
// downloadId: {
// id: crypto.randomUUID(),
// } satisfies PuchaseReceiptEmailProps

export default function OrderHistory({orders}: OrderHistoryProps) {
    return (
        <Html>
            <Preview> History </Preview>
            {/*Declaration to use tailwind as styles - needs custom config */}
            <Tailwind>
                <Head></Head>
                <Body className={"bg-white font-sans"}>
                    <Container>
                        <Heading> Purchase History</Heading>
                        {
                            orders.map((order) => (
                                <OrderInformations key={order.id} order={order} product={order.product} downloadId={order.downloadId}/>
                            ))
                        }
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}