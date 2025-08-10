const mongoose = require("mongoose");
const Test = require("./model/testModel");
require("dotenv").config();
mongoose.connect(process.env.DBI_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected..."))
.catch(err => console.error("❌ Connection error:", err));

const tests = [
    // Easy
    {
        title: "Home Row Practice",
        difficulty: "easy",
        time: 60,
        questionString: "asdf jkl; asdf jkl; asdf jkl; Keep your fingers on the home row keys."
    },
    {
        title: "Basic Words",
        difficulty: "easy",
        time: 60,
        questionString: "cat dog sun pen run hat red top map box cup fan bag fox hat bat cat sat mat chat kat kit tik kat hat pat root."
    },
    {
        title: "Short Sentences",
        difficulty: "easy",
        time: 60,
        questionString: "The sky is blue. I like cake. Birds can fly. The cat is cute. "
    },
    {
        title: "Easy Numbers",
        difficulty: "easy",
        time: 60,
        questionString: "1 2 3 4 5 6 7 8 9 0 12 34 56 78 90"
    },
    {
        title: "Beginner Quotes",
        difficulty: "easy",
        time: 60,
        questionString: "Happiness is not something ready made. It comes from your own actions."
    },

    // Medium
    {
        title: "Everyday Life Paragraph",
        difficulty: "medium",
        time: 60,
        questionString: "On a crisp autumn morning, the streets were lined with golden leaves that rustled underfoot. A faint aroma of fresh coffee drifted from the corner café, where early risers chatted quietly over steaming mugs. Cyclists sped past, their jackets fluttering in the breeze, while shopkeepers rolled up their shutters and prepared for the day. Somewhere in the distance, a dog barked, and the echo faded into the hum of the waking city. The rhythm of the morning felt calm yet full of promise, as though the day ahead was waiting to be written."
    },
    {
        title: "Nature and Calm",
        difficulty: "medium",
        time: 60,
        questionString: "The sun’s rays filtered gently through the dense canopy, scattering flecks of gold onto the forest floor. A brook murmured softly nearby, weaving its way between moss-covered stones. Birds flitted from branch to branch, their songs weaving a delicate melody with the rustle of leaves. A squirrel darted past, pausing only to inspect a fallen acorn before disappearing into the undergrowth. The air was cool and refreshing, carrying the scent of pine and damp earth — the pure breath of nature itself."
    },
    {
        title: "Story Scene",
        difficulty: "medium",
        time: 60,
        questionString:"As the old train rumbled along the tracks, Anna leaned against the window, watching the world blur into streaks of green and brown. Fields stretched endlessly, dotted with grazing sheep and weathered barns. The rhythmic clatter of wheels was oddly soothing, like the heartbeat of the journey itself. Across the aisle, a child giggled over a picture book, and an elderly man adjusted his hat before settling back into his seat. Each passenger seemed lost in their own thoughts, yet connected by the same invisible thread of travel."
    },
    {
        title: "Inspirational Passage",
        difficulty: "medium",
        time: 60,
        questionString: "Progress often comes in small, unnoticeable steps. It’s in the early mornings when you choose discipline over comfort, and in the quiet nights when you work while the world sleeps. The milestones may seem far apart, but each day’s effort quietly builds the bridge to your goals. Even the setbacks play their part, teaching lessons that success alone cannot offer. In time, the journey will shape you into someone far stronger than you were when you began."
    },
    {
        title: "Urban Evening",
        difficulty: "medium",
        time: 60,
        questionString: "In the heart of the city, streetlights flickered to life as the sky deepened into twilight. Neon signs glowed in shop windows, casting colorful reflections on the wet pavement. The air was alive with distant music, the clinking of glasses, and the steady hum of traffic. Couples strolled hand in hand, weaving between groups of friends laughing as they passed. Somewhere in the shadows, a lone busker strummed a soft tune, his voice carrying a kind of bittersweet comfort into the bustling night."
    },
    // Hard
    {
        title: "Historical Narrative",
        difficulty: "hard",
        time: 60,
        questionString: "The year was 1897, and the air in the port city carried the briny tang of the sea mixed with the smoke of coal-powered ships. Wooden carts clattered across cobblestone streets, their wheels groaning under the weight of imported goods from distant lands. Merchants called out prices in a dozen different tongues, each eager to attract the attention of passing sailors and traders. Tall-masted ships swayed gently in the harbor, their sails furled, waiting for the next favorable wind. Above it all, the clock tower stood silent, its hands frozen since the great storm that had struck the year before, a silent reminder of the ocean’s unpredictable fury."
    },
    {
        title: "Complex Paragraph",
        difficulty: "hard",
        time: 60,
        questionString: "The human brain, despite weighing only about three pounds, is a marvel of biological engineering. It contains roughly 86 billion neurons, each connected to thousands of others by intricate networks of synapses. These connections allow for the processing of complex thoughts, emotions, and memories at astonishing speeds. Electrical impulses, measured in milliseconds, travel along neural pathways, enabling everything from the twitch of a finger to the comprehension of abstract mathematics. Even today, scientists have only scratched the surface of understanding the brain’s capabilities, its adaptability, and the mystery of consciousness itself."
    },
    {
        title: "Hard Quotes",
        difficulty: "hard",
        time: 60,
        questionString: "Perseverance often requires navigating labyrinthine challenges with unwavering resolve. In the face of adversity, individuals must cultivate resilience, balancing prudence with boldness, and tempering ambition with humility. Every intricate decision demands discernment, lest one succumb to precipitous judgments that undermine long-term aspirations. Fortitude, patience, and adaptability coalesce into a formidable triad that guides one through the vicissitudes of life’s complex tapestry."
    },
    {
        title: "Hard Numbers",
        difficulty: "hard",
        time: 60,
        questionString: "982 4751 3206 7548 1920 3847 5612 9074 4654 856 599595 656565 7989565 6565656 7886.59565 895656.1465 56565.4844 6565 656584 2223556 789654 655795632 0.1856596 6565.05467656 56879566 975656232 4887462 665655 7888 4446 0.9865 9786 446 4599 9856 2247 58874 63214 0.2586147759911 7989.19735482 5889562.26897454 65689 779845 475.256 47 7 66 7 1 5995623 78964 2.01479 5.500019732589713 6567956 22369487 423456 987654 33453 224 1029 20 78 662 796 2204 773 22355997 11.1973 9876 23297 2"
    },
    {
        title: "Advanced Paragraph",
        difficulty: "hard",
        time: 60,
        questionString: "The lantern cast a wavering pool of light on the damp stone walls as Elias descended deeper into the forgotten tunnels. The air grew colder with each step, and the sound of dripping water echoed in the darkness. His fingers traced the rough carvings on the wall — strange symbols whose meaning had been lost to time. Somewhere ahead, a faint metallic clang rang out, sending a shiver down his spine. He tightened his grip on the hilt of his dagger, knowing that whatever lay in the shadows was not entirely of this world."
    },
];

Test.insertMany(tests)
    .then(() => {
        console.log("✅ Test data uploaded successfully!");
        mongoose.connection.close();
    })
    .catch(err => {
        console.error("❌ Error uploading data:", err);
        mongoose.connection.close();
    });
