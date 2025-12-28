import { Timeline } from "../components/ui/timeline";
import { EventPathCalendar } from "../components/ui/event-path-calendar";

const PastEventsPage = () => {
    const data = [
        {
            title: "Sep 2025",
            content: (
                <div>
                    <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8 leading-relaxed">
                        <span className="font-bold text-xl block mb-2 text-violet-300 font-zentry uppercase tracking-wide">Build IT Tour 2.0</span>
                        <span className="block text-xs text-neutral-400 mb-2">27 September 2025</span>
                        Build IT Tour 2.0 offered students exposure to industry practices, emerging technologies, and entrepreneurial journeys. Expert sessions on global career paths and innovation encouraged participants to think beyond academics.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 will-change-transform">
                        <img
                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=500"
                            alt="Build IT Tour"
                            className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=500"
                            alt="Seminar"
                            className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Sep 2025",
            content: (
                <div>
                    <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8 leading-relaxed">
                        <span className="font-bold text-xl block mb-2 text-cyan-300 font-zentry uppercase tracking-wide">HackWithMumbai Hackathon</span>
                        <span className="block text-xs text-neutral-400 mb-2">21 September 2025</span>
                        The HackWithMumbai Hackathon provided a collaborative platform for students to ideate and build solutions for real-world problems. Participants worked in teams under faculty mentorship and presented innovative projects.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=500"
                            alt="HackWithMumbai"
                            className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=500"
                            alt="Coding Team"
                            className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Sep 2025",
            content: (
                <div>
                    <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8 leading-relaxed">
                        <span className="font-bold text-xl block mb-2 text-purple-300 font-zentry uppercase tracking-wide">Pre-event HackWithMumbai</span>
                        <span className="block text-xs text-neutral-400 mb-2">15 September 2025</span>
                        A curtain-raiser for the main HackWithMumbai Hackathon. The event provided participants with insights into the vision of the hackathon, industry perspectives, and mentorship opportunities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <img
                            src="/img/pre-event-1.jpg"
                            alt="Pre-event"
                            className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg"
                        />
                        <img
                            src="/img/pre-event-2.jpg"
                            alt="Mentorship"
                            className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Aug 2025",
            content: (
                <div>
                    <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8 leading-relaxed">
                        <span className="font-bold text-xl block mb-2 text-pink-300 font-zentry uppercase tracking-wide">Orientation Ceremony</span>
                        <span className="block text-xs text-neutral-400 mb-2">23 August 2025</span>
                        Introduced first-year students to the vision and initiatives of the HackWithIndia BVUDET NM Chapter. A hands-on Replit AI workshop helped students understand the practical use of AI tools.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=500"
                            alt="Orientation"
                            className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=500"
                            alt="Workshop"
                            className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Jul 2025",
            content: (
                <div>
                    <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8 leading-relaxed">
                        <span className="font-bold text-xl block mb-2 text-yellow-300 font-zentry uppercase tracking-wide">Learn IT Tour</span>
                        <span className="block text-xs text-neutral-400 mb-2">16 July 2025</span>
                        Organized to expose students to the latest trends in the technology ecosystem. Industry experts conducted interactive sessions exploring innovation, open-source, and career opportunities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=500"
                            alt="Learn IT Tour"
                            className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=500"
                            alt="Team Session"
                            className="rounded-lg object-cover h-40 md:h-44 lg:h-60 w-full shadow-lg"
                        />
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="pt-24 min-h-screen w-screen bg-black">
            <Timeline data={data} />

            <div className="container mx-auto px-10 pb-24 border-t border-white/10 pt-20">
                <h2 className="text-4xl md:text-6xl font-zentry text-white mb-12 text-center uppercase tracking-tighter">
                    Event <span className="text-violet-500">Calendar</span>
                </h2>
                <EventPathCalendar />
            </div>
        </div>
    );
};

export default PastEventsPage;
