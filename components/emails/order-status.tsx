import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
  Img
} from '@react-email/components';

interface OrderStatusEmailProps {
  customerName: string;
  orderId: string;
  status: 'CONFIRMED' | 'SHIPPED' | 'OUT_FOR_DELIVERY';
  total: number;
}

export const OrderStatusEmail = ({
  customerName,
  orderId,
  status,
  total,
}: OrderStatusEmailProps) => {
  const getStatusMessage = () => {
    switch (status) {
      case 'CONFIRMED':
        return "Your order has been received and is being processed. We'll let you know when it ships!";
      case 'SHIPPED':
        return "Great news! Your order has shipped and is on its way to you.";
      case 'OUT_FOR_DELIVERY':
        return "Your order is out for delivery today. Keep an eye out!";
      default:
        return "There's an update on your order.";
    }
  };

  const getStatusHeading = () => {
    switch (status) {
      case 'CONFIRMED': return 'Order Confirmed';
      case 'SHIPPED': return 'Order Shipped';
      case 'OUT_FOR_DELIVERY': return 'Out For Delivery';
      default: return 'Order Update';
    }
  };

  return (
    <Html>
      <Head />
      <Preview>{getStatusHeading()} - MK Creations</Preview>
      <Tailwind>
        <Body className="bg-white font-sans text-gray-900">
          <Container className="mx-auto my-[40px] max-w-[600px] border border-gray-200 p-[20px] rounded-lg">
            <Section className="mt-[20px] text-center">
              <Heading className="text-3xl font-serif text-[#1c1917] mx-0 my-[30px] p-0 text-center">
                MK Creations
              </Heading>
            </Section>
            
            <Section className="mt-[32px]">
              <Heading className="text-[24px] font-normal text-center mx-0 mt-[10px] mb-[20px]">
                {getStatusHeading()}
              </Heading>
              
              <Text className="text-[14px] leading-[24px] text-gray-700">
                Hi {customerName},
              </Text>
              
              <Text className="text-[14px] leading-[24px] text-gray-700">
                {getStatusMessage()}
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Section>
              <Text className="text-[14px] font-semibold text-[#1c1917] mb-[10px]">
                Order Details
              </Text>
              <Text className="text-[14px] leading-[24px] text-gray-500 my-0">
                Order ID: {orderId}
              </Text>
              <Text className="text-[14px] leading-[24px] text-gray-500 my-0">
                Total: ${total.toFixed(2)}
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[12px] leading-[24px] text-[#666666] text-center">
              © {new Date().getFullYear()} MK Creations. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OrderStatusEmail;
