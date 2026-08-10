import { useMemo, useState } from "react";

function FAQ() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [openIndex, setOpenIndex] = useState(null);

    const faqItems = [
        {
            category: "orders",
            question: "How do I place an order?",
            answer:
                "Browse the collection, choose a product, add it to your cart, and continue through checkout.",
        },
        {
            category: "orders",
            question: "Can I change or cancel my order?",
            answer:
                "Add your actual cancellation and editing policy here.",
        },
        {
            category: "shipping",
            question: "How can I track my order?",
            answer:
                "Explain where customers can find order status or tracking information.",
        },
        {
            category: "shipping",
            question: "How long does delivery take?",
            answer:
                "Add your real delivery estimate here.",
        },
        {
            category: "returns",
            question: "What is the return policy?",
            answer:
                "Add your actual return window and eligibility rules here.",
        },
        {
            category: "products",
            question: "How are products organized?",
            answer:
                "ProspectPick organizes products into Wood, Household, Metal, and Plastic categories.",
        },
    ];

    const categories = [
        { label: "All", value: "all" },
        { label: "Orders", value: "orders" },
        { label: "Shipping", value: "shipping" },
        { label: "Returns", value: "returns" },
        { label: "Products", value: "products" },
    ];

    const filteredFaqs = useMemo(() => {
        if (activeCategory === "all") return faqItems;

        return faqItems.filter(
            (item) => item.category === activeCategory
        );
    }, [activeCategory]);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setOpenIndex(null);
    };

    return (
        <main className="min-h-screen bg-[#f7f7f7]">
            <div className="mx-auto max-w-[1532px] p-3 sm:p-4">

                {/* HERO */}
                <section
                    className="
                        relative
                        min-h-[650px]
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
                            z-30
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
                        <span>FAQ / Support</span>
                    </div>

                    <div
                        className="
                            pointer-events-none
                            absolute
                            right-[-8%]
                            top-1/2
                            -translate-y-[48%]
                            select-none
                            text-[clamp(20rem,42vw,40rem)]
                            font-black
                            leading-[0.7]
                            text-[#e4ded3]
                        "
                    >
                        ?
                    </div>

                    <p
                        className="
                            absolute
                            left-6
                            right-6
                            top-[125px]
                            z-20
                            max-w-[420px]
                            text-[15px]
                            leading-7
                            text-[#626b7b]
                            sm:left-auto
                            sm:right-10
                            sm:top-[150px]
                            sm:text-[16px]
                            lg:right-14
                            lg:max-w-[350px]
                            lg:text-[17px]
                        "
                    >
                        Everything you need to know about browsing,
                        products, orders, delivery, returns, and your
                        ProspectPick experience.
                    </p>

                    <div
                        className="
                            absolute
                            bottom-12
                            left-6
                            z-20
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
                            A simpler place to start
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
                            Questions,
                            <br />
                            <span className="text-[#8b95a5]">
                                answered.
                            </span>
                        </h1>
                    </div>
                </section>

                {/* FAQ SECTION */}
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
                            gap-10
                            lg:grid-cols-[0.8fr_1.2fr]
                            lg:items-end
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
                                01 / Common questions
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
                                Need to
                                <br />
                                know?
                            </h2>
                        </div>

                        <p
                            className="
                                max-w-[600px]
                                text-[16px]
                                leading-8
                                text-[#a8b0bf]
                                sm:text-[18px]
                            "
                        >
                            Browse the most common questions below.
                            Update shipping, returns, payment, and order
                            details to match the exact policies your store
                            supports.
                        </p>
                    </div>

                    <div
                        className="
                            mt-12
                            flex
                            flex-wrap
                            gap-2
                            lg:mt-14
                        "
                    >
                        {categories.map((category) => {
                            const isActive =
                                activeCategory === category.value;

                            return (
                                <button
                                    key={category.value}
                                    type="button"
                                    onClick={() =>
                                        handleCategoryChange(category.value)
                                    }
                                    className={`
                                        cursor-pointer
                                        rounded-full
                                        border
                                        px-4
                                        py-2.5
                                        text-[11px]
                                        font-medium
                                        uppercase
                                        tracking-[0.1em]
                                        transition-all
                                        duration-200
                                        ${
                                        isActive
                                            ? "border-white bg-white text-[#070b14]"
                                            : "border-[#3a4353] bg-transparent text-[#aab2c0] hover:border-white hover:text-white"
                                    }
                                    `}
                                >
                                    {category.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 border-t border-[#283140]">
                        {filteredFaqs.map((item, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={`${item.category}-${item.question}`}
                                    className="border-b border-[#283140]"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenIndex(
                                                isOpen ? null : index
                                            )
                                        }
                                        className="
                                            grid
                                            w-full
                                            cursor-pointer
                                            grid-cols-[42px_1fr_38px]
                                            items-center
                                            gap-3
                                            bg-transparent
                                            py-7
                                            text-left
                                            text-white
                                            sm:grid-cols-[60px_1fr_42px]
                                            lg:grid-cols-[70px_1fr_50px]
                                            lg:gap-5
                                            lg:py-8
                                        "
                                    >
                                        <span
                                            className="
                                                text-[10px]
                                                tracking-[0.15em]
                                                text-[#7f899a]
                                                sm:text-[11px]
                                            "
                                        >
                                            {String(index + 1).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <span
                                            className="
                                                pr-4
                                                text-[19px]
                                                font-bold
                                                leading-tight
                                                tracking-[-0.03em]
                                                sm:text-[24px]
                                                lg:text-[clamp(1.5rem,2.4vw,2.1rem)]
                                            "
                                        >
                                            {item.question}
                                        </span>

                                        <span
                                            className={`
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                justify-self-end
                                                rounded-full
                                                border
                                                text-xl
                                                font-light
                                                transition-all
                                                duration-300
                                                ${
                                                isOpen
                                                    ? "rotate-45 border-white bg-white text-[#070b14]"
                                                    : "border-[#4d5768] text-white"
                                            }
                                            `}
                                        >
                                            +
                                        </span>
                                    </button>

                                    <div
                                        className={`
                                            grid
                                            overflow-hidden
                                            transition-all
                                            duration-500
                                            ease-in-out
                                            ${
                                            isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                        }
                                        `}
                                    >
                                        <div className="overflow-hidden">
                                            <div
                                                className="
                                                    max-w-[900px]
                                                    pb-8
                                                    pl-[54px]
                                                    pr-5
                                                    text-[15px]
                                                    leading-7
                                                    text-[#a4adbb]
                                                    sm:pl-[72px]
                                                    sm:text-[16px]
                                                    sm:leading-8
                                                    lg:pb-9
                                                    lg:pl-[90px]
                                                    lg:pr-12
                                                "
                                            >
                                                {item.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* CONTACT CTA */}
                <section
                    className="
                        mt-4
                        flex
                        min-h-[380px]
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
                            02 / Still need help?
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
                            Can't find
                            <br />
                            your answer?
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
                            Reach out and we can point you in the right
                            direction.
                        </p>

                        <a
                            href="/contact"
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
                            Contact us
                            <span className="ml-2">→</span>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default FAQ;