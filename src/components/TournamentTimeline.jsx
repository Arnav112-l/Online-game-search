import { motion } from 'framer-motion';

const tournaments = [
  {
    id: 1,
    title: "VALORANT Champions 2025",
    date: "September 15-30, 2025",
    location: "Los Angeles, USA",
    prize: "$1,000,000",
    color: "orange"
  },
  {
    id: 2,
    title: "The International 2025",
    date: "October 12-27, 2025",
    location: "Stockholm, Sweden",
    prize: "$40,000,000",
    color: "blue"
  },
  {
    id: 3,
    title: "LOL Worlds 2025",
    date: "November 15-30, 2025",
    location: "Seoul, South Korea",
    prize: "$2,500,000",
    color: "purple"
  }
];

const TournamentTimeline = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 p-8">
      <h1 className="text-3xl font-bold text-white mb-12 text-center">
        Upcoming Tournaments Timeline
      </h1>
      
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-500"></div>
        
        {tournaments.map((tournament, index) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
            className="mb-16 relative"
          >
            {/* Timeline Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-4 h-4 rounded-full bg-orange-500"
              />
            </div>
            
            {/* Tournament Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`w-[calc(50%-40px)] ${
                index % 2 === 0 ? 'ml-auto' : 'mr-auto'
              } bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-xl`}
            >
              <h3 className={`text-xl font-bold text-${tournament.color}-400 mb-2`}>
                {tournament.title}
              </h3>
              <p className="text-gray-300 mb-1">{tournament.date}</p>
              <p className="text-gray-400 text-sm mb-3">{tournament.location}</p>
              <div className="inline-block px-4 py-1 rounded-full bg-green-900/50 text-green-400 text-sm">
                Prize Pool: {tournament.prize}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TournamentTimeline;