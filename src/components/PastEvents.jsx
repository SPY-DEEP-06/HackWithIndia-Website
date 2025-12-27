const EventItem = ({ title, date, description, count }) => (
    <div className="flex flex-col gap-2 border-b border-white/20 py-4 text-blue-50 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
            <h3 className="font-zentry text-lg uppercase text-violet-300">{title}</h3>
            <p className="font-general text-xs text-blue-50/60">{date}</p>
        </div>
        <div className="flex flex-col md:items-end">
            <p className="font-general text-sm">{description}</p>
            <p className="font-general text-xs text-blue-50/60">{count} Participants</p>
        </div>
    </div>
);

const PastEvents = () => {
    const events = [
        { title: "HackBattle 1.0", date: "Oct 2024", description: "Internal hackathon for freshers", count: 150 },
        { title: "WebDev Bootcamp", date: "Sep 2024", description: "3-day intensive workshops", count: 200 },
        { title: "AI Summit", date: "Aug 2024", description: "Guest lectures from Industry", count: 120 },
    ];

    return (
        <section className="bg-black py-24 text-blue-50 min-h-screen">
            <div className="container mx-auto px-10">
                <h2 className="mb-10 font-zentry text-6xl uppercase leading-[0.9]">
                    Past <b>E</b>vents
                </h2>

                <div className="mb-20 rounded-lg border border-white/10 bg-white/5 p-5">
                    {events.map((event, i) => (
                        <EventItem key={i} {...event} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PastEvents;
