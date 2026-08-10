import { useState } from "react";

function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-[#f7f7f7]">
            <div className="mx-auto max-w-[1532px] p-3 sm:p-4">

                {/* HERO */}
                <section
                    className="
                        relative
                        min-h-[610px]
                        overflow-hidden
                        rounded-[32px]
                        border
                        border-[#ddd6c8]
                        bg-[#f1ede4]
                        px-6
                        py-8
                        text-[#070b14]
                        sm:px-10
                        sm:py-10
                        lg:px-14
                        lg:py-12
                    "
                >
                    <div
                        className="
                            relative
                            z-20
                            flex
                            items-center
                            justify-between
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.2em]
                            sm:text-[11px]
                        "
                    >
                        <span>ProspectPick</span>
                        <span>Contact / 03</span>
                    </div>

                    <p
                        className="
                            absolute
                            left-6
                            right-6
                            top-[125px]
                            max-w-[420px]
                            text-[15px]
                            leading-7
                            text-[#626b7b]
                            sm:left-auto
                            sm:right-10
                            sm:top-[150px]
                            sm:text-[16px]
                            lg:right-14
                            lg:max-w-[360px]
                            lg:text-[17px]
                        "
                    >
                        Questions about an order, a product, or anything
                        else? Send us a message and we’ll help point you
                        in the right direction.
                    </p>

                    <div
                        className="
                            absolute
                            bottom-12
                            left-6
                            sm:bottom-14
                            sm:left-10
                            lg:bottom-16
                            lg:left-14
                        "
                    >
                        <p
                            className="
                                mb-4
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-[#858d9b]
                                sm:text-xs
                            "
                        >
                            Start a conversation
                        </p>

                        <h1
                            className="
                                text-[clamp(4.8rem,11vw,10.5rem)]
                                font-black
                                uppercase
                                leading-[0.78]
                                tracking-[-0.08em]
                            "
                        >
                            Let's
                            <br />
                            <span className="text-[#8b95a5]">
                                talk.
                            </span>
                        </h1>
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section
                    className="
                        mt-4
                        rounded-[32px]
                        bg-[#070b14]
                        px-6
                        py-16
                        text-white
                        sm:px-10
                        sm:py-20
                        lg:px-14
                        lg:py-24
                    "
                >
                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-12
                            lg:grid-cols-[0.85fr_1.15fr]
                            lg:gap-20
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-[10px]
                                    uppercase
                                    tracking-[0.25em]
                                    text-[#858d9b]
                                    sm:text-xs
                                "
                            >
                                01 / Get in touch
                            </p>

                            <h2
                                className="
                                    mt-4
                                    text-[clamp(3.5rem,7vw,7rem)]
                                    font-black
                                    uppercase
                                    leading-[0.88]
                                    tracking-[-0.06em]
                                "
                            >
                                We’re here
                                <br />
                                to help.
                            </h2>

                            <p
                                className="
                                    mt-7
                                    max-w-[460px]
                                    text-[16px]
                                    leading-8
                                    text-[#a8b0bf]
                                    sm:text-[18px]
                                "
                            >
                                Use the form for product questions,
                                order support, returns, or anything else
                                related to your ProspectPick experience.
                            </p>

                            <div className="mt-14 border-t border-[#283140]">
                                <div
                                    className="
                                        grid
                                        grid-cols-[110px_1fr]
                                        gap-5
                                        border-b
                                        border-[#283140]
                                        py-5
                                    "
                                >
                                    <span
                                        className="
                                            text-[11px]
                                            uppercase
                                            tracking-[0.15em]
                                            text-[#7f899a]
                                        "
                                    >
                                        General
                                    </span>

                                    <strong>
                                        hello@prospectpick.com
                                    </strong>
                                </div>

                                <div
                                    className="
                                        grid
                                        grid-cols-[110px_1fr]
                                        gap-5
                                        border-b
                                        border-[#283140]
                                        py-5
                                    "
                                >
                                    <span
                                        className="
                                            text-[11px]
                                            uppercase
                                            tracking-[0.15em]
                                            text-[#7f899a]
                                        "
                                    >
                                        Support
                                    </span>

                                    <strong>
                                        support@prospectpick.com
                                    </strong>
                                </div>

                                <div
                                    className="
                                        grid
                                        grid-cols-[110px_1fr]
                                        gap-5
                                        border-b
                                        border-[#283140]
                                        py-5
                                    "
                                >
                                    <span
                                        className="
                                            text-[11px]
                                            uppercase
                                            tracking-[0.15em]
                                            text-[#7f899a]
                                        "
                                    >
                                        Response
                                    </span>

                                    <strong>
                                        Usually within 1–2 business days
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleSubmit}
                            className="
                                rounded-[28px]
                                border
                                border-[#283140]
                                bg-[#0f1522]
                                p-6
                                sm:p-8
                            "
                        >
                            <p
                                className="
                                    mb-8
                                    text-[11px]
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#9099a9]
                                "
                            >
                                Send a message
                            </p>

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-6
                                    sm:grid-cols-2
                                "
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="
                                            mb-2
                                            block
                                            text-[11px]
                                            uppercase
                                            tracking-[0.14em]
                                            text-[#7f899a]
                                        "
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your name"
                                        className="
                                            w-full
                                            border-0
                                            border-b
                                            border-[#3a4353]
                                            bg-transparent
                                            py-3
                                            text-white
                                            outline-none
                                            placeholder:text-[#626b7b]
                                            focus:border-white
                                        "
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="
                                            mb-2
                                            block
                                            text-[11px]
                                            uppercase
                                            tracking-[0.14em]
                                            text-[#7f899a]
                                        "
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="
                                            w-full
                                            border-0
                                            border-b
                                            border-[#3a4353]
                                            bg-transparent
                                            py-3
                                            text-white
                                            outline-none
                                            placeholder:text-[#626b7b]
                                            focus:border-white
                                        "
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label
                                    htmlFor="subject"
                                    className="
                                        mb-2
                                        block
                                        text-[11px]
                                        uppercase
                                        tracking-[0.14em]
                                        text-[#7f899a]
                                    "
                                >
                                    Subject
                                </label>

                                <select
                                    id="subject"
                                    className="
                                        w-full
                                        border-0
                                        border-b
                                        border-[#3a4353]
                                        bg-transparent
                                        py-3
                                        text-white
                                        outline-none
                                        focus:border-white
                                    "
                                >
                                    <option className="text-black">
                                        Product question
                                    </option>
                                    <option className="text-black">
                                        Order support
                                    </option>
                                    <option className="text-black">
                                        Shipping
                                    </option>
                                    <option className="text-black">
                                        Returns
                                    </option>
                                    <option className="text-black">
                                        Other
                                    </option>
                                </select>
                            </div>

                            <div className="mt-6">
                                <label
                                    htmlFor="message"
                                    className="
                                        mb-2
                                        block
                                        text-[11px]
                                        uppercase
                                        tracking-[0.14em]
                                        text-[#7f899a]
                                    "
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    placeholder="How can we help?"
                                    className="
                                        min-h-[150px]
                                        w-full
                                        resize-y
                                        border-0
                                        border-b
                                        border-[#3a4353]
                                        bg-transparent
                                        py-3
                                        text-white
                                        outline-none
                                        placeholder:text-[#626b7b]
                                        focus:border-white
                                    "
                                />
                            </div>

                            <button
                                type="submit"
                                className="
                                    mt-8
                                    cursor-pointer
                                    rounded-full
                                    bg-white
                                    px-6
                                    py-4
                                    text-sm
                                    font-bold
                                    text-[#070b14]
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:bg-[#ececec]
                                "
                            >
                                Send message
                                <span className="ml-2">→</span>
                            </button>

                            {submitted && (
                                <p
                                    className="
                                        mt-5
                                        text-sm
                                        leading-6
                                        text-[#a8b0bf]
                                    "
                                >
                                    Thanks — your message has been sent.
                                </p>
                            )}
                        </form>
                    </div>
                </section>

                {/* FAQ CTA */}
                <section
                    className="
                        mt-4
                        flex
                        min-h-[360px]
                        items-center
                        justify-center
                        rounded-[32px]
                        bg-white
                        px-6
                        py-20
                        text-center
                        sm:px-10
                    "
                >
                    <div>
                        <p
                            className="
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-[#858d9b]
                                sm:text-xs
                            "
                        >
                            02 / Quick answers
                        </p>

                        <h2
                            className="
                                mt-4
                                text-[clamp(3.8rem,8vw,7.5rem)]
                                font-black
                                uppercase
                                leading-[0.85]
                                tracking-[-0.07em]
                                text-[#070b14]
                            "
                        >
                            Need an answer
                            <br />
                            right now?
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-7
                                max-w-[560px]
                                text-[15px]
                                leading-7
                                text-[#7a8392]
                                sm:text-[17px]
                            "
                        >
                            Check the FAQ for common questions about
                            products, orders, shipping, and returns
                            before sending a message.
                        </p>

                        <a
                            href="/faq"
                            className="
                                mt-8
                                inline-flex
                                rounded-full
                                bg-[#070b14]
                                px-6
                                py-4
                                text-sm
                                font-bold
                                text-white
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:bg-[#171d2a]
                            "
                        >
                            View FAQ
                            <span className="ml-2">→</span>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Contact;