"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type PaymentWidgetProps = {
  amount: number;
  description: string;
  email: string;
  invoiceId: string;
  accountId?: string;
  onSuccess: (result: any) => void;
  onFail?: (result: any) => void;
  onDestroy?: () => void;
  publicId?: string;
  currency?: string;
  language?: string;
  applePaySupport?: boolean;
  googlePaySupport?: boolean;
  yandexPaySupport?: boolean;
  tinkoffPaySupport?: boolean;
  sbpSupport?: boolean;
  primaryButtonColor?: string;
};

export default function PaymentWidget({
  amount,
  description,
  email,
  invoiceId,
  accountId = "",
  onSuccess,
  onFail,
  onDestroy,
  publicId = "test_api_00000000000000000000002",
  currency = "RUB",
  language = "ru-RU",
  applePaySupport = true,
  googlePaySupport = true,
  yandexPaySupport = true,
  tinkoffPaySupport = true,
  sbpSupport = true,
  primaryButtonColor = "#f6339a",
}: PaymentWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksAppRef = useRef<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).cp) {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current) return;

    const cp = (window as any).cp;
    if (!cp) {
      console.warn("CloudPayments script not loaded");
      return;
    }

    const blocksApp = new cp.PaymentBlocks(
      {
        publicId,
        description,
        amount,
        currency,
        invoiceId,
        accountId,
        email,
        requireEmail: false,
        language,
        applePaySupport,
        googlePaySupport,
        yandexPaySupport,
        tinkoffPaySupport,
        sbpSupport,
      },
      {
        appearance: {
          colors: {
            primaryButtonColor,
            primaryButtonTextColor: "#ffffff",
            primaryHoverButtonColor: "#e23290",
            primaryButtonHoverTextColor: "#ffffff",
            activeInputColor: "#0b1e46",
            inputBackground: "#ffffff",
            inputColor: "#8c949f",
            inputBorderColor: "#e2e8ef",
            errorColor: "#eb5757",
          },
          borders: {
            radius: "8px",
          },
        },
        components: {
          paymentButton: {
            text: "Оплатить",
            fontSize: "16px",
          },
          paymentForm: {
            labelFontSize: "16px",
            activeLabelFontSize: "12px",
            fontSize: "16px",
          },
        },
      }
    );

    blocksAppRef.current = blocksApp;
    blocksApp.mount(containerRef.current);

    blocksApp.on("success", (result: any) => {
      console.log("Payment success", result);
      onSuccess(result);
    });

    blocksApp.on("fail", (result: any) => {
      console.log("Payment fail", result);
      if (onFail) onFail(result);
    });

    blocksApp.on("destroy", () => {
      console.log("Payment widget destroyed");
      if (onDestroy) onDestroy();
    });

    return () => {
      if (blocksAppRef.current) {
        blocksAppRef.current.unmount();
        blocksAppRef.current = null;
      }
    };
  }, [
    scriptLoaded,
    publicId,
    description,
    amount,
    currency,
    invoiceId,
    accountId,
    email,
    language,
    applePaySupport,
    googlePaySupport,
    yandexPaySupport,
    tinkoffPaySupport,
    sbpSupport,
    primaryButtonColor,
    onSuccess,
    onFail,
    onDestroy,
  ]);

  return (
    <>
      <Script
        src="https://widget.cloudpayments.ru/bundles/paymentblocks.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("PaymentBlocks script loaded");
          setScriptLoaded(true);
        }}
        onError={(e) => {
          console.error("Failed to load PaymentBlocks script", e);
        }}
      />
      <div
        ref={containerRef}
        id="payment-element"
        className="w-full min-h-[300px]"
      />
    </>
  );
}