import {Column, Row, Text, Section, Img, Button} from '@react-email/components'
import React from 'react'

type OIEmailProps = {
    order: { id: string, createdAt: string, price: number }
    product: { imagePath: string }
    downloadId: string
}
export default function OrderInformations({order, product, downloadId}: OIEmailProps) {
    return (
        <>
            <Section>
                <Row>
                    <Column>
                        <Text className={'text-gray-500 whitespace-nowrap text-nowrap mr-4 mb-0'}>
                            Order ID: {order?.id}
                        </Text>
                    </Column>
                    <Column>
                        <Text className={'text-gray-500 whitespace-nowrap text-nowrap mr-4 mb-0'}>
                            Date: {order?.createdAt}
                            {/*    format date */}
                        </Text>
                    </Column>
                    <Column>
                        <Text className={'text-gray-500 whitespace-nowrap text-nowrap mr-4 mb-0'}>
                            Price: {order?.price}
                        </Text>
                    </Column>
                </Row>
            </Section>
            <Section className={'border border-solid'}>
                <Img src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product?.imagePath}`}/>
                <Button href={`${process.env.NEXT_PUBLIC_SERVER_URL}/download/${downloadId ?? ""}`}>
                    Download
                </Button>
            </Section>
        {/*    MORE INFO */}
        </>
    )
}

