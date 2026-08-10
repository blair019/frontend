import { useEffect } from "react";
import kitchen from "../src/assets/kitchen-our.png";
import tools from "../src/assets/toolbox-main.png";
import livingRoom from "../src/assets/livingroom-our.avif";
import couch from "../src/assets/couch-our.avif";

function OurStory() {
    useEffect(() => {
        const elements = document.querySelectorAll(".story-reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "opacity-100",
                            "translate-y-0"
                        );

                        entry.target.classList.remove(
                            "opacity-0",
                            "translate-y-8"
                        );

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
            }
        );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToProducts = () => {
        window.location.href = "/";
    };

    return (
        <main className="min-h-screen bg-[#f7f7f7]">

            {/* =====================================================
                PAGE WRAPPER
            ====================================================== */}
            <div className="mx-auto max-w-[1532px] p-3 sm:p-4">

                {/* =================================================
                    HERO
                ================================================== */}
                <section
                    className="
                        relative
                        min-h-[720px]
                        overflow-hidden
                        rounded-[32px]
                        bg-[#070b14]
                        px-6
                        py-8
                        text-[#f4f1e9]

                        sm:min-h-[760px]
                        sm:px-10
                        sm:py-10

                        lg:px-14
                        lg:py-12
                    "
                >

                    {/* Decorative circle */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-[150px]
                            -top-[180px]
                            h-[520px]
                            w-[520px]
                            rounded-full
                            border
                            border-white/[0.05]
                        "
                    />


                    {/* =========================
                        TOP META
                    ========================== */}
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
                        <span>
                            ProspectPick
                        </span>

                        <span>
                            Our Story / 2026
                        </span>
                    </div>


                    {/* =========================
                        HERO DESCRIPTION
                    ========================== */}
                    <p
                        className="
                            absolute
                            left-6
                            right-6
                            top-[125px]
                            z-30

                            max-w-[400px]

                            text-[15px]
                            leading-7
                            text-[#a6afbd]

                            sm:left-auto
                            sm:right-10
                            sm:top-[150px]
                            sm:text-[16px]

                            lg:right-14
                            lg:max-w-[340px]
                            lg:text-[17px]
                        "
                    >
                        Everyday products should not require endless
                        searching. ProspectPick exists to make choosing
                        feel clear again.
                    </p>


                    {/* =========================
                        HERO IMAGE
                    ========================== */}
                    <div
                        className="
                            group
                            absolute
                            right-[6%]
                            top-[32%]
                            z-10

                            hidden
                            aspect-[4/5]
                            w-[280px]
                            rotate-[3deg]
                            overflow-hidden
                            rounded-[28px]

                            shadow-[0_35px_90px_rgba(0,0,0,0.4)]

                            transition-all
                            duration-500

                            hover:-translate-y-2
                            hover:rotate-0

                            md:block

                            lg:right-[9%]
                            lg:top-[28%]
                            lg:w-[340px]

                            xl:w-[360px]
                        "
                    >
                        <img
                            src={couch}
                            alt="Curated everyday interior products"
                            className="
                                h-full
                                w-full
                                object-cover
                                saturate-[0.75]
                                transition-transform
                                duration-700
                                group-hover:scale-[1.04]
                            "
                        />

                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-b
                                from-transparent
                                via-transparent
                                to-black/40
                            "
                        />
                    </div>


                    {/* =========================
                        HERO HEADLINE
                    ========================== */}
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
                                text-[#919baa]

                                sm:text-xs
                            "
                        >
                            Built around better decisions
                        </p>

                        <h1
                            className="
                                text-[clamp(4.5rem,11vw,11rem)]
                                font-black
                                uppercase
                                leading-[0.79]
                                tracking-[-0.08em]
                            "
                        >
                            Choose
                            <br />

                            with less
                            <br />

                            <span className="text-[#7d8798]">
                                noise.
                            </span>
                        </h1>
                    </div>

                </section>


                {/* =================================================
                    STORY SECTION
                ================================================== */}
                <section
                    className="
                        story-reveal

                        mt-4

                        translate-y-8
                        opacity-0

                        rounded-[32px]
                        bg-[#f1ede4]

                        px-6
                        py-16

                        transition-all
                        duration-700
                        ease-out

                        sm:px-10
                        sm:py-20

                        lg:px-14
                        lg:py-24
                    "
                >

                    {/* =========================
                        STORY HEADER
                    ========================== */}
                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-10

                            lg:grid-cols-2
                            lg:gap-20
                        "
                    >
                        <div>
                            <p
                                className="
                                    mb-5
                                    text-xs
                                    uppercase
                                    tracking-[0.25em]
                                    text-[#858d9b]
                                "
                            >
                                01 / The idea
                            </p>

                            <h2
                                className="
                                    text-[clamp(3.5rem,7vw,7rem)]
                                    font-black
                                    uppercase
                                    leading-[0.88]
                                    tracking-[-0.06em]
                                    text-[#080d18]
                                "
                            >
                                Small idea.
                                <br />

                                Useful result.
                            </h2>
                        </div>


                        <div
                            className="
                                max-w-[620px]

                                text-[17px]
                                leading-8
                                text-[#545c6b]

                                sm:text-[18px]

                                lg:text-[20px]
                                lg:leading-9
                            "
                        >
                            <p>
                                ProspectPick started with a simple
                                observation: online stores often make
                                simple products harder to choose than
                                they need to be.
                            </p>

                            <p className="mt-6">
                                We built a cleaner experience around
                                practical categories, clear browsing,
                                and useful everyday items.
                            </p>
                        </div>
                    </div>


                    {/* =========================
                        EDITORIAL IMAGES
                    ========================== */}
                    <div
                        className="
                            mt-16

                            grid
                            grid-cols-1
                            items-end
                            gap-5

                            lg:mt-20
                            lg:grid-cols-[1.3fr_0.7fr]
                        "
                    >

                        {/* LARGE IMAGE */}
                        <div>
                            <div
                                className="
                                    group
                                    min-h-[330px]
                                    overflow-hidden
                                    rounded-[26px]

                                    sm:min-h-[400px]

                                    lg:min-h-[460px]
                                "
                            >
                                <img
                                    src={kitchen}
                                    alt="Everyday household products"
                                    className="
                                        h-full
                                        min-h-[330px]
                                        w-full
                                        object-cover

                                        transition-transform
                                        duration-700

                                        group-hover:scale-[1.03]

                                        sm:min-h-[400px]

                                        lg:min-h-[460px]
                                    "
                                />
                            </div>

                            <p
                                className="
                                    mt-3
                                    text-[10px]
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#7b8290]

                                    sm:text-[11px]
                                "
                            >
                                Everyday objects / considered choices
                            </p>
                        </div>


                        {/* SMALL IMAGE */}
                        <div>
                            <div
                                className="
                                    group
                                    min-h-[280px]
                                    overflow-hidden
                                    rounded-[24px]

                                    lg:min-h-[320px]
                                "
                            >
                                <img
                                    src={tools}
                                    alt="Tools and practical materials"
                                    className="
                                        h-full
                                        min-h-[280px]
                                        w-full
                                        object-cover

                                        transition-transform
                                        duration-700

                                        group-hover:scale-[1.04]

                                        lg:min-h-[320px]
                                    "
                                />
                            </div>

                            <p
                                className="
                                    mt-3
                                    text-[10px]
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#7b8290]

                                    sm:text-[11px]
                                "
                            >
                                Materials / utility / simplicity
                            </p>
                        </div>
                    </div>


                    {/* =========================
                        VALUES
                    ========================== */}
                    <div
                        className="
                            mt-20

                            grid
                            grid-cols-1

                            border-t
                            border-[#d7d0c4]

                            lg:mt-24
                            lg:grid-cols-3
                        "
                    >

                        {/* CLARITY */}
                        <div
                            className="
                                border-b
                                border-[#d7d0c4]

                                py-8

                                lg:min-h-[270px]
                                lg:border-b-0
                                lg:border-r
                                lg:pr-8
                            "
                        >
                            <span
                                className="
                                    text-[11px]
                                    tracking-[0.16em]
                                    text-[#979185]
                                "
                            >
                                01
                            </span>

                            <h3
                                className="
                                    mt-12
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    text-[#080d18]
                                "
                            >
                                Clarity
                            </h3>

                            <p
                                className="
                                    mt-4
                                    max-w-[320px]
                                    leading-7
                                    text-[#6a706f]
                                "
                            >
                                Simple navigation and product
                                information that is easy to understand.
                            </p>
                        </div>


                        {/* UTILITY */}
                        <div
                            className="
                                border-b
                                border-[#d7d0c4]

                                py-8

                                lg:min-h-[270px]
                                lg:border-b-0
                                lg:border-r
                                lg:px-8
                            "
                        >
                            <span
                                className="
                                    text-[11px]
                                    tracking-[0.16em]
                                    text-[#979185]
                                "
                            >
                                02
                            </span>

                            <h3
                                className="
                                    mt-12
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    text-[#080d18]
                                "
                            >
                                Utility
                            </h3>

                            <p
                                className="
                                    mt-4
                                    max-w-[320px]
                                    leading-7
                                    text-[#6a706f]
                                "
                            >
                                Everyday products selected around
                                practical use and familiar needs.
                            </p>
                        </div>


                        {/* RESTRAINT */}
                        <div
                            className="
                                py-8

                                lg:min-h-[270px]
                                lg:pl-8
                            "
                        >
                            <span
                                className="
                                    text-[11px]
                                    tracking-[0.16em]
                                    text-[#979185]
                                "
                            >
                                03
                            </span>

                            <h3
                                className="
                                    mt-12
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    text-[#080d18]
                                "
                            >
                                Restraint
                            </h3>

                            <p
                                className="
                                    mt-4
                                    max-w-[320px]
                                    leading-7
                                    text-[#6a706f]
                                "
                            >
                                A focused collection without endless
                                clutter, noise, or unnecessary friction.
                            </p>
                        </div>

                    </div>

                </section>


                {/* =================================================
                    PANORAMIC IMAGE
                ================================================== */}
                <section
                    className="
                        story-reveal

                        relative
                        mt-4
                        h-[360px]

                        translate-y-8
                        overflow-hidden
                        rounded-[32px]
                        opacity-0

                        transition-all
                        duration-700
                        ease-out

                        sm:h-[400px]

                        lg:h-[440px]
                    "
                >
                    <img
                        src={livingRoom}
                        alt="Considered everyday living space"
                        className="
                            h-full
                            w-full
                            object-cover
                            saturate-[0.8]
                        "
                    />

                    {/* Overlay */}
                    <div
                        className="
                            absolute
                            inset-0

                            bg-gradient-to-r
                            from-[#070b14]/75
                            via-[#070b14]/20
                            to-[#070b14]/20
                        "
                    />


                    {/* Text */}
                    <div
                        className="
                            absolute
                            bottom-8
                            left-6
                            z-10
                            text-white

                            sm:bottom-10
                            sm:left-10

                            lg:bottom-12
                            lg:left-14
                        "
                    >
                        <p
                            className="
                                text-[10px]
                                uppercase
                                tracking-[0.22em]
                                text-white/70

                                sm:text-xs
                            "
                        >
                            02 / What matters
                        </p>

                        <h2
                            className="
                                mt-3
                                text-[clamp(2.4rem,5vw,4.5rem)]
                                font-bold
                                leading-[0.95]
                                tracking-[-0.05em]
                            "
                        >
                            Useful should still
                            <br />

                            feel considered.
                        </h2>
                    </div>
                </section>


                {/* =================================================
                    FINAL CTA
                ================================================== */}
                <section
                    className="
                        story-reveal

                        mt-4

                        translate-y-8
                        rounded-[32px]
                        bg-white
                        px-6
                        py-24
                        text-center
                        opacity-0

                        transition-all
                        duration-700
                        ease-out

                        sm:px-10
                        sm:py-28

                        lg:py-32
                    "
                >
                    <p
                        className="
                            text-[10px]
                            uppercase
                            tracking-[0.25em]
                            text-[#8b93a0]

                            sm:text-xs
                        "
                    >
                        03 / The point
                    </p>


                    <h2
                        className="
                            mt-5

                            text-[clamp(4rem,10vw,10rem)]
                            font-black
                            uppercase
                            leading-[0.82]
                            tracking-[-0.08em]
                            text-[#070b14]
                        "
                    >
                        Less noise.
                        <br />

                        Better picks.
                    </h2>


                    <p
                        className="
                            mx-auto
                            mt-8
                            max-w-[560px]

                            text-[16px]
                            leading-7
                            text-[#697386]

                            sm:text-[17px]
                        "
                    >
                        ProspectPick is designed to make everyday
                        shopping feel simpler, clearer, and easier to
                        move through.
                    </p>


                    <button
                        type="button"
                        onClick={scrollToProducts}
                        className="
                            mt-9

                            cursor-pointer

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
                            hover:shadow-lg

                            active:translate-y-0
                            active:scale-[0.98]
                        "
                    >
                        Explore products

                        <span className="ml-2">
                            →
                        </span>
                    </button>

                </section>

            </div>
        </main>
    );
}

export default OurStory;