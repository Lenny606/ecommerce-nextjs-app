import {Body, Container, Head, Heading, Html, Preview, Tailwind} from "@react-email/components";
import OrderInformations from "@/email/_components/OrderInformations";

type PuchaseReceiptEmailProps =
    {
        product: {
            name: string
        }
    }


export default function PurchaseReceipt({product}: PuchaseReceiptEmailProps) {
    return (
        <Html>
            <Preview> Download {product.name}</Preview>
            {/*Declaration to use tailwind as styles - needs custom config */}
            <Tailwind>
                <Head></Head>
                <Body className={"bg-white font-sans"}>
                    <Container>
                        <Heading> Purchase receipt</Heading>
                        <OrderInformations/>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}