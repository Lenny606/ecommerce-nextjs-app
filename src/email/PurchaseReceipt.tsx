import {Body, Container, Head, Heading, Html, Preview, Tailwind} from "@react-email/components";
import OrderInformations from "@/email/_components/OrderInformations";

type PuchaseReceiptEmailProps = {
    product: {
        name: string
    },
    order: { id: string, createdAt: Date, price: number },
    downloadId: string

}

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

export default function PurchaseReceipt({product, order, downloadId}: PuchaseReceiptEmailProps) {
    return (
        <Html>
            <Preview> Download {product?.name ?? "name"}</Preview>
            {/*Declaration to use tailwind as styles - needs custom config */}
            <Tailwind>
                <Head></Head>
                <Body className={"bg-white font-sans"}>
                    <Container>
                        <Heading> Purchase receipt</Heading>
                        <OrderInformations order={order} product={product} downloadId={downloadId}/>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}