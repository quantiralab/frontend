import { useMemo, useState, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// removed unused wouter import — routing is handled by react-router in the app
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard, Lock, CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    description: "Perfect for exploring the platform",
    features: [
      "5 knowledge maps",
      "Basic AI mapping",
      "Export as image",
      "Community support",
    ],
    highlighted: false,
    icon: "/images/price icons.webp",
  },
  {
    name: "Pro",
    monthly: 19,
    annual: 15,
    description: "For professionals and growing teams",
    features: [
      "Unlimited maps",
      "Advanced AI analysis",
      "Real-time collaboration",
      "Priority support",
      "Custom themes",
      "API access",
    ],
    highlighted: true,
    icon: "/images/price icons (2).webp",
  },
  {
    name: "Enterprise",
    monthly: 99,
    annual: 79,
    description: "For organizations at scale",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
    ],
    highlighted: false,
    icon: "/images/price icons (3).webp",
  },
];

const elementStyle = {
  base: {
    fontSize: "16px",
    color: "#fff",
    fontFamily: "inherit",
    "::placeholder": {
      color: "rgba(255,255,255,0.6)",
    },
  },
  invalid: {
    color: "#ffb3b3",
    iconColor: "#ffb3b3",
  },
};

function CheckoutForm({ plan, billing }: { plan: string; billing: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) return;

    setIsProcessing(true);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumber,
      billing_details: {
        name: name || "Customer",
        email: email || undefined,
      },
    });

    setIsProcessing(false);

    if (error) {
      console.error(error);
      alert(error.message || "Payment could not be processed.");
      return;
    }

    setIsComplete(true);
  };
  
  const planData = plans.find((p) => p.name.toLowerCase() === plan.toLowerCase());
  const price = planData ? (billing === "annual" ? planData.annual : planData.monthly) : undefined;
  
  if (isComplete) {
    return (
      <div className='text-center py-8'>
        <CheckCircle2 className='w-16 h-16 mx-auto mb-4' style={{ color: "hsl(150, 55%, 45%)" }} />
        <h2 className='text-2xl font-bold mb-2' style={{ color: "hsl(36,30%,92%)" }}>
          Payment Successful!
        </h2>
        <p className='text-sm mb-4' style={{ color: "hsl(220,15%,68%)" }}>
          Thank you for subscribing to the{" "}
          {plan} plan.
        </p>
        <p className='text-xs' style={{ color: "hsl(220,15%,55%)" }}>
          A confirmation email will be sent shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      {/* Order Summary */}
      <div className='rounded-xl border p-4' style={{
        border: "1px solid rgba(10,186,181,0.25)",
        background: "rgba(10,186,181,0.08)",
      }}>
        <div className='flex items-center justify-between mb-3'>
          <div>
            <h3 className='text-lg font-semibold' style={{ color: "hsl(36,30%,92%)" }}>
              {plan } Plan
            </h3>
            <p className='text-xs' style={{ color: "hsl(220,15%,55%)" }}>
              {billing === "monthly" ? "Billed monthly" : "Billed annually"}
            </p>
          </div>
          {price != null && (
            <div className='text-right'>
                  <span className='text-2xl font-bold' style={{ color: "#0ABAB5" }}>
                    ${price}
                  </span>
              <span className='text-sm ml-1' style={{ color: "hsl(220,15%,55%)" }}>
                /{billing === "monthly" ? "mo" : "yr"}
              </span>
            </div>
          )}
        </div>
        <div className='border-t pt-3 flex justify-between text-sm' style={{ borderColor: "hsla(218,75%,50%,0.2)" }}>
          <span style={{ color: "hsl(220,15%,55%)" }}>Total due today</span>
          <span className='font-semibold' style={{ color: "hsl(36,30%,92%)" }}>
            ${price ?? "Custom"}
          </span>
        </div>
      </div>

      {/* Contact Information */}
      <div className='space-y-3'>
        <h4 className='text-sm font-medium flex items-center gap-2' style={{ color: "hsl(36,30%,92%)" }}>
          Contact Information
        </h4>
        <div className='grid gap-3'>
          <div>
            <Label htmlFor='name' style={{ color: "hsl(220,15%,55%)" }} className='text-xs'>
              Full Name
            </Label>
            <Input
              id='name'
              type='text'
              placeholder=''
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 focus:border-primary placeholder:text-muted-foreground'
              style={{
                background: "hsla(218,75%,50%,0.08)",
                border: "1px solid hsla(218,75%,50%,0.25)",
                color: "hsl(36,30%,92%)",
              }}
            />
          </div>
          <div>
            <Label htmlFor='email' style={{ color: "hsl(220,15%,55%)" }} className='text-xs'>
              Email Address
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='john@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 focus:border-primary placeholder:text-muted-foreground'
              style={{
                background: "hsla(218,75%,50%,0.08)",
                border: "1px solid hsla(218,75%,50%,0.25)",
                color: "hsl(36,30%,92%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className='space-y-3'>
        <h4 className='text-sm font-medium flex items-center gap-2' style={{ color: "hsl(36,30%,92%)" }}>
          <CreditCard className='w-4 h-4' />
          Payment Details
        </h4>

        <div>
          <Label style={{ color: "hsl(220,15%,55%)" }} className='text-xs'>
            Card Number
          </Label>
          <div className='mt-1 rounded-md border px-3 py-2.5' style={{
            border: "1px solid hsla(218,75%,50%,0.25)",
            background: "hsla(218,75%,50%,0.08)",
          }}>
            <CardNumberElement
              options={{ style: elementStyle, showIcon: true }}
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <div>
            <Label style={{ color: "hsl(220,15%,55%)" }} className='text-xs'>
              Expiry Date
            </Label>
            <div className='mt-1 rounded-md border px-3 py-2.5' style={{
              border: "1px solid hsla(218,75%,50%,0.25)",
              background: "hsla(218,75%,50%,0.08)",
            }}>
              <CardExpiryElement options={{ style: elementStyle }} />
            </div>
          </div>
          <div>
            <Label style={{ color: "hsl(220,15%,55%)" }} className='text-xs'>
              CVC
            </Label>
            <div className='mt-1 rounded-md border px-3 py-2.5' style={{
              border: "1px solid hsla(218,75%,50%,0.25)",
              background: "hsla(218,75%,50%,0.08)",
            }}>
              <CardCvcElement options={{ style: elementStyle }} />
            </div>
          </div>
        </div>
      </div>

      <Button type='submit' className='w-full h-11 text-base font-medium' style={{
        background: "linear-gradient(135deg, #0ABAB5, #56DFCF)",
        color: "#fff",
      }} disabled={!stripe || isProcessing}>
        {isProcessing ? (
          <span className='flex items-center gap-2'>
            <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
            Processing...
          </span>
        ) : (
          <span className='flex items-center gap-2'>
            <Lock className='w-4 h-4' />
            Pay ${price ?? "—"}
          </span>
        )}
      </Button>

      <p className='text-xs text-center' style={{ color: "hsl(220,15%,55%)" }}>
        <Lock className='w-3 h-3 inline mr-1' />
        Secured by Stripe. Your payment info is encrypted.
      </p>
    </form>
  );
}

export default function CheckoutSandbox() {
  // routing handled via react-router; no local useLocation needed here

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: "auto" });
    } catch (e) {
      // ignore in test environments
    }
  }, []);

  const params = new URLSearchParams(window.location.search);
  const plan = params.get("plan") || "Pro";
  const billing = params.get("billing") || "monthly";

  const stripePromise = useMemo(() => {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as
      | string
      | undefined;
    if (!key) {
      console.warn(
        "VITE_STRIPE_PUBLISHABLE_KEY is not set. Stripe Elements will not load."
      );
      return null;
    }
    return loadStripe(key);
  }, []);

  return (
    <div
      className='min-h-screen flex flex-col'
      style={{
        backgroundImage: "url('/images/Desktop%20-%2018%20(2).svg')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        background: "linear-gradient(135deg, hsl(222,40%,18%), hsl(220,38%,14%))",
      }}
    >
      <main className='flex-1 flex items-center justify-center px-4 py-16'>
        <Card className='w-full max-w-md shadow-2xl p-8' style={{
          background: "linear-gradient(160deg, hsl(222,40%,18%) 0%, hsl(220,38%,14%) 100%)",
          border: "1px solid hsla(218,75%,50%,0.25)",
          borderRadius: "20px",
        }}>
          <div className='flex items-center gap-2 mb-6'>
            <CreditCard className='w-6 h-6' style={{ color: "hsl(218,75%,65%)" }} />
            <h1 className='text-2xl font-bold' style={{ color: "hsl(36,30%,92%)" }}>
              Complete Your Purchase
            </h1>
          </div>

          {stripePromise ? (
            <Elements stripe={stripePromise} >
              <CheckoutForm plan={plan} billing={billing} />
            </Elements>
          ) : (
            <CheckoutFormFallback plan={plan} billing={billing} />
          )}

          <div className='mt-6 pt-5' style={{ borderTop: "1px solid hsla(220,20%,40%,0.5)" }}>
            <a href="/"><Button
              className='w-full'
              variant='ghost'
              style={{ color: "hsl(220,15%,55%)" }}
            >
              ← Back to Home
            </Button>
            </a>
          </div>
        </Card>
      </main>
    </div>
  );
}

function CheckoutFormFallback({ plan, billing }: { plan: string; billing: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const planData = plans.find((p) => p.name.toLowerCase() === plan.toLowerCase());
  const price = planData ? (billing === "annual" ? planData.annual : planData.monthly) : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // simulate network/payment delay
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div className='text-center py-8'>
        <CheckCircle2 className='w-16 h-16 mx-auto mb-4' style={{ color: "#0ABAB5" }} />
        <h2 className='text-2xl font-bold mb-2' style={{ color: "hsl(36,30%,92%)" }}>
          Payment Successful!
        </h2>
        <p className='text-sm mb-4' style={{ color: "hsl(220,15%,68%)" }}>
          Thank you for subscribing to the {plan} plan.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div className='rounded-xl border p-4' style={{
        border: "1px solid hsla(218,75%,50%,0.25)",
        background: "hsla(218,75%,50%,0.08)",
      }}>
        <div className='flex items-center justify-between mb-3'>
          <div>
            <h3 className='text-lg font-semibold' style={{ color: "hsl(36,30%,92%)" }}>
              {plan} Plan
            </h3>
            <p className='text-xs' style={{ color: "hsl(220,15%,55%)" }}>
              {billing === "monthly" ? "Billed monthly" : "Billed annually"}
            </p>
          </div>
          {price != null && (
            <div className='text-right'>
              <span className='text-2xl font-bold' style={{ color: "hsl(218,75%,65%)" }}>
                ${price}
              </span>
              <span className='text-sm ml-1' style={{ color: "hsl(220,15%,55%)" }}>
                /{billing === "monthly" ? "mo" : "yr"}
              </span>
            </div>
          )}
        </div>
        <div className='border-t pt-3 flex justify-between text-sm' style={{ borderColor: "hsla(218,75%,50%,0.2)" }}>
          <span style={{ color: "hsl(220,15%,55%)" }}>Total due today</span>
          <span className='font-semibold' style={{ color: "hsl(36,30%,92%)" }}>
            ${price ?? "Custom"}
          </span>
        </div>
      </div>

      <div className='space-y-3'>
        <h4 className='text-sm font-medium flex items-center gap-2' style={{ color: "hsl(36,30%,92%)" }}>
          Contact Information
        </h4>
        <div className='grid gap-3'>
          <div>
            <Label htmlFor='fb-name' style={{ color: "hsl(220,15%,55%)" }} className='text-xs'>
              Full Name
            </Label>
            <Input id='fb-name' type='text'  value={name} onChange={(e) => setName(e.target.value)} className='mt-1 placeholder:text-muted-foreground' style={{
              background: "hsla(218,75%,50%,0.08)",
              border: "1px solid hsla(218,75%,50%,0.25)",
              color: "hsl(36,30%,92%)",
            }} />
          </div>
          <div>
            <Label htmlFor='fb-email' style={{ color: "hsl(220,15%,55%)" }} className='text-xs'>
              Email Address
            </Label>
            <Input id='fb-email' type='email' placeholder='john@example.com' value={email} onChange={(e) => setEmail(e.target.value)} className='mt-1 placeholder:text-muted-foreground' style={{
              background: "hsla(218,75%,50%,0.08)",
              border: "1px solid hsla(218,75%,50%,0.25)",
              color: "hsl(36,30%,92%)",
            }} />
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <h4 className='text-sm font-medium flex items-center gap-2' style={{ color: "hsl(36,30%,92%)" }}>
          <CreditCard className='w-4 h-4' />
          Payment (Test Mode)
        </h4>

        <div>
          <Label style={{ color: "hsl(220,15%,55%)" }} className='text-xs'>
            Card Number
          </Label>
          <Input
            placeholder='4242 4242 4242 4242'
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className='mt-1 placeholder:text-muted-foreground'
            style={{
              background: "hsla(218,75%,50%,0.08)",
              border: "1px solid hsla(218,75%,50%,0.25)",
              color: "hsl(36,30%,92%)",
            }}
          />
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <div>
            <Label style={{ color: "hsl(220,15%,55%)" }} className='text-xs'>
              Expiry Date
            </Label>
            <Input
              placeholder='MM / YY'
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
              className='mt-1 placeholder:text-muted-foreground'
              style={{
                background: "hsla(218,75%,50%,0.08)",
                border: "1px solid hsla(218,75%,50%,0.25)",
                color: "hsl(36,30%,92%)",
              }}
            />
          </div>
          <div>
            <Label style={{ color: "hsl(220,15%,55%)" }} className='text-xs'>
              CVC
            </Label>
            <Input
              placeholder='123'
              value={cardCvc}
              onChange={(e) => setCardCvc(e.target.value)}
              className='mt-1 placeholder:text-muted-foreground'
              style={{
                background: "hsla(218,75%,50%,0.08)",
                border: "1px solid hsla(218,75%,50%,0.25)",
                color: "hsl(36,30%,92%)",
              }}
            />
          </div>
        </div>

        <div className='text-sm' style={{ color: "hsl(220,15%,55%)" }}>
          <p className='mt-2'>This is a non-secure, local test input only — it does not process real payments.</p>
        </div>
      </div>

      <Button type='submit' className='w-full h-11 text-base font-medium' style={{
        background: "linear-gradient(135deg, #0ABAB5, #56DFCF)",
        color: "#fff",
      }} disabled={isProcessing}>
        {isProcessing ? (
          <span className='flex items-center gap-2'>
            <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
            Processing...
          </span>
        ) : (
          <span className='flex items-center gap-2'>
            <Lock className='w-4 h-4' />
            Pay ${price ?? "—"}
          </span>
        )}
      </Button>

      <p className='text-xs text-center' style={{ color: "hsl(220,15%,55%)" }}>
        <Lock className='w-3 h-3 inline mr-1' />
        Secured by Stripe (test mode).
      </p>
    </form>
  );
}
