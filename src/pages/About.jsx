import JourneyMap from '../components/ui/journey-map';

const About = () => {
    return (
        <div className="bg-black min-h-screen text-white w-full py-20 bg-neutral-950">
            <h2 className="text-center text-4xl md:text-6xl font-zentry uppercase mb-10 text-white">Our Journey</h2>
            <JourneyMap />
        </div>
    );
};

export default About;
