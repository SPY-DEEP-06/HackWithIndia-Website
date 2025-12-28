import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "./card"
import { Button } from "./button"
import { Popover, PopoverTrigger, PopoverContent } from "./popover"
import { Input } from "./input"
import { Label } from "./label"
import { Calendar } from "./calendar"
import { Trash2, Lock, Unlock } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger);

const filterOptions = [
    { value: "all", label: "All Events" },
    { value: "future", label: "Future Events" },
    { value: "date_range", label: "Date Range" },
    { value: "year", label: "Year Specific" },
    { value: "last_week", label: "Last Week" },
    { value: "last_month", label: "Last Month" },
    { value: "last_3_months", label: "Last 3 Months" },
    { value: "last_6_months", label: "Last 6 Months" },
]

export function EventPathCalendar() {
    // Initialize from LocalStorage or empty array
    const [events, setEvents] = useState(() => {
        try {
            const saved = localStorage.getItem("hwi-events-data-v1");
            if (saved) {
                return JSON.parse(saved, (key, value) => {
                    if (key === 'date') return new Date(value);
                    return value;
                });
            }
        } catch (e) { console.error("Failed to load events", e); }
        return [
            { id: 1, title: "Learn IT Tour", date: new Date(2025, 6, 16) }, // July
            { id: 2, title: "Orientation Ceremony", date: new Date(2025, 7, 23) }, // Aug
            { id: 3, title: "Pre-event HackWithMumbai", date: new Date(2025, 8, 15) }, // Sep
            { id: 4, title: "HackWithMumbai Hackathon", date: new Date(2025, 8, 21) }, // Sep
            { id: 5, title: "Build IT Tour 2.0", date: new Date(2025, 8, 27) }, // Sep
        ];
    });

    const [title, setTitle] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [filter, setFilter] = useState("year")

    // Admin State
    const [isAdmin, setIsAdmin] = useState(false)
    const [passwordInput, setPasswordInput] = useState("")

    // Additional Filter States
    const [rangeStart, setRangeStart] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)))
    const [rangeEnd, setRangeEnd] = useState(new Date())
    const [selectedYear, setSelectedYear] = useState("2025")

    const currentYear = new Date().getFullYear();
    // Get unique years from events plus current/next year
    const availableYears = Array.from(new Set([
        currentYear,
        currentYear + 1,
        ...events.map(e => e.date.getFullYear())
    ])).sort((a, b) => b - a);

    useEffect(() => {
        localStorage.setItem("hwi-events-data-v1", JSON.stringify(events));
    }, [events]);

    const handleAdminLogin = () => {
        if (passwordInput === "Hack@2025") {
            setIsAdmin(true);
            setPasswordInput("");
        } else {
            alert("Incorrect Password!");
        }
    }

    const addEvent = () => {
        if (!title || !selectedDate) return
        setEvents([...events, { id: Date.now(), title, date: selectedDate }])
        setTitle("")
        setSelectedDate(new Date())
    }

    const deleteEvent = (id) => {
        if (confirm("Are you sure you want to delete this event?")) {
            setEvents(events.filter(e => e.id !== id))
        }
    }

    // Filter events based on selected filter
    const getFilteredEvents = () => {
        const now = new Date()
        let startDate = new Date()

        // Default show all logic modification
        if (filter === "all") return events;
        if (filter === "future") return events.filter(ev => ev.date > now);

        // Year Logic
        if (filter === "year") {
            return events.filter(ev => ev.date.getFullYear().toString() === selectedYear);
        }

        // Date Range Logic
        if (filter === "date_range") {
            // Set rangeEnd to end of day for inclusive comparison
            const end = new Date(rangeEnd);
            end.setHours(23, 59, 59, 999);
            const start = new Date(rangeStart);
            start.setHours(0, 0, 0, 0);
            return events.filter(ev => ev.date >= start && ev.date <= end);
        }

        switch (filter) {
            case "last_week":
                startDate.setDate(now.getDate() - 7)
                break
            case "last_month":
                startDate.setMonth(now.getMonth() - 1)
                break
            case "last_3_months":
                startDate.setMonth(now.getMonth() - 3)
                break
            case "last_6_months":
                startDate.setMonth(now.getMonth() - 6)
                break
            default:
                startDate = new Date(0) // Should catch 'all' but logically handled above
        }
        return events.filter(ev => ev.date >= startDate && ev.date <= now)
    }

    // Sort events by date
    const sortedEvents = [...getFilteredEvents()].sort((a, b) => a.date.getTime() - b.date.getTime())

    const containerRef = useRef(null);

    useGSAP(() => {
        if (sortedEvents.length > 0) {
            gsap.from(".event-dot", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            });
        }
    }, { scope: containerRef, dependencies: [sortedEvents] });

    return (
        <div ref={containerRef} className="flex flex-col gap-6 text-white w-full max-w-7xl mx-auto">
            {/* Search/Filter Bar (Always Visible) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end bg-zinc-900/50 p-4 rounded-lg border border-white/10 gap-4">
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="w-[200px]">
                        <Label className="mb-2 block text-neutral-400">Filter View</Label>
                        <Select value={filter} onValueChange={setFilter}>
                            <SelectTrigger className="bg-black border-white/20 text-white">
                                <SelectValue placeholder="Select filter" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-white/20 text-white">
                                {filterOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value} className="focus:bg-zinc-800 focus:text-white">{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Conditional Year Selector */}
                    {filter === "year" && (
                        <div className="w-[120px]">
                            <Label className="mb-2 block text-neutral-400">Select Year</Label>
                            <Select value={selectedYear} onValueChange={setSelectedYear}>
                                <SelectTrigger className="bg-black border-white/20 text-white">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-white/20 text-white">
                                    {availableYears.map(year => (
                                        <SelectItem key={year} value={year.toString()} className="focus:bg-zinc-800 focus:text-white">{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Conditional Date Range Pickers */}
                    {filter === "date_range" && (
                        <div className="flex gap-2">
                            <div>
                                <Label className="mb-2 block text-neutral-400">Start</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="h-9 w-[130px] justify-start text-left font-normal bg-black border-white/20 text-white hover:bg-zinc-800 hover:text-white px-3">
                                            {rangeStart ? rangeStart.toLocaleDateString() : "Start"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-zinc-900 border-white/20 text-white">
                                        <Calendar mode="single" selected={rangeStart} onSelect={setRangeStart} initialFocus className="bg-zinc-900 text-white" />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <Label className="mb-2 block text-neutral-400">End</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="h-9 w-[130px] justify-start text-left font-normal bg-black border-white/20 text-white hover:bg-zinc-800 hover:text-white px-3">
                                            {rangeEnd ? rangeEnd.toLocaleDateString() : "End"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-zinc-900 border-white/20 text-white">
                                        <Calendar mode="single" selected={rangeEnd} onSelect={setRangeEnd} initialFocus className="bg-zinc-900 text-white" />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-right w-full md:w-auto mt-4 md:mt-0">
                {!isAdmin ? (
                    <div className="flex items-end gap-2 justify-end">
                        <div className="flex flex-col gap-1 text-left">
                            <Label className="text-xs text-neutral-500">Admin Access</Label>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="h-8 w-32 bg-black border-white/20 text-white placeholder:text-neutral-600"
                            />
                        </div>
                        <Button size="sm" onClick={handleAdminLogin} variant="outline" className="h-8 border-violet-500 text-violet-400 hover:bg-violet-950">
                            <Lock className="w-3 h-3 mr-1" /> Login
                        </Button>
                    </div>
                ) : (
                    <Button size="sm" variant="ghost" className="text-green-400 hover:text-green-300 pointer-events-none">
                        <Unlock className="w-4 h-4 mr-2" /> Admin Mode Active
                    </Button>
                )}
            </div>
        </div>

            {/* Add Event Form (Admin Only) */ }
    {
        isAdmin && (
            <Card className="p-2 bg-zinc-900 border-white/10">
                <CardContent>
                    <div className="flex flex-wrap items-end gap-4">
                        {/* Event Title */}
                        <div className="flex-1 min-w-[200px]">
                            <Label className="text-neutral-400">New Event Title</Label>
                            <Input
                                placeholder="Enter event title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-black border-white/20 text-white mt-1"
                            />
                        </div>

                        {/* Date Picker */}
                        <div className="flex flex-col">
                            <Label className="text-neutral-400">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="mt-1 w-[200px] justify-start text-left font-normal bg-black border-white/20 text-white hover:bg-zinc-800 hover:text-white">
                                        {selectedDate ? selectedDate.toDateString() : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-zinc-900 border-white/20 text-white">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        className="bg-zinc-900 text-white"
                                        classNames={{
                                            day_selected: "bg-violet-600 text-white hover:bg-violet-600 hover:text-white focus:bg-violet-600 focus:text-white",
                                            day_today: "bg-zinc-800 text-white",
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Add Button */}
                        <div className="mb-[2px]">
                            <Button onClick={addEvent} className="bg-white text-black hover:bg-neutral-200">Add Event</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    {/* Event Path */ }
    {
        sortedEvents.length > 0 ? (
            <div className="w-full h-48 overflow-x-auto border border-white/10 bg-black/50 rounded-lg backdrop-blur-sm custom-scrollbar">
                <div className="relative min-w-full w-max h-full flex items-center gap-12 px-12 justify-center">
                    {/* Horizontal path line */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/20 -translate-y-1/2"></div>

                    {sortedEvents.map((ev, idx) => (
                        <Popover key={ev.id}>
                            <PopoverTrigger asChild>
                                <div className="event-dot relative flex flex-col items-center cursor-pointer group z-10 transition-transform hover:scale-110">
                                    <div className="w-8 h-8 rounded-full bg-black border-2 border-white group-hover:border-violet-400 group-hover:bg-violet-950 mb-3 flex items-center justify-center text-white text-xs font-bold transition-colors">
                                        {idx + 1}
                                    </div>
                                    <span className="text-xs text-neutral-400 group-hover:text-white whitespace-nowrap bg-black/80 px-2 py-1 rounded">{ev.date.toLocaleDateString()}</span>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 bg-zinc-900 border-white/20 text-white p-4">
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-lg text-violet-300 font-zentry uppercase">{ev.title}</span>
                                    <span className="text-sm text-neutral-400 border-b border-white/10 pb-2">{ev.date.toDateString()}</span>

                                    {isAdmin && (
                                        <div className="pt-2 flex justify-end">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => deleteEvent(ev.id)}
                                                className="bg-red-900/50 hover:bg-red-900 text-red-200 border border-red-800"
                                            >
                                                <Trash2 className="w-3 h-3 mr-2" />
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    ))}
                </div>
                ) : (
                <div className="text-center py-10 text-neutral-600 italic">No events found for this filter.</div>
            )}
            </div>
        )
}
