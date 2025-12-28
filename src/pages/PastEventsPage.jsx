import { Timeline } from "../components/ui/timeline";
import { EventPathCalendar } from "../components/ui/event-path-calendar";

const PastEventsPage = () => {
    const data = [
        {
            title: "Oct 2024",
            content: (
                <div>
                    <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8 leading-relaxed">
                        <span className="font-bold text-xl block mb-2 text-violet-300 font-zentry uppercase tracking-wide">HackBattle 1.0</span>
                        Our internal hackathon exclusively for freshers. A 24-hour marathon of innovation, code, and caffeine, witnessing over 150+ participants building solutions for the future.
                    </p>
                    <div className="grid grid-cols-2 gap-4 will-change-transform">
                        <img
                            src="https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=500"
                            alt="HackBattle Crowd"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=500"
                            alt="Hackathon Coding"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Sep 2024",
            content: (
                <div>
                    <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8 leading-relaxed">
                        <span className="font-bold text-xl block mb-2 text-blue-300 font-zentry uppercase tracking-wide">WebDev Bootcamp</span>
                        3-day intensive workshop series covering HTML, CSS, JS, and React. 200+ students started their web development journey with hands-on projects.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500"
                            alt="Web Dev Code"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=500"
                            alt="Code Editor"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Aug 2024",
            content: (
                <div>
                    <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8 leading-relaxed">
                        <span className="font-bold text-xl block mb-2 text-pink-300 font-zentry uppercase tracking-wide">AI Summit</span>
                        Guest lectures from Industry experts exploring Generative AI and LLMs. 120+ participants dived deep into the future of technology.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=500"
                            alt="AI Brain"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=500"
                            alt="AI Network"
                            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
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
